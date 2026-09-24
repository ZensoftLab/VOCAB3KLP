import { useEffect, useRef, useState } from "react";
import "./Videoplayer.css";

const REVIEW_VIDEOS_API =
  "https://vocabadmin.englishcommando.bd/api/review-videos";

const embeddedVideoNames = [
  "how-it-works",
  "mobileapp",
  "review1",
  "review2",
  "review3",
  "review4",
  "review5",
  "review6",
];

export function useEmbeddedVideoCatalog() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch(REVIEW_VIDEOS_API, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Video API request failed: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const apiVideos = [...(data?.review_videos || [])]
          .sort((first, second) => first.position - second.position)
          .slice(0, embeddedVideoNames.length);

        if (apiVideos.length !== embeddedVideoNames.length) return;

        setVideos(
          apiVideos.map((video, index) => ({
            name: embeddedVideoNames[index],
            title: video.title,
            url: video.url,
          })),
        );
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Unable to load review videos:", error);
        }
      });

    return () => controller.abort();
  }, []);

  return {
    videos,
    videoByName: Object.fromEntries(videos.map((video) => [video.name, video])),
  };
}

const createHiddenControlsUrl = (url, params = "") => {
  const playerParams = new URLSearchParams(params);
  playerParams.set("controls", "0");
  return `${url}?${playerParams.toString()}`;
};

const postPlayerCommand = (playerWindow, func) => {
  playerWindow?.postMessage(
    JSON.stringify({ event: "command", func, args: [] }),
    "*",
  );
};

export function YouTubeReviewVideo({ video, title, className = "" }) {
  const iframeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const resolvedVideoUrl = video?.url;
  const resolvedTitle = video?.title || title || "YouTube video";

  if (!resolvedVideoUrl) return null;

  const playVideo = () => {
    postPlayerCommand(iframeRef.current?.contentWindow, "playVideo");
    setIsPlaying(true);
  };

  return (
    <div className={`${className} relative overflow-hidden`}>
      <iframe
        ref={iframeRef}
        className="youtube-clean-video youtube-title-hidden absolute inset-0 h-full w-full border-0"
        src={createHiddenControlsUrl(
          resolvedVideoUrl,
          "playsinline=1&rel=0&showinfo=0&modestbranding=1&enablejsapi=1",
        )}
        title={resolvedTitle}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      {!isPlaying && (
        <button
          type="button"
          className="absolute left-1/2 top-1/2 z-50 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-0 bg-black/60 text-white transition-transform hover:scale-105"
          aria-label={`${resolvedTitle} চালু করুন`}
          onClick={playVideo}
        >
          <span
            className="ml-1 h-0 w-0 border-y-[11px] border-l-[16px] border-y-transparent border-l-white"
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
}

export function YouTubeOverlayVideo({
  video,
  title,
  overlayImage,
  className = "",
  iframeClassName = "",
  overlayImageClassName = "",
  srcParams = "controls=0&playsinline=1&rel=0&showinfo=0&modestbranding=1&autoplay=1&mute=1&enablejsapi=1",
  buttonLabel,
}) {
  const iframeRef = useRef(null);
  const [isStarted, setIsStarted] = useState(false);
  const resolvedVideoUrl = video?.url;
  const resolvedTitle = video?.title || title || "YouTube video";
  const resolvedButtonLabel = buttonLabel || `${resolvedTitle} চালু করুন`;

  if (!resolvedVideoUrl) return null;

  const startVideo = () => {
    const playerWindow = iframeRef.current?.contentWindow;
    if (!playerWindow) return;

    postPlayerCommand(playerWindow, "unMute");
    postPlayerCommand(playerWindow, "playVideo");
    window.setTimeout(() => {
      postPlayerCommand(playerWindow, "unMute");
      postPlayerCommand(playerWindow, "playVideo");
    }, 150);
    setIsStarted(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <iframe
        ref={iframeRef}
        className={`youtube-clean-video youtube-title-hidden absolute inset-0 h-full w-full border-0 transition-opacity duration-200 ${iframeClassName} ${isStarted ? "opacity-100" : "opacity-0"}`}
        src={createHiddenControlsUrl(resolvedVideoUrl, srcParams)}
        title={resolvedTitle}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      {!isStarted && (
        <button
          type="button"
          className="video-overlay-button absolute inset-0 z-10 block h-full w-full cursor-pointer border-0 bg-[#071526] p-0"
          aria-label={resolvedButtonLabel}
          onClick={startVideo}
        >
          {overlayImage && (
            <img
              src={overlayImage}
              alt={`Watch the ${resolvedTitle} video`}
              className={`absolute inset-0 h-full w-full object-cover ${overlayImageClassName}`}
            />
          )}
          <span
            className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#F6C84B] text-[#071526] transition-transform hover:scale-105 lg:h-20 lg:w-20"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 lg:h-8 lg:w-8"
              aria-hidden="true"
            >
              <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
