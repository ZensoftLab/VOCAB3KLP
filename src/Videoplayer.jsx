import { useRef, useState } from "react";
import "./Videoplayer.css";

export const embeddedVideos = [
  { name: "how-it-works", url: "https://www.youtube.com/embed/brdP8Tgy1nM", title: "Oxford 3000 Vocab introduction" },
  { name: "mobileapp", url: "https://www.youtube.com/embed/BVR8NcCoAiQ", title: "Oxford Vocab BD" },
  { name: "review1", url: "https://www.youtube.com/embed/V1VpUy3DuVs", title: "Student review video 1" },
  { name: "review2", url: "https://www.youtube.com/embed/cVzVMOY3kv0", title: "Student review video 2" },
  { name: "review3", url: "https://www.youtube.com/embed/sPafKu0cRiY", title: "Student review video 3" },
  { name: "review4", url: "https://www.youtube.com/embed/JYk6MtvYYlY", title: "Student review video 4" },
  { name: "review5", url: "https://www.youtube.com/embed/jWMazDK0e_M", title: "Student review video 5" },
  { name: "review6", url: "https://www.youtube.com/embed/EVRAAp-3nE8", title: "Student review video 6" },
];

export const embeddedVideoByName = Object.fromEntries(
  embeddedVideos.map((video) => [video.name, video]),
);

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

export function YouTubeReviewVideo({ video, videoId, title, className = "" }) {
  const iframeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const resolvedVideoUrl = video?.url || `https://www.youtube.com/embed/${videoId}`;
  const resolvedTitle = video?.title || title;

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
  videoId,
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
  const resolvedVideoUrl = video?.url || `https://www.youtube.com/embed/${videoId}`;
  const resolvedTitle = video?.title || title;
  const resolvedButtonLabel = buttonLabel || `${resolvedTitle} চালু করুন`;

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
