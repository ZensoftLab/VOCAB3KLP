import { useEffect, useRef, useState } from "react";
import "./App.css";
import logo from "./images/logo.png";
import heroArtwork from "./images/Heroimage.webp";
import heroArtworkDesktop from "./images/Heroimaged.webp";
import videoOverlay from "./images/videooverlay.webp";
import mobileVideoOverlay from "./images/Mobile_Video_Overlay.png";
import explainerUnderline from "./images/Vector 35.png";
import infoIcon from "./assets/Info icon.svg";
import sparkleIcon from "./assets/Icon.svg";
import iconBase from "./assets/IconBase.svg";
import Footer from "./footer";
import Header from "./header";
import PrivacyPolicy from "./privacy-policy";
import Confirm from "./confirm";
import OrderError from "./order-error";
import {
  embeddedVideoByName,
  YouTubeOverlayVideo,
  YouTubeReviewVideo,
} from "./Videoplayer";

// Vite embeds VITE_* variables during the production build. Static deployments
// therefore call the configured order API directly from the browser.
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(
  /\/+$/,
  "",
);
const FLIPBOOK_URL = `${import.meta.env.BASE_URL}pdf-flipbook/index.html`;

const normalizePhoneDigits = (value = "") =>
  value.replace(/[০-৯]/g, (digit) => "০১২৩৪৫৬৭৮৯".indexOf(digit));

const normalizePhoneNumber = (value = "") => {
  const normalized = normalizePhoneDigits(value).replace(/[\s-]/g, "");

  if (/^\+8801\d{9}$/.test(normalized)) {
    return `0${normalized.slice(4)}`;
  }

  if (/^8801\d{9}$/.test(normalized)) {
    return `0${normalized.slice(3)}`;
  }

  return normalized;
};

const featureCards = [
  {
    badge: "যেকোনো জায়গায়",
    title: "অ্যান্ড্রয়েড অ্যাপ",
    description: "অফলাইনে ব্যবহারযোগ্য—ইন্টারনেট ছাড়াও প্র্যাকটিস করুন।",
    icon: "app",
    color: "#E2EAFF",
    badgeColor: "#3158A5",
    bubble: "০১",
  },
  {
    badge: "ভিডিও সহায়তা",
    title: "ভিডিও লেসন",
    description: "প্রতিটি শব্দ বুঝতে রয়েছে ডেডিকেটেড ভিজুয়াল লেসন।",
    icon: "video",
    color: "#D9F6F8",
    badgeColor: "#147D89",
    bubble: "০২",
  },
  {
    badge: "শুনে শিখুন",
    title: "অডিও পডকাস্ট",
    description: "যেকোনো সময় শুনে শব্দগুলো ঝালিয়ে নিন।",
    icon: "audio",
    color: "#FFF0CE",
    badgeColor: "#A86600",
    bubble: "০৩",
  },
  {
    badge: "বলার অনুশীলন",
    title: "ভোকাল এক্সারসাইজ",
    description: "উচ্চারণ ঠিক করতে বলার অভ্যাস গড়ে তুলুন।",
    icon: "mic",
    color: "#F0E5FB",
    badgeColor: "#7B4CA1",
    accent: "bg-[#eadcff] text-[#8b60d7]",
    bubble: "০৪",
    bubbleTone: "bg-[#ece2ff]",
  },
  {
    badge: "মজার চ্যালেঞ্জ",
    title: "টাং টুইস্টার",
    description: "শব্দ বলার জড়তা কাটাতে ছোট ছোট অনুশীলন।",
    icon: "note",
    color: "#FDE8E3",
    badgeColor: "#7B4CA1",
    accent: "bg-[#fee0db] text-[#d06a57]",
    bubble: "০৫",
    bubbleTone: "bg-[#f8e4e1]",
  },
  {
    badge: "মনে রাখার সিস্টেম",
    title: "প্র্যাকটিস + রিভিশন",
    description: "বারবার চর্চায় শেখা শব্দগুলো মনে ধরে রাখুন।",
    icon: "refresh",
    color: "#E1F3E7",
    badgeColor: "#396D4F",
    accent: "bg-[#dff0dd] text-[#5f9b57]",
    bubble: "০৬",
    bubbleTone: "bg-[#e7efdf]",
  },
];

function TypewriterSequence({ speed = 115 }) {
  const [firstText, setFirstText] = useState("");
  const [secondText, setSecondText] = useState("");
  const [activeLine, setActiveLine] = useState(null);

  useEffect(() => {
    const segment = (text) =>
      typeof Intl !== "undefined" && Intl.Segmenter
        ? Array.from(
            new Intl.Segmenter("bn", { granularity: "grapheme" }).segment(text),
            ({ segment: grapheme }) => grapheme,
          )
        : Array.from(text);
    const firstLetters = segment("অক্সফোর্ড ৩০০০ ভোকাব");
    const secondLetters = segment("সম্পূর্ণ লার্নিং সিস্টেম");
    const timeoutIds = new Set();
    const intervalIds = new Set();
    let isCancelled = false;

    const schedule = (callback, delay) => {
      const timeoutId = window.setTimeout(() => {
        timeoutIds.delete(timeoutId);
        callback();
      }, delay);
      timeoutIds.add(timeoutId);
    };

    const typeLine = (letters, setText, line, onComplete) => {
      setActiveLine(line);
      let currentIndex = 0;
      const intervalId = window.setInterval(() => {
        currentIndex += 1;
        setText(letters.slice(0, currentIndex).join(""));
        if (currentIndex >= letters.length) {
          window.clearInterval(intervalId);
          intervalIds.delete(intervalId);
          onComplete();
        }
      }, speed);
      intervalIds.add(intervalId);
    };

    const runSequence = () => {
      if (isCancelled) return;
      setFirstText("");
      setSecondText("");
      typeLine(firstLetters, setFirstText, "first", () => {
        schedule(() => {
          typeLine(secondLetters, setSecondText, "second", () => {
            setActiveLine(null);
            schedule(runSequence, 5000);
          });
        }, 1100);
      });
    };

    schedule(runSequence, 240);
    return () => {
      isCancelled = true;
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      intervalIds.forEach((intervalId) => window.clearInterval(intervalId));
    };
  }, [speed]);

  return (
    <>
      <h1
        className="hero-title-primary hero-typewriter mt-8 max-w-[505px] text-[clamp(2.25rem,4.2vw,3.625rem)] font-['Baloo_Da_2'] font-semibold leading-[1.35] tracking-[-2.27px] text-[#E8B84E] lg:whitespace-nowrap"
        aria-label="অক্সফোর্ড ৩০০০ ভোকাব"
      >
        <span className="hero-typewriter-text">
          {firstText}
          {activeLine === "first" && (
            <span className="hero-typewriter-cursor" aria-hidden="true" />
          )}
        </span>
      </h1>
      <h2
        className="hero-title-secondary hero-typewriter mt-1 max-w-[505px] text-[clamp(2rem,3.9vw,3.625rem)] font-['Baloo_Da_2'] font-semibold leading-[1.35] tracking-[-2.27px] text-white lg:whitespace-nowrap"
        aria-label="সম্পূর্ণ লার্নিং সিস্টেম"
      >
        <span className="hero-typewriter-text">
          {secondText}
          {activeLine === "second" && (
            <span className="hero-typewriter-cursor" aria-hidden="true" />
          )}
        </span>
      </h2>
    </>
  );
}

function StudentStoryVideo({ src, title, className = "" }) {
  const videoRef = useRef(null);
  const [thumbnail, setThumbnail] = useState("");
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const captureStateRef = useRef("idle");

  const captureFrame = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) return "";

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas
      .getContext("2d")
      ?.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.82);
  };

  const captureThumbnail = () => {
    const video = videoRef.current;
    if (captureStateRef.current !== "seeking") return;
    const frame = captureFrame();
    if (frame) setThumbnail(frame);
    captureStateRef.current = "captured";
    video.currentTime = 0;
  };

  const prepareThumbnail = () => {
    const video = videoRef.current;
    if (!video || captureStateRef.current !== "idle") return;
    const firstFrame = captureFrame();
    if (firstFrame) setThumbnail(firstFrame);
    captureStateRef.current = "seeking";
    video.currentTime = Math.min(0.5, Math.max(0, video.duration - 0.1));
  };

  return (
    <div className={className}>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full bg-black object-contain"
        src={src}
        title={title}
        playsInline
        preload="auto"
        draggable="false"
        onLoadedData={prepareThumbnail}
        onSeeked={captureThumbnail}
        onPlay={() => {
          setVideoStarted(true);
          setVideoPlaying(true);
          setShowThumbnail(false);
        }}
        onPause={() => setVideoPlaying(false)}
        onClick={() => {
          if (videoRef.current?.paused) {
            videoRef.current.play();
          } else {
            videoRef.current?.pause();
          }
        }}
      />
      {showThumbnail && thumbnail && (
        <button
          type="button"
          className="absolute inset-0 z-[60] block h-full w-full cursor-pointer border-0 bg-black bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${thumbnail})` }}
          aria-label={`${title} চালু করুন`}
          onClick={() => {
            setShowThumbnail(false);
            videoRef.current?.play();
          }}
        />
      )}
      {videoStarted && !videoPlaying && (
        <button
          type="button"
          className="absolute left-1/2 top-1/2 z-[60] grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-0 bg-black/55 text-white"
          aria-label={videoPlaying ? `${title} থামান` : `${title} চালু করুন`}
          onClick={() => {
            if (videoRef.current?.paused) {
              videoRef.current.play();
            } else {
              videoRef.current?.pause();
            }
          }}
        >
          {videoPlaying ? (
            <span className="flex gap-1" aria-hidden="true">
              <span className="h-5 w-1.5 rounded-sm bg-white" />
              <span className="h-5 w-1.5 rounded-sm bg-white" />
            </span>
          ) : (
            <span
              className="ml-1 h-0 w-0 border-y-[10px] border-l-[15px] border-y-transparent border-l-white"
              aria-hidden="true"
            />
          )}
        </button>
      )}
    </div>
  );
}

function CardIcon({ type, className = "" }) {
  const common = "h-5 w-5 stroke-current fill-none stroke-[1.8]";

  switch (type) {
    case "video":
      return (
        <svg
          viewBox="0 0 24 24"
          className={`${common} ${className}`}
          aria-hidden="true"
        >
          <rect x="3.5" y="6" width="11.5" height="12" rx="2.5" />
          <path d="m15 10 5-3v10l-5-3" strokeLinejoin="round" />
        </svg>
      );
    case "audio":
      return (
        <svg
          viewBox="0 0 24 24"
          className={`${common} ${className}`}
          aria-hidden="true"
        >
          <path d="M5 13v-2a7 7 0 0 1 14 0v2" strokeLinecap="round" />
          <rect x="3.5" y="12" width="3.5" height="6" rx="1.5" />
          <rect x="17" y="12" width="3.5" height="6" rx="1.5" />
        </svg>
      );
    case "app":
      return (
        <svg
          viewBox="0 0 24 24"
          className={`${common} ${className}`}
          aria-hidden="true"
        >
          <rect x="7" y="4.5" width="10" height="15" rx="2.5" />
          <path d="M10 7.5h4" strokeLinecap="round" />
          <path d="M10.2 15.2h3.6" strokeLinecap="round" />
        </svg>
      );
    case "mic":
      return (
        <svg
          viewBox="0 0 24 24"
          className={`${common} ${className}`}
          aria-hidden="true"
        >
          <rect x="9" y="4" width="6" height="9" rx="3" />
          <path d="M7 12a5 5 0 0 0 10 0" strokeLinecap="round" />
          <path d="M12 16v3" strokeLinecap="round" />
          <path d="M9 19h6" strokeLinecap="round" />
        </svg>
      );
    case "note":
      return (
        <svg
          viewBox="0 0 24 24"
          className={`${common} ${className}`}
          aria-hidden="true"
        >
          <path
            d="M3 12c1.5-6 3.5-6 5 0s3.5 6 5 0 3.5-6 5 0 3.5 6 5 0"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "refresh":
      return (
        <svg
          viewBox="0 0 24 24"
          className={`${common} ${className}`}
          aria-hidden="true"
        >
          <path d="M20 11a8 8 0 0 0-13.6-5.7L4 7.7" strokeLinecap="round" />
          <path d="M4 4v3.7h3.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 13a8 8 0 0 0 13.6 5.7l2.4-2.4" strokeLinecap="round" />
          <path
            d="M20 20v-3.7h-3.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

function App() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(
    () =>
      typeof window !== "undefined" &&
      (window.location.pathname === "/privacy-policy" ||
        window.location.hash === "#privacy-policy"),
  );
  const [showConfirmation, setShowConfirmation] = useState(
    () =>
      typeof window !== "undefined" &&
      (window.location.pathname === "/confirm" ||
        window.location.hash === "#confirm"),
  );
  const [showOrderError, setShowOrderError] = useState(
    () =>
      typeof window !== "undefined" &&
      (window.location.pathname === "/order-error" ||
        window.location.hash === "#order-error"),
  );
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [reviewSlide, setReviewSlide] = useState(0);

  const handleReviewSwipe = (direction) => {
    setReviewSlide((slide) =>
      direction === "next" ? Math.min(1, slide + 1) : Math.max(0, slide - 1),
    );
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("");

  const [scrollProgress, setScrollProgress] = useState(0);

  // =========================
  // ORDER FORM STATE
  // =========================
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [orderError, setOrderError] = useState("");

  useEffect(() => {
    const handleLocationChange = () => {
      setShowPrivacyPolicy(
        window.location.pathname === "/privacy-policy" ||
          window.location.hash === "#privacy-policy",
      );
      setShowConfirmation(
        window.location.pathname === "/confirm" ||
          window.location.hash === "#confirm",
      );
      setShowOrderError(
        window.location.pathname === "/order-error" ||
          window.location.hash === "#order-error",
      );
    };
    window.addEventListener("hashchange", handleLocationChange);
    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("hashchange", handleLocationChange);
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  // =========================
  // AUTO HIDE ORDER ALERT
  // =========================
  useEffect(() => {
    if (!orderMessage && !orderError) return;

    const timer = setTimeout(() => {
      setOrderMessage("");
      setOrderError("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [orderMessage, orderError]);

  // =========================
  // ORDER SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setOrderMessage("");
    setOrderError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name")?.trim();
    const phone = formData.get("phone")?.trim();
    const city = formData.get("district")?.trim();
    const address = formData.get("address")?.trim();

    // Required field validation
    if (!name || !phone || !city || !address) {
      setOrderError("সব তথ্য পূরণ করুন।");
      setIsSubmitting(false);
      return;
    }

    const normalizedPhone = normalizePhoneNumber(phone);
    if (!/^01\d{9}$/.test(normalizedPhone)) {
      setOrderError("সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন।");
      setIsSubmitting(false);
      return;
    }

    const orderData = {
      name,
      phone: normalizedPhone,
      secondary_phone: "",
      address,
      city,
      book_id: 1,
      quantity: 1,
      customer_note: "",
      delivery_charge: "50",
      discount_amount: "0",
      source: "website",
      landing_page: window.location.href,
      landing_page_slug: "",
      campaign: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
      idempotency_key: `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 10)}`,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.detail ||
            data?.message ||
            "অর্ডার করা যায়নি। আবার চেষ্টা করুন।",
        );
      }

      console.log("Order created:", data);

      form.reset();
      window.history.pushState({}, "", "/confirm");
      setShowConfirmation(true);
    } catch (error) {
      console.error("Order submission error:", error);

      window.history.pushState({}, "", "/order-error");
      setShowOrderError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const flipBookRef = useRef(null);
  const flipBookReadyRef = useRef(false);
  const flipBookEngineReadyRef = useRef(false);
  const bookVisibleRef = useRef(false);
  const autoAdvanceScheduledRef = useRef(false);
  const autoAdvancedForEntryRef = useRef(false);
  const [flipBookPage, setFlipBookPage] = useState(1);
  const flipBookPageCount = 27;

  const navigateFlipBook = (direction) => {
    if (!flipBookEngineReadyRef.current) {
      return;
    }

    const frameWindow = flipBookRef.current?.contentWindow;
    const currentPage = Number(
      frameWindow?.heyzine?.getCurrentPage?.() ?? flipBookPage,
    );

    if (
      (direction === "previous" && currentPage <= 1) ||
      (direction === "next" && currentPage >= flipBookPageCount)
    ) {
      return;
    }

    const nativeControl =
      direction === "next"
        ? frameWindow?.document?.querySelector(".btnNext")
        : frameWindow?.document?.querySelector(".btnPrevious");

    if (nativeControl) {
      nativeControl.click();
      window.setTimeout(() => {
        const pageFromLib = Number(frameWindow?.heyzine?.getCurrentPage?.());
        if (Number.isFinite(pageFromLib)) {
          setFlipBookPage(pageFromLib);
        }
      }, 250);
      return;
    }

    const targetPage =
      direction === "next"
        ? Math.min(currentPage + 1, flipBookPageCount)
        : Math.max(currentPage - 1, 1);

    setFlipBookPage(targetPage);

    if (frameWindow?.heyzine?.goToPage) {
      frameWindow.heyzine.goToPage(targetPage, "button");
      return;
    }

    if (frameWindow?.hzflip?.controls?.navigation?.goToPage) {
      frameWindow.hzflip.controls.navigation.goToPage(targetPage, "button");
      return;
    }

    frameWindow?.postMessage(
      { type: "flipbook-page", direction },
      window.location.origin,
    );
  };

  const resetFlipBook = () => {
    if (!flipBookEngineReadyRef.current) {
      return;
    }

    setFlipBookPage(1);
    flipBookRef.current?.contentWindow?.postMessage(
      { type: "flipbook-first-page" },
      window.location.origin,
    );
  };

  const autoAdvanceFlipBookOnce = () => {
    if (
      !flipBookReadyRef.current ||
      !flipBookEngineReadyRef.current ||
      !bookVisibleRef.current ||
      autoAdvanceScheduledRef.current ||
      autoAdvancedForEntryRef.current
    ) {
      return;
    }

    autoAdvanceScheduledRef.current = true;
    window.setTimeout(() => {
      autoAdvanceScheduledRef.current = false;
      if (!bookVisibleRef.current || autoAdvancedForEntryRef.current) {
        return;
      }

      autoAdvancedForEntryRef.current = true;
      setFlipBookPage(2);
      flipBookRef.current?.contentWindow?.postMessage(
        { type: "flipbook-page", direction: "next" },
        window.location.origin,
      );
    }, 250);
  };

  const handleFlipBookLoad = () => {
    flipBookReadyRef.current = true;
  };

  useEffect(() => {
    const bookSection = document.getElementById("book");
    if (!bookSection) {
      return undefined;
    }

    let wasVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasVisible) {
          wasVisible = true;
          bookVisibleRef.current = true;
          autoAdvancedForEntryRef.current = false;
          autoAdvanceScheduledRef.current = false;
          resetFlipBook();
          autoAdvanceFlipBookOnce();
        } else if (!entry.isIntersecting) {
          wasVisible = false;
          bookVisibleRef.current = false;
          autoAdvanceScheduledRef.current = false;
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(bookSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const syncFlipBookFullscreen = () => {
      flipBookRef.current?.contentWindow?.postMessage(
        {
          type: "flipbook-fullscreen",
          active: Boolean(document.fullscreenElement),
        },
        window.location.origin,
      );
    };

    document.addEventListener("fullscreenchange", syncFlipBookFullscreen);
    return () => {
      document.removeEventListener("fullscreenchange", syncFlipBookFullscreen);
    };
  }, []);

  useEffect(() => {
    const handleFlipBookPageChange = (event) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== flipBookRef.current?.contentWindow
      ) {
        return;
      }

      if (event.data?.type === "flipbook-ready") {
        flipBookEngineReadyRef.current = true;
        resetFlipBook();
        autoAdvanceFlipBookOnce();
        return;
      }

      if (event.data?.type === "flipbook-page-change") {
        if (
          event.data?.direction === "next" ||
          event.data?.direction === "previous"
        ) {
          navigateFlipBook(event.data.direction);
        }
      }
    };

    window.addEventListener("message", handleFlipBookPageChange);
    return () =>
      window.removeEventListener("message", handleFlipBookPageChange);
  }, []);

  useEffect(() => {
    const sectionIds = [
      "how-it-works",
      "book",
      "package",
      "student-stories",
      "android-app",
      "faq",
      "order",
    ];

    const updateNavigation = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(
        scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0,
      );

      const marker = window.scrollY + window.innerHeight * 0.28;
      let current = "";
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) current = id;
      });
      setActiveSection(current);
    };

    updateNavigation();
    window.addEventListener("scroll", updateNavigation, { passive: true });
    window.addEventListener("resize", updateNavigation);
    return () => {
      window.removeEventListener("scroll", updateNavigation);
      window.removeEventListener("resize", updateNavigation);
    };
  }, []);

  const faqItems = [
    {
      question: "এই প্যাকেজে ঠিক কী কী থাকছে?",
      answer:
        "অক্সফোর্ড ৩০০০ ভোকাবুলারি বইয়ের সঙ্গে ডেডিকেটেড অ্যান্ড্রয়েড অ্যাপ, অডিও, ভিডিও লেসন, প্র্যাকটিস এবং প্রগ্রেস সাপোর্ট থাকছে।",
    },
    {
      question: "মোট মূল্য কত? ডেলিভারি চার্জ আছে?",
      answer:
        "সম্পূর্ণ প্যাকেজের মূল্য ৩,৫০০ টাকা। সারা বাংলাদেশে বিনামূল্যে ডেলিভারি পাবেন। কোনো অতিরিক্ত চার্জ নেই।",
    },
    {
      question: "অ্যাপ কি অ্যান্ড্রয়েডের জন্য?",
      answer:
        "গুগল প্লে স্টোর থেকে অক্সফোর্ড ৩০০০ অ্যাপ ডাউনলোড করুন এবং আপনার অ্যাকাউন্ট দিয়ে লগইন করুন।",
    },
    {
      question: "আমি একদম বিগিনার হলে শুরু করতে পারব?",
      answer:
        "অবশ্যই। আমাদের কোর্স বিগিনারদের জন্যও উপযোগী। ধাপে ধাপে শিখুন এবং সহজেই অক্সফোর্ড ৩০০০ শব্দ আয়ত্ত করুন।",
    },
    {
      question: "অর্ডার করতে কী করতে হবে?",
      answer:
        "ওয়েবসাইট থেকে সরাসরি অর্ডার করুন অথবা ০১৪০-৫৪৫-৮৮০০-২ নম্বরে কল করে অর্ডার নিশ্চিত করুন। আমরা আপনার বই দ্রুত পৌঁছে দেব।",
    },
    {
      question: "অর্ডারের আগে কথা বলতে চাইলে?",
      answer: "আমরা 30 দিনের মানি-ব্যাক গ্যারান্টি দিচ্ছি।",
    },
    {
      question: "আর্ডারের আগে আমায় খোঁজার প্রশ্ন?",
      answer: "যেকোনো প্রশ্নের জন্য +8801410144536 নম্বরে যোগাযোগ করুন।",
    },
  ];

  if (showPrivacyPolicy) {
    return (
      <main className="min-h-screen bg-[#050812] text-white">
        <Header
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          activeSection={activeSection}
          scrollProgress={scrollProgress}
        />
        <PrivacyPolicy />
        <Footer />
      </main>
    );
  }

  if (showConfirmation) {
    return <Confirm />;
  }

  if (showOrderError) {
    return (
      <OrderError
        onClose={() => {
          setShowOrderError(false);
          window.history.replaceState({}, "", "/");
        }}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#050812] text-white">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection={activeSection}
        scrollProgress={scrollProgress}
      />

      {/* =================================================
    TOP ORDER ALERT
================================================= */}

      {(orderMessage || orderError) && (
        <div
          role="alert"
          aria-live="polite"
          className={`order-toast ${orderError ? "order-toast-error" : "order-toast-success"}`}
        >
          <div className="order-toast-card">
            <div className="order-toast-icon" aria-hidden="true">
              {orderError ? "!" : "✓"}
            </div>
            <div className="order-toast-content">
              <strong>
                {orderError ? "অর্ডার সম্পন্ন হয়নি" : "অর্ডার সফল হয়েছে"}
              </strong>
              <p>{orderError || orderMessage}</p>
            </div>
            <button
              type="button"
              className="order-toast-close"
              aria-label="অ্যালার্ট বন্ধ করুন"
              onClick={() => {
                setOrderMessage("");
                setOrderError("");
              }}
            >
              ×
            </button>
            <span className="order-toast-progress" aria-hidden="true" />
          </div>
        </div>
      )}

      {/* Section - 01 */}
      <link
        rel="preload"
        as="image"
        href={heroArtworkDesktop}
        media="(min-width: 1024px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={heroArtwork}
        media="(max-width: 1023px)"
        fetchPriority="high"
      />
      <section
        id="top"
        className="relative overflow-hidden bg-[#040914]"
        style={{ height: "829px", opacity: 1, transform: "rotate(0deg)" }}
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(80.27%_167.79%_at_76%_46%,#183C69_0%,#071229_44%,#040914_82%)]"
          style={{ height: "829px", opacity: 1, transform: "rotate(0deg)" }}
        />
        <div className="pointer-events-none absolute left-[7%] top-[50%] h-[182px] w-[182px] rounded-full bg-[#74DDEA]/[0.08] blur-[75px]" />
        <div className="pointer-events-none absolute left-[67%] top-[13%] h-[336px] w-[336px] rounded-full bg-[#E8B84E]/[0.09] blur-[12px]" />
        <div className="relative mx-auto flex h-full max-w-[1152px] flex-col justify-center px-4 py-[72px] sm:px-6 lg:px-0">
          <div className="grid flex-1 items-center gap-6 lg:grid-cols-[504px_568px] lg:gap-[79px]">
            <div className="hero-copy order-2 mx-auto flex w-full max-w-[504px] flex-col justify-center text-center lg:order-1 lg:text-left">
              <div className="inline-flex h-[34.24px] min-h-[30.4px] w-fit items-center gap-[7.2px] rounded-full border border-[#E8B84E]/30 bg-[#E8B84E]/[0.08] px-[11.52px] py-[5.12px] font-['Baloo_Da_2'] text-[12.8px] font-semibold leading-[22px] tracking-[-0.06px] text-[#FFF0B7]">
                <span className="text-sm" aria-hidden="true">
                  <img
                    src={sparkleIcon}
                    alt=""
                    className="sparkle-icon h-4 w-4"
                  />
                </span>
                বাংলাদেশে আমরাই প্রথম
              </div>

              <TypewriterSequence />

              <p className="mt-4 max-w-[512px] font-['Baloo_Da_2'] text-[17px] font-normal leading-[31px] tracking-[-0.44px] text-[#B8C4D5] sm:text-[20px] lg:mt-4">
                বই, অ্যাপ, অডিও, ভিডিও ও প্র্যাকটিস—সব একসাথে।
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#order"
                  className="flex h-[46.938px] min-h-[46.4px] w-[242.047px] items-center justify-center gap-[8.8px] rounded-[12px] border border-transparent bg-[#E8B84E] px-[18.4px] py-[12.48px] text-center font-['Baloo_Da_2'] text-[15.2px] font-bold leading-[19px] tracking-[-0.325px] text-[#071526] transition hover:-translate-y-0.5 hover:brightness-105"
                >
                  এখনই অর্ডার করুন
                  <svg
                    viewBox="0 0 20 20"
                    className="mobile-cta-arrow h-4 w-4 shrink-0"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 10h11M10.5 5.5 15 10l-4.5 4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    />
                  </svg>
                </a>
                <a
                  href="#book"
                  className="flex h-[46.938px] min-h-[46.4px] w-full max-w-[222.8px] shrink-0 items-center justify-center gap-[8.8px] rounded-[12px] border border-[#DCE8F1]/[0.45] bg-transparent px-10 py-[12.48px] text-center font-['Baloo_Da_2'] text-[15.2px] font-bold leading-[19px] tracking-[-0.325px] text-white/[0.92] transition hover:border-white/70 hover:bg-white/[0.08]"
                >
                  <span>বইয়ের ভেতর দেখুন</span>
                  <svg
                    viewBox="0 0 20 20"
                    className="mobile-cta-arrow h-4 w-4 shrink-0"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 10h11M10.5 5.5 15 10l-4.5 4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    />
                  </svg>
                </a>
              </div>

              <div className="mt-3 flex items-center justify-center gap-[7.2px] font-['Baloo_Da_2'] text-[13.44px] font-normal leading-[23px] tracking-[-0.108px] text-[#B8C4D5] lg:justify-start">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 text-[#B6C8DB]"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3 20 6v5.8c0 4.7-3.1 7.9-8 9.2-4.9-1.3-8-4.5-8-9.2V6l8-3Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.75"
                  />
                  <path
                    d="m8.5 12 2.3 2.3 4.7-4.7"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.75"
                  />
                </svg>
                সারা দেশে ক্যাশ অন ডেলিভারি
              </div>
            </div>

            <div className="hero-artwork order-1 relative mx-auto w-full max-w-[568.59px] justify-self-center translate-x-0 lg:order-2 lg:translate-x-0">
              <picture className="block h-full w-full">
                <source
                  media="(min-width: 1024px)"
                  srcSet={heroArtworkDesktop}
                />
                <img
                  src={heroArtwork}
                  alt="Oxford 3000 vocabulary pack"
                  width="568"
                  height="520"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="mx-auto block h-full w-full select-none object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
                />
              </picture>
            </div>
          </div>
          <div className="mx-3 hidden grid-cols-2 gap-4 border-t border-white/10 pb-8 pt-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0 lg:px-8">
            {[
              ["৩,০০০", "মূল শব্দ"],
              ["৩,০০০", "Dedicated Video"],
              ["সম্পূর্ণ", "Audio"],
              ["Learning Principles", "অনুযায়ী সাজান"],
              ["Offline", "Android App"],
              ["৳৫০", "ডেলিভারি চার্জ মাত্র"],
            ].map(([title, subtitle]) => (
              <div
                key={title + subtitle}
                className="hero-stat border-l border-white/10 pl-4 first:border-l-0 first:pl-0 lg:px-4"
              >
                <div className="text-2xl font-black text-[#f7c84f]">
                  {title}
                </div>
                <div className="mt-1 text-sm text-white/60">{subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section - 02 */}

      <section
        id="how-it-works"
        className="relative flex h-[337px] flex-col items-center gap-6 overflow-hidden bg-[#050B18] px-5 py-10 lg:h-[910.19px] lg:gap-0 lg:px-0 lg:py-[86.4px]"
      >
        <div className="w-full max-w-[350px] text-center lg:max-w-[1152px]">
          <div className="flex flex-col items-center">
            <h2 className="font-['Baloo_Da_2'] text-[28px] font-semibold leading-9 text-white lg:text-[44px] lg:leading-[74px] lg:tracking-[-0.79px]">
              ১ মিনিটে দেখে নিন
            </h2>
            <img
              src={explainerUnderline}
              alt=""
              aria-hidden="true"
              className="mt-[-1px] h-auto w-[81px] lg:mt-[-3px] lg:w-[120px]"
            />
            <p className="hidden font-['Baloo_Da_2'] text-[17.6px] font-normal leading-[30px] text-[#B8C4D5] lg:mt-2 lg:block">
              পুরো সিস্টেমটি ১ মিনিটে বুঝে নিন।
            </p>
          </div>

          <div className="mt-6 lg:mt-[52px]">
            <YouTubeOverlayVideo
              video={embeddedVideoByName["how-it-works"]}
              overlayImage={videoOverlay}
              buttonLabel="১ মিনিটের ভিডিও চালু করুন"
              srcParams="controls=0&playsinline=1&rel=0&showinfo=0&modestbranding=1&start=4&autoplay=1&mute=1&enablejsapi=1"
              className="group relative mx-auto h-[197px] w-full overflow-hidden rounded-2xl border border-[#12345A] bg-[#071526] shadow-[0_18px_42px_rgba(2,8,24,0.28)] lg:h-[558px] lg:w-[992px] lg:rounded-[32px] lg:border-[#E8B84E]/[0.28]"
            />
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="benefits-glow benefits-glow-top" />
        <div className="benefits-glow benefits-glow-bottom" />
        <div className="benefits-ring benefits-ring-top" />
        <div className="benefits-ring benefits-ring-bottom" />

        <div className="benefits-content">
          <div className="benefits-heading">
            <div className="benefits-eyebrow">
              <span />
              INCLUDED WITH THE BOOK
            </div>
            <div className="benefits-title-wrap">
              <h2>বইটির সাথে ফ্রি পাচ্ছেন</h2>
              <picture className="word-atlas-underline">
                <source
                  media="(max-width: 800px)"
                  srcSet={explainerUnderline}
                />
                <img
                  src={explainerUnderline}
                  alt=""
                  aria-hidden="true"
                  className="benefits-underline-image"
                />
              </picture>
            </div>
            <p>বই কিনলেই এগুলো পাচ্ছেন—আলাদা কোনো চার্জ নেই।</p>
          </div>

          <div className="benefits-grid">
            {featureCards.map((card) => (
              <article
                key={card.title}
                className="benefits-card"
                style={{
                  "--card-color": card.color,
                  "--badge-color": card.badgeColor,
                }}
              >
                <div className="benefits-card-halo" />
                <div className="benefits-card-header">
                  <div
                    className="benefits-card-icon"
                    style={{
                      color: card.icon === "note" ? "#BC5142" : "#16243A",
                    }}
                  >
                    <CardIcon type={card.icon} />
                  </div>
                  <span className="benefits-card-number">{card.bubble}</span>
                </div>
                <div className="benefits-card-badge">{card.badge}</div>
                <h3 className="benefits-card-title">{card.title}</h3>
                <p className="benefits-card-description">{card.description}</p>
              </article>
            ))}
          </div>

          <div className="benefits-note">
            <span>
              <img src={infoIcon} alt="" className="h-5 w-5 shrink-0" />
              Offline App, Vocal Exercise ও Tongue Twister বইয়ের Study Guide-এ
              সরাসরি আছে।
            </span>
          </div>
        </div>
      </section>

      <section
        id="book"
        className="relative overflow-hidden bg-[#f0e8df] px-4 py-20 sm:py-24 lg:py-28 text-[#102034]"
      >
        <div className="mx-auto max-w-[1120px] text-center">
          <div className="flex items-center justify-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.42em] text-[#af8f46]">
            <span
              className="h-[2px] w-4 rounded-full bg-[#af8f46]"
              aria-hidden="true"
            />
            INSIDE THE BOOK
            <span
              className="h-[2px] w-4 rounded-full bg-[#af8f46]"
              aria-hidden="true"
            />
          </div>
          <h3 className="mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] font-black tracking-[-0.02em] text-[#122034]">
            বইটি একটু পড়ে দেখুন।
          </h3>
          <img
            src={explainerUnderline}
            alt=""
            aria-hidden="true"
            className="mx-auto mt-1 h-auto w-[105px]"
          />
          <p className="mx-auto mt-3 max-w-[700px] text-sm text-[#0D1F35]">
            প্রতিটি পেজে রয়েছে শেখার প্রয়োজনীয় সব উপাদান।
          </p>

          <div className="mt-8">
            <div className="mx-auto w-full max-w-[820px]">
              <iframe
                title="Oxford 3000 PDF Flipbook"
                src={FLIPBOOK_URL}
                ref={flipBookRef}
                onLoad={handleFlipBookLoad}
                className="block h-[540px] w-full overflow-hidden border-0 bg-transparent"
                loading="eager"
                scrolling="no"
                style={{ overflow: "hidden" }}
              />
            </div>

            <div className="book-preview-controls-wrap">
              <div className="book-preview-controls">
                <button
                  type="button"
                  className={`book-preview-btn book-preview-btn-prev !inline-flex !h-11 !min-w-[137px] !items-center !justify-center !rounded-xl !border !border-[#d7c9a9] !px-5 !py-3 !text-[15px] !font-semibold !leading-5 !text-[#16243a] ${flipBookPage === 1 ? "book-preview-btn-muted" : ""}`}
                  aria-label="আগের পৃষ্ঠা"
                  aria-disabled={flipBookPage === 1}
                  disabled={flipBookPage === 1}
                  onClick={() => navigateFlipBook("previous")}
                >
                  <span className="book-preview-icon" aria-hidden="true">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 4L6 8L10 12"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="book-preview-label">আগের পৃষ্ঠা</span>
                </button>

                <div
                  className="book-preview-structure book-preview-page-indicator"
                  aria-live="polite"
                  aria-label={`বইয়ের পৃষ্ঠা ${flipBookPage} / ${flipBookPageCount}`}
                >
                  <span>
                    পৃষ্ঠা {flipBookPage} / {flipBookPageCount}
                  </span>
                </div>

                <button
                  type="button"
                  className={`book-preview-btn book-preview-btn-next !inline-flex !h-11 !min-w-[137px] !items-center !justify-center !rounded-xl !border !border-[#dce8f1] !px-5 !py-3 !text-[15px] !font-semibold !leading-5 !text-[#16243a] ${flipBookPage === flipBookPageCount ? "book-preview-btn-muted" : ""}`}
                  aria-label="পরের পৃষ্ঠা"
                  aria-disabled={flipBookPage === flipBookPageCount}
                  disabled={flipBookPage === flipBookPageCount}
                  onClick={() => navigateFlipBook("next")}
                >
                  <span className="book-preview-label">পরের পৃষ্ঠা</span>
                  <span className="book-preview-icon" aria-hidden="true">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 4L10 8L6 12"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="package"
        className="
    relative
    overflow-hidden
    bg-[#FBF5E8]
    px-4
    py-[86.4px]
    sm:px-6
    lg:px-8
  "
      >
        <div className="word-atlas-container">
          <div className="word-atlas-intro">
            <div>
              <div className="word-atlas-eyebrow">THE BOOK, UNPACKED</div>
              <h2>প্রতিটি শব্দের জন্য রয়েছে</h2>
              <img src={explainerUnderline} alt="" aria-hidden="true" />
            </div>
            <p>
              একটি Word Page-এ শুধু অর্থ নয়—উচ্চারণ, ব্যবহার ও Revision-এর
              প্রয়োজনীয় Cue-গুলোও একই Learning Sequence-এ সাজানো হয়েছে।
            </p>
          </div>

          <div className="word-atlas-shell mobile-word-atlas">
            <div className="word-atlas-spine" aria-hidden="true">
              <span>OXFORD 3000</span>
              <span>WORD-PAGE ATLAS</span>
            </div>
            <div className="word-atlas-topbar">
              <div className="word-atlas-mark">১২</div>
              <div>
                <h3>একটি শব্দের সম্পূর্ণ study kit</h3>
                <p>
                  শুরু থেকে revision পর্যন্ত প্রয়োজনীয় অংশ একসাথে খুঁজে নিন।
                </p>
              </div>
            </div>

            <div className="word-atlas-body">
              <div className="word-atlas-anatomy">
                <span>একটি WORD PAGE-এর ANATOMY</span>
                <h3>শেখার দরকারি তথ্য একসাথে</h3>
                <div className="word-atlas-fields">
                  {[
                    ["০১", "Serial Number"],
                    ["০২", "Level"],
                    ["০৩", "Parts of Speech"],
                    ["০৪", "বাংলা অর্থ"],
                    ["০৫", "বাংলা উচ্চারণ"],
                    ["০৬", "IPA / Phonetic"],
                    ["০৭", "Example"],
                    ["০৮", "উদাহরণের অর্থ"],
                    ["০৯", "Short Note"],
                    ["১০", "Synonym"],
                    ["১১", "Antonym"],
                    ["১২", "Practice Check"],
                  ].map(([number, label]) => (
                    <div className="word-atlas-field" key={number}>
                      <b>{number}</b>
                      <strong>{label}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="word-atlas-practice">
                <h3>মুখের জড়তা ও ভয় দূর করতে</h3>
                <div className="word-atlas-practice-row">
                  <b>০১</b>
                  <span
                    className="word-atlas-practice-icon word-atlas-mic-icon"
                    aria-hidden="true"
                  >
                    <img src={iconBase} alt="" width="18" height="18" />
                  </span>
                  <div>
                    <strong>Tongue Twister</strong>
                    <small>
                      মুখ ও জিহ্বার জড়তা কমিয়ে উচ্চারণ স্পষ্ট করতে সাহায্য
                      করে।
                    </small>
                  </div>
                </div>
                <div className="word-atlas-practice-row">
                  <b>০২</b>
                  <span
                    className="word-atlas-practice-icon word-atlas-speaker-icon"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M4 10v4h4l5 4V6l-5 4H4Z" />
                      <path d="M17 9.5a4 4 0 0 1 0 5M19.5 7a7.5 7.5 0 0 1 0 10" />
                    </svg>
                  </span>
                  <div>
                    <strong>Vocal Exercise</strong>
                    <small>
                      কণ্ঠস্বর খুলে আত্মবিশ্বাসের সঙ্গে কথা বলতে সাহায্য করে।
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="decision"
        className="decision-section
    relative
    overflow-hidden
    bg-[#050812]
    px-4
    py-[64px]
    sm:px-6
    sm:py-[80px]
    lg:px-8
    lg:py-[96px]
  "
      >
        <span
          id="android-app"
          className="absolute -top-[96px] h-px w-px"
          aria-hidden="true"
        />
        <div className="mx-auto w-full max-w-[1120px] max-md:flex max-md:flex-col">
          {/* =========================================================
        HERO
    ========================================================= */}
          <div
            className="
        max-md:order-1
        grid
        items-center
        gap-[48px]
        lg:grid-cols-[1fr_1.05fr]
        lg:gap-[32px]
      "
          >
            {/* ================= LEFT CONTENT ================= */}
            <div className="max-w-[560px] text-left">
              {/* BOOK + DIGITAL SUPPORT */}
              <div
                className="
            flex
            items-center
            gap-[8px]
            font-['Inter']
            text-[11px]
            font-bold
            uppercase
            leading-[17px]
            tracking-[2px]
            text-[#F7C84F]
          "
              >
                <span className="text-[13px]">—</span>
                <span>BOOK + DIGITAL SUPPORT</span>
              </div>

              {/* MAIN HEADING */}
              <h2
                className="
    mt-[14px]
    w-full
    max-w-[560px]
    font-['Baloo_Da_2']
    text-[46.08px]
    max-lg:text-[clamp(2rem,7vw,46.08px)]
    font-bold
    leading-[52.53px]
    max-lg:leading-[1.18]
    tracking-[-0.79px]
    text-white
  "
              >
                <span className="block font-['Baloo_Da_2'] font-bold">
                  ফ্রি অ্যান্ড্রয়েড অ্যাপ ডাউনলোড করুন
                </span>
              </h2>
              <img
                src={explainerUnderline}
                alt=""
                aria-hidden="true"
                className="learning-underline"
              />

              {/* DESCRIPTION */}
              <p
                className="
            mt-[18px]
            max-w-[520px]
            font-['Hind_Siliguri']
            text-[15px]
            font-normal
            leading-[25px]
            text-[#9AA6B6]
            sm:text-[16px]
          "
              >
                একই Vocabulary পড়া, শোনা, দেখা, প্র্যাকটিস ও ট্র্যাক করার জন্য
                ছয়টি পরস্পর সংযুক্ত Learning Support।
              </p>
              <a
                href="https://play.google.com/store/apps/details?id=vocab.englishcommando.bd"
                target="_blank"
                rel="noreferrer"
                className="learning-download learning-download-desktop"
              >
                ডাউনলোড করুন
                <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* ================= HERO ARTWORK ================= */}
            <div>
              <YouTubeOverlayVideo
                video={embeddedVideoByName.mobileapp}
                overlayImage={mobileVideoOverlay}
                srcParams="controls=0&playsinline=1&rel=0&showinfo=0&modestbranding=1&autoplay=0&mute=1&enablejsapi=1"
                className="decision-video-frame group mx-auto aspect-[467/831] w-[300px] max-w-full rounded-2xl border border-[#12345A] bg-[#071526] shadow-[0_18px_42px_rgba(2,8,24,0.28)] lg:w-full lg:max-w-[467px] lg:rounded-[32px] lg:border-[#E8B84E]/[0.28]"
                overlayImageClassName="decision-video-overlay"
              />
            </div>
          </div>

          {/* =========================================================
        FEATURE CARDS
    ========================================================= */}
          <div
            className="
        decision-feature-grid
        max-md:order-2
        mt-[58px]
        grid
        grid-cols-1
        gap-[12px]
        sm:grid-cols-2
        lg:grid-cols-3
        lg:gap-[12px]
      "
          >
            {/* ================= CARD 01 ================= */}
            <article
              className="
          relative
          min-h-[150px]
          overflow-hidden
          rounded-[14px]
          border
          border-[#202A3A]
          bg-[#0B111D]
          px-[20px]
          py-[20px]
          text-left
          shadow-[0_12px_28px_rgba(0,0,0,0.22)]
        "
            >
              <div className="flex items-start gap-[14px]">
                <div
                  className="
              flex
              h-[44px]
              w-[44px]
              shrink-0
              items-center
              justify-center
              rounded-[11px]
              bg-[#F7C84F]
              font-['Hind_Siliguri']
              text-[14px]
              font-bold
              text-[#10172A]
            "
                >
                  ০১
                </div>

                <div>
                  <h3 className="font-['Inter'] text-[16px] font-bold leading-[22px] text-white">
                    <span className="learning-desktop-title">
                      Vocabulary Book
                    </span>
                    <span className="learning-mobile-title">
                      ব্রিটিশ উচ্চারণ
                    </span>
                  </h3>

                  <p className="mt-[7px] max-w-[230px] font-['Hind_Siliguri'] text-[13px] leading-[21px] text-[#8E99AA]">
                    Oxford sequence-এ সাজানো বাংলা অর্থ, উচ্চারণ, Example ও
                    Short Note।
                  </p>
                </div>
              </div>

              <div className="absolute bottom-[16px] left-[64px] h-[2px] w-[64px] bg-gradient-to-r from-[#F7C84F] to-transparent" />
            </article>

            {/* ================= CARD 02 ================= */}
            <article
              className="
          relative
          min-h-[150px]
          overflow-hidden
          rounded-[14px]
          border
          border-[#202A3A]
          bg-[#0B111D]
          px-[20px]
          py-[20px]
          text-left
          shadow-[0_12px_28px_rgba(0,0,0,0.22)]
        "
            >
              <div className="flex items-start gap-[14px]">
                <div
                  className="
              flex
              h-[44px]
              w-[44px]
              shrink-0
              items-center
              justify-center
              rounded-[11px]
              bg-[#F7C84F]
              font-['Hind_Siliguri']
              text-[14px]
              font-bold
              text-[#10172A]
            "
                >
                  ০২
                </div>

                <div>
                  <h3 className="font-['Inter'] text-[16px] font-bold leading-[22px] text-white">
                    <span className="learning-desktop-title">
                      অ্যান্ড্রয়েড অ্যাপ
                    </span>
                    <span className="learning-mobile-title">
                      আমেরিকান উচ্চারণ
                    </span>
                  </h3>

                  <p className="mt-[7px] font-['Hind_Siliguri'] text-[13px] leading-[21px] text-[#8E99AA]">
                    <span className="block">
                      শব্দ অনুশীলন ও revision-এর জন্য বইয়ের সঙ্গে
                    </span>

                    <span className="block">যুক্ত digital support।</span>
                  </p>
                </div>
              </div>

              <div className="absolute bottom-[16px] left-[64px] h-[2px] w-[64px] bg-gradient-to-r from-[#F7C84F] to-transparent" />
            </article>

            {/* ================= CARD 03 ================= */}
            <article
              className="
          relative
          min-h-[150px]
          overflow-hidden
          rounded-[14px]
          border
          border-[#202A3A]
          bg-[#0B111D]
          px-[20px]
          py-[20px]
          text-left
          shadow-[0_12px_28px_rgba(0,0,0,0.22)]
        "
            >
              <div className="flex items-start gap-[14px]">
                <div
                  className="
              flex
              h-[44px]
              w-[44px]
              shrink-0
              items-center
              justify-center
              rounded-[11px]
              bg-[#F7C84F]
              font-['Hind_Siliguri']
              text-[14px]
              font-bold
              text-[#10172A]
            "
                >
                  ০৩
                </div>

                <div>
                  <h3 className="font-['Inter'] text-[16px] font-bold leading-[22px] text-white">
                    <span className="learning-desktop-title">অডিও পডকাস্ট</span>
                    <span className="learning-mobile-title">ভিডিও লেসন</span>
                  </h3>

                  <p className="mt-[7px] font-['Hind_Siliguri'] text-[13px] leading-[21px] text-[#8E99AA]">
                    <span className="block">
                      শুনুন, নিজে উচ্চারণ করুন এবং মনে রাখার চেষ্টা
                    </span>
                    <span className="block">করুন।</span>
                  </p>
                </div>
              </div>

              <div className="absolute bottom-[16px] left-[64px] h-[2px] w-[64px] bg-gradient-to-r from-[#F7C84F] to-transparent" />
            </article>

            {/* ================= CARD 04 ================= */}
            <article
              className="
          relative
          min-h-[150px]
          overflow-hidden
          rounded-[14px]
          border
          border-[#202A3A]
          bg-[#0B111D]
          px-[20px]
          py-[20px]
          text-left
          shadow-[0_12px_28px_rgba(0,0,0,0.22)]
        "
            >
              <div className="flex items-start gap-[14px]">
                <div
                  className="
              flex
              h-[44px]
              w-[44px]
              shrink-0
              items-center
              justify-center
              rounded-[11px]
              bg-[#F7C84F]
              font-['Hind_Siliguri']
              text-[14px]
              font-bold
              text-[#10172A]
            "
                >
                  ০৪
                </div>

                <div>
                  <h3 className="font-['Inter'] text-[16px] font-bold leading-[22px] text-white">
                    <span className="learning-desktop-title">ভিডিও লেসন</span>
                    <span className="learning-mobile-title">অডিও পডকাস্ট</span>
                  </h3>

                  <p className="mt-[7px] font-['Hind_Siliguri'] text-[13px] leading-[21px] text-[#8E99AA]">
                    <span className="block">
                      কঠিন অংশ ও ব্যবহার বুঝতে ধাপে ধাপে video
                    </span>
                    <span className="block">support।</span>
                  </p>
                </div>
              </div>

              <div className="absolute bottom-[16px] left-[64px] h-[2px] w-[64px] bg-gradient-to-r from-[#F7C84F] to-transparent" />
            </article>

            {/* ================= CARD 05 ================= */}
            <article
              className="
          relative
          min-h-[150px]
          overflow-hidden
          rounded-[14px]
          border
          border-[#202A3A]
          bg-[#0B111D]
          px-[20px]
          py-[20px]
          text-left
          shadow-[0_12px_28px_rgba(0,0,0,0.22)]
        "
            >
              <div className="flex items-start gap-[14px]">
                <div
                  className="
              flex
              h-[44px]
              w-[44px]
              shrink-0
              items-center
              justify-center
              rounded-[11px]
              bg-[#F7C84F]
              font-['Hind_Siliguri']
              text-[14px]
              font-bold
              text-[#10172A]
            "
                >
                  ০৫
                </div>

                <div>
                  <h3 className="font-['Inter'] text-[16px] font-bold leading-[22px] text-white">
                    <span className="learning-desktop-title">
                      Practice Support
                    </span>
                    <span className="learning-mobile-title">
                      প্রগ্রেস ট্র্যাকার
                    </span>
                  </h3>

                  <p className="mt-[7px] max-w-[230px] font-['Hind_Siliguri'] text-[13px] leading-[21px] text-[#8E99AA]">
                    Practice Check Box, Tongue Twister ও Vocal Exercise দিয়ে
                    active recall।
                  </p>
                </div>
              </div>

              <div className="absolute bottom-[16px] left-[64px] h-[2px] w-[64px] bg-gradient-to-r from-[#F7C84F] to-transparent" />
            </article>

            {/* ================= CARD 06 ================= */}
            <article
              className="
          relative
          min-h-[150px]
          overflow-hidden
          rounded-[14px]
          border
          border-[#202A3A]
          bg-[#0B111D]
          px-[20px]
          py-[20px]
          text-left
          shadow-[0_12px_28px_rgba(0,0,0,0.22)]
        "
            >
              <div className="flex items-start gap-[14px]">
                <div
                  className="
              flex
              h-[44px]
              w-[44px]
              shrink-0
              items-center
              justify-center
              rounded-[11px]
              bg-[#F7C84F]
              font-['Hind_Siliguri']
              text-[14px]
              font-bold
              text-[#10172A]
            "
                >
                  ০৬
                </div>

                <div>
                  <h3 className="font-['Inter'] text-[16px] font-bold leading-[22px] text-white">
                    <span className="learning-desktop-title">
                      প্রগ্রেস ট্র্যাকার
                    </span>
                    <span className="learning-mobile-title">
                      সম্পূর্ণ অফলাইন
                    </span>
                  </h3>

                  <p className="mt-[7px] font-['Hind_Siliguri'] text-[13px] leading-[21px] text-[#8E99AA]">
                    <span className="block">
                      শেখা, revision ও পরবর্তী ধাপ গুছিয়ে এগোনোর
                    </span>
                    <span className="block">ব্যবস্থা।</span>
                  </p>
                </div>
              </div>

              <div className="absolute bottom-[16px] left-[64px] h-[2px] w-[64px] bg-gradient-to-r from-[#F7C84F] to-transparent" />
            </article>
          </div>

          <a
            href="https://play.google.com/store/apps/details?id=vocab.englishcommando.bd"
            target="_blank"
            rel="noreferrer"
            className="learning-download learning-download-mobile"
          >
            ডাউনলোড করুন
            <span className="mobile-cta-arrow" aria-hidden="true">
              →
            </span>
          </a>

          {/* =========================================================
        BOTTOM CTA
    ========================================================= */}
          <div
            className="decision-cta
        mt-[14px]
        flex
        min-h-[78px]
        flex-col
        items-start
        justify-between
        gap-[20px]
        rounded-[14px]
        border
        border-[#173044]
        bg-[#0A1A26]
        px-[20px]
        py-[14px]
        sm:flex-row
        sm:items-center
        sm:px-[24px]
      "
          >
            {/* PRICE */}
            <div className="flex items-center gap-[14px]">
              <span
                className="
            font-['Hind_Siliguri']
            text-[30px]
            font-bold
            leading-none
            text-[#F7C84F]
          "
              >
                ৳৪৯৯
              </span>

              <span
                className="
            font-['Hind_Siliguri']
            text-[13px]
            font-normal
            leading-[20px]
            text-[#8E99AA]
          "
              >
                সারা দেশে ক্যাশ অন ডেলিভারি
              </span>
            </div>

            {/* ORDER BUTTON */}
            <a
              href="#order"
              className="button button--primary
          flex
          h-[48px]
          min-w-[198px]
          items-center
          justify-center
          gap-[10px]
          rounded-[11px]
          bg-[#F7C84F]
          px-[24px]
          font-['Hind_Siliguri']
          text-[15px]
          font-bold
          text-[#10172A]
          shadow-[0_12px_30px_rgba(247,200,79,0.28)]
          transition
          duration-200
          hover:-translate-y-[2px]
          hover:bg-[#FFD35F]
        "
            >
              এখনই অর্ডার করুন
              <span className="text-[20px] leading-none">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= WHO IT IS FOR ================= */}
      <section
        className="audience-section
    relative
    overflow-hidden
    bg-[#FFFDF7]
    px-4
    py-[70px]
    sm:px-6
    sm:py-[76px]
    lg:px-8
    lg:py-[80px]
  "
      >
        <div className="mx-auto w-full max-w-[1440px]">
          {/* ================= HEADER ================= */}
          <div className="mx-auto flex w-full flex-col items-center">
            {/* WHO IT IS FOR */}
            <div
              className="
          flex
          h-[17px]
          items-center
          justify-center
          gap-[8px]
          font-['Inter']
          text-[10px]
          font-bold
          uppercase
          leading-[15px]
          tracking-[2.5px]
          text-[#73500C]
          sm:text-[11px]
        "
            >
              <span
                className="
            h-[2px]
            w-[16px]
            shrink-0
            rounded-full
            bg-[#73500C]
          "
              />

              <span>WHO IT IS FOR</span>

              <span
                className="
            h-[2px]
            w-[16px]
            shrink-0
            rounded-full
            bg-[#73500C]
          "
              />
            </div>

            {/* ================= MAIN TITLE ================= */}
            <h2
              className="
          mt-[7px]
          whitespace-nowrap
          text-center
          font-['Hind_Siliguri']
          text-[32px]
          font-bold
          leading-[42px]
          tracking-[-0.6px]
          text-[#0A1730]
          sm:text-[36px]
          sm:leading-[48px]
          lg:text-[40px]
          lg:leading-[53px]
          lg:tracking-[-0.7929px]
        "
            >
              এই বইটি কাদের জন্য
            </h2>
            <img
              src={explainerUnderline}
              alt=""
              aria-hidden="true"
              className="audience-underline"
            />
            <p className="audience-lead">
              প্রয়োজনীয় ভোকাবুলারি একটি নির্দিষ্ট ক্রমে রিভাইজ করুন।
            </p>
          </div>

          {/* ================= CARDS ================= */}
          <div
            className="
        mx-auto
        mt-[42px]
        grid
        w-full
        max-w-[1152px]
        grid-cols-1
        gap-[16px]
        md:grid-cols-2
        lg:mt-[44px]
        lg:grid-cols-3
      "
          >
            {/* =========================================================
          CARD 01
      ========================================================= */}
            <article
              className="
          relative
          box-border
          h-[250px]
          overflow-hidden
          rounded-[16px]
          border
          border-[#DCD3C0]
          bg-[rgba(255,253,248,0.82)]
          px-[28.8px]
          py-[28.8px]
          shadow-[0px_14px_38px_rgba(4,9,20,0.09)]
        "
            >
              {/* Circle */}
              <div
                className="
            pointer-events-none
            absolute
            -bottom-[43px]
            -right-[43px]
            z-0
            h-[144px]
            w-[144px]
            rounded-full
            bg-[#FFF0B7]
          "
              />

              {/* Text ABOVE circle */}
              <div className="relative z-10">
                {/* Number */}
                <div
                  className="
              h-[21px]
              font-['Hind_Siliguri']
              text-[12px]
              font-bold
              leading-[20px]
              tracking-[1.44px]
              text-[#7F6D4A]
            "
                >
                  ০১
                </div>

                {/* Title */}
                <h3
                  className="
    mt-[12px]
    h-[32px]
    font-['Hind_Siliguri']
    text-[18.88px]
    font-bold
    leading-[32px]
    tracking-[-0.444712px]
    text-[#071229]
  "
                >
                  পরীক্ষার প্রস্তুতি
                </h3>

                {/* Audience */}
                <div
                  className="
    mt-[14px]
    w-full
    max-w-[314px]
    font-['Inter']
    text-[14.4px]
    font-bold
    leading-[24px]
    tracking-[-0.182812px]
    text-[#8D6213]
  "
                >
                  SSC, HSC, University, BCS & Bank Jobs
                </div>

                {/* Description */}
                <p
                  className="
              mt-[13.6px]
              w-full
              max-w-[314px]
              font-['Hind_Siliguri']
              text-[16px]
              font-normal
              leading-[27px]
              tracking-[-0.3125px]
              text-[#536174]
            "
                >
                  প্রয়োজনীয় vocabulary একটি নির্দিষ্ট sequence-এ revise করুন।
                </p>
              </div>
            </article>

            {/* =========================================================
          CARD 02
      ========================================================= */}
            <article
              className="
          relative
          box-border
          h-[250px]
          overflow-hidden
          rounded-[16px]
          border
          border-[#DCD3C0]
          bg-[rgba(255,253,248,0.82)]
          px-[28.8px]
          py-[28.8px]
          shadow-[0px_14px_38px_rgba(4,9,20,0.09)]
        "
            >
              {/* Circle */}
              <div
                className="
            pointer-events-none
            absolute
            -bottom-[43px]
            -right-[43px]
            z-0
            h-[144px]
            w-[144px]
            rounded-full
            bg-[#FFD6B7]
          "
              />

              {/* Text ABOVE circle */}
              <div className="relative z-10">
                {/* Number */}
                <div
                  className="
              h-[21px]
              font-['Hind_Siliguri']
              text-[12px]
              font-bold
              leading-[20px]
              tracking-[1.44px]
              text-[#7F6D4A]
            "
                >
                  ০২
                </div>

                {/* Title */}
                <h3
                  className="
              mt-[5px]
              h-[32px]
              font-['Hind_Siliguri']
              text-[18.88px]
              font-bold
              leading-[32px]
              tracking-[-0.444712px]
              text-[#071229]
            "
                >
                  যোগাযোগ দক্ষতা
                </h3>

                {/* Audience */}
                <div
                  className="
              mt-[14px]
              w-full
              max-w-[314px]
              font-['Inter']
              text-[14.4px]
              font-bold
              leading-[24px]
              tracking-[-0.182812px]
              text-[#8D6213]
            "
                >
                  Speaking, Reading, Writing & Listening
                </div>

                {/* Description */}
                <p
                  className="
              mt-[13.6px]
              w-full
              max-w-[314px]
              font-['Hind_Siliguri']
              text-[16px]
              font-normal
              leading-[27px]
              tracking-[-0.3125px]
              text-[#536174]
            "
                >
                  অর্থ জানার পাশাপাশি pronunciation, example ও ব্যবহার শিখুন।
                </p>
              </div>
            </article>

            {/* =========================================================
          CARD 03
      ========================================================= */}
            <article
              className="
          relative
          box-border
          h-[250px]
          overflow-hidden
          rounded-[16px]
          border
          border-[#DCD3C0]
          bg-[rgba(255,253,248,0.82)]
          px-[28.8px]
          py-[28.8px]
          shadow-[0px_14px_38px_rgba(4,9,20,0.09)]
        "
            >
              {/* Circle */}
              <div
                className="
            pointer-events-none
            absolute
            -bottom-[43px]
            -right-[43px]
            z-0
            h-[144px]
            w-[144px]
            rounded-full
            bg-[#FFF0B7]
          "
              />

              {/* Text ABOVE circle */}
              <div className="relative z-10">
                {/* Number */}
                <div
                  className="
              h-[21px]
              font-['Hind_Siliguri']
              text-[12px]
              font-bold
              leading-[20px]
              tracking-[1.44px]
              text-[#7F6D4A]
            "
                >
                  ০৩
                </div>

                {/* Title */}
                <h3
                  className="
              mt-[5px]
              h-[32px]
              font-['Hind_Siliguri']
              text-[18.88px]
              font-bold
              leading-[32px]
              tracking-[-0.444712px]
              text-[#071229]
            "
                >
                  নিজে শেখার যাত্রা
                </h3>

                {/* Audience */}
                <div
                  className="
              mt-[14px]
              w-full
              max-w-[314px]
              font-['Inter']
              text-[14.4px]
              font-bold
              leading-[24px]
              tracking-[-0.182812px]
              text-[#8D6213]
            "
                >
                  Beginners & Self-Learners
                </div>

                {/* Description */}
                <p
                  className="
    mt-[13.6px]
    w-[calc(100%+20px)]
    max-w-none
    font-['Hind_Siliguri']
    text-[16px]
    font-normal
    leading-[27px]
    tracking-[-0.3125px]
    text-[#536174]
  "
                >
                  বই, App ও support একসাথে রেখে প্রতিদিনের শেখা
                  <br />
                  সহজ করুন।
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Section - 9 */}

      {/* ================= STUDENT PROOF ================= */}
      {/* =========================================================
    STUDENT PROOF
========================================================= */}
      <section
        className="student-proof-section
    relative
    bg-[#050A14]
    px-4
    py-[80px]
    sm:px-6
    sm:py-[96px]
    lg:px-8
    lg:py-[108px]
  "
      >
        <div className="mx-auto w-full max-w-[1152px]">
          {/* =========================================================
    HEADER
========================================================= */}
          <div
            id="student-stories"
            className="flex flex-col items-center text-center"
          >
            {/* STUDENT PROOF */}
            <div
              className="
      flex
      items-center
      justify-center
      gap-[8px]
      font-['Inter']
      text-[11px]
      font-bold
      uppercase
      leading-[16px]
      tracking-[2.5px]
      text-[#F7C84F]
    "
            >
              <span
                className="
              student-proof-label-line
        h-[2px]
        w-[16px]
        shrink-0
        rounded-full
        bg-[#F7C84F]
      "
              />

              <span>STUDENT PROOF</span>

              <span
                className="
        h-[2px]
        w-[16px]
        shrink-0
        rounded-full
        bg-[#F7C84F]
      "
              />
            </div>

            {/* MAIN TITLE */}
            <h2
              className="
      mt-[8px]
      whitespace-nowrap
      font-['Hind_Siliguri']
      text-[40px]
      font-bold
      leading-[53px]
      tracking-[-0.8px]
      text-white
      sm:text-[44px]
      sm:leading-[58px]
    "
            >
              শিক্ষার্থীদের অভিজ্ঞতা
            </h2>
            <img
              src={explainerUnderline}
              alt=""
              aria-hidden="true"
              className="student-proof-underline"
            />
          </div>

          {/* =========================================================
        STUDENT STORIES
    ========================================================= */}
          <div className="mt-[48px]">
            {/* Sub heading */}
            <div className="text-center">
              {/* STUDENT STORIES */}
              <div
                className="
      student-stories-label
      flex
      items-center
      justify-center
      gap-[8px]
      font-['Inter']
      text-[10px]
      font-bold
      uppercase
      leading-[15px]
      tracking-[2.5px]
      text-[#F7C84F]
    "
              >
                <span
                  className="
        h-[2px]
        w-[16px]
        shrink-0
        rounded-full
        bg-[#F7C84F]
      "
                />

                <span>STUDENT STORIES</span>

                <span
                  className="
        h-[2px]
        w-[16px]
        shrink-0
        rounded-full
        bg-[#F7C84F]
      "
                />
              </div>

              {/* VIDEO TITLE */}
              <h3
                className="
      mt-[6px]
      font-['Hind_Siliguri']
      text-[28px]
      font-bold
      leading-[38px]
      text-white
      sm:text-[30px]
      sm:leading-[40px]
    "
              >
                ভিডিও অভিজ্ঞতা
              </h3>
            </div>

            {/* =========================================================
          VIDEO CARDS
      ========================================================= */}
            <div className="student-proof-carousel-viewport relative mx-auto mt-[24px] w-full max-w-[910px]">
              <div
                className="student-proof-grid student-proof-track grid w-full grid-cols-1 gap-[22px] sm:grid-cols-3"
                style={{ "--review-slide": reviewSlide }}
              >
                {/* =======================================================
            CARD 01
        ======================================================= */}
                <div
                  className="
              student-proof-card
            relative
            h-[570px]
            overflow-visible
            rounded-[16px]
            border
            border-[#24354D]
            bg-[#07152D]
            shadow-[0_20px_45px_rgba(0,0,0,0.35)]
          "
                >
                  <YouTubeReviewVideo
                    className="absolute inset-0 z-0"
                    video={embeddedVideoByName.review1}
                    onSwipe={handleReviewSwipe}
                  />
                  {/* Background */}
                  <div
                    className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_70%_18%,rgba(49,108,140,0.48),transparent_34%),linear-gradient(145deg,#183E67_0%,#071A39_42%,#06122A_100%)]
            "
                  />

                  {/* Top horizontal line */}
                  <div
                    className="
              pointer-events-none
              absolute
              left-0
              top-[66px]
              z-10
              h-[2px]
              w-[68px]
              bg-[#718398]
              opacity-60
            "
                  />

                  {/* ================= DIAGONAL LINE 01 ================= */}
                  <div
                    className="
              pointer-events-none
              absolute
              left-[-30px]
              top-[155px]
              z-10
              h-[1px]
              w-[370px]
              rotate-[-29deg]
              origin-center
              bg-[#B79A42]
              opacity-80
            "
                  />

                  {/* ================= CIRCLE ================= */}
                  <div
                    className="
              pointer-events-none
              absolute
              left-[58px]
              top-[175px]
              z-10
              h-[180px]
              w-[180px]
              rounded-full
              border
              border-[#B79A42]
              opacity-80
            "
                  />

                  {/* ================= DIAGONAL LINE 02 ================= */}
                  <div
                    className="
              pointer-events-none
              absolute
              left-[-30px]
              top-[375px]
              z-10
              h-[1px]
              w-[370px]
              rotate-[-29deg]
              origin-center
              bg-[#B79A42]
              opacity-70
            "
                  />

                  {/* ================= YELLOW GLOW DOT ================= */}
                  <div
                    className="
              pointer-events-none
              absolute
              right-[42px]
              top-[132px]
              z-20
              flex
              h-[28px]
              w-[28px]
              items-center
              justify-center
              rounded-full
              bg-[#F7C84F]/15
              shadow-[0_0_18px_rgba(247,200,79,0.16)]
            "
                  >
                    <div
                      className="
                h-[8px]
                w-[8px]
                rounded-full
                bg-[#F7C84F]
                shadow-[0_0_10px_3px_rgba(247,200,79,0.35)]
              "
                    />
                  </div>

                  {/* ================= CENTER NUMBER ================= */}
                  <div
                    className="
              absolute
              left-1/2
              top-[220px]
              z-30
              flex
              h-[90px]
              w-[120px]
              -translate-x-1/2
              items-center
              justify-center
              font-['Hind_Siliguri']
              text-[64px]
              font-bold
              leading-none
              tracking-[-5px]
              text-[#F7C84F]
            "
                  >
                    ০১
                  </div>

                  {/* Bottom right line */}
                  <div
                    className="
              pointer-events-none
              absolute
              bottom-[73px]
              right-0
              z-20
              h-[2px]
              w-[68px]
              bg-[#718398]
              opacity-60
            "
                  />

                  {/* Oxford label */}
                  <div
                    className="
              absolute
              bottom-[54px]
              left-[18px]
              z-30
              font-['Inter']
              text-[10px]
              font-bold
              uppercase
              tracking-[1.8px]
              text-white/75
            "
                  >
                    OXFORD 3000
                  </div>

                  {/* Student info */}
                  <div
                    className="
              student-card-caption
              absolute
              bottom-0
              left-0
              right-0
              z-40
              h-[66px]
              bg-[#121925]
              px-[18px]
              py-[10px]
            "
                  >
                    <div
                      className="
                font-['Hind_Siliguri']
                text-[17px]
                font-bold
                leading-[24px]
                text-white
              "
                    >
                      শিক্ষার্থী ০১
                    </div>

                    <div
                      className="
                font-['Hind_Siliguri']
                text-[12px]
                leading-[18px]
                text-white/55
              "
                    >
                      ব্যবহারকারী
                    </div>
                  </div>
                </div>

                {/* =======================================================
            CARD 02
        ======================================================= */}
                <div
                  className="
              student-proof-card
            relative
            h-[570px]
            overflow-visible
            rounded-[16px]
            border
            border-[#24354D]
            bg-[#07152D]
            shadow-[0_20px_45px_rgba(0,0,0,0.35)]
          "
                >
                  <YouTubeReviewVideo
                    className="absolute inset-0 z-0"
                    video={embeddedVideoByName.review2}
                    onSwipe={handleReviewSwipe}
                  />
                  {/* Background */}
                  <div
                    className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_70%_18%,rgba(49,108,140,0.48),transparent_34%),linear-gradient(145deg,#183E67_0%,#071A39_42%,#06122A_100%)]
            "
                  />

                  {/* Top horizontal line */}
                  <div
                    className="
              pointer-events-none
              absolute
              left-0
              top-[66px]
              z-10
              h-[2px]
              w-[68px]
              bg-[#718398]
              opacity-60
            "
                  />

                  {/* Diagonal line 01 */}
                  <div
                    className="
              pointer-events-none
              absolute
              left-[-30px]
              top-[155px]
              z-10
              h-[1px]
              w-[370px]
              rotate-[-29deg]
              origin-center
              bg-[#B79A42]
              opacity-80
            "
                  />

                  {/* Circle */}
                  <div
                    className="
              pointer-events-none
              absolute
              left-[58px]
              top-[175px]
              z-10
              h-[180px]
              w-[180px]
              rounded-full
              border
              border-[#B79A42]
              opacity-80
            "
                  />

                  {/* Diagonal line 02 */}
                  <div
                    className="
              pointer-events-none
              absolute
              left-[-30px]
              top-[375px]
              z-10
              h-[1px]
              w-[370px]
              rotate-[-29deg]
              origin-center
              bg-[#B79A42]
              opacity-70
            "
                  />

                  {/* Yellow glow dot */}
                  <div
                    className="
              pointer-events-none
              absolute
              right-[42px]
              top-[132px]
              z-20
              flex
              h-[28px]
              w-[28px]
              items-center
              justify-center
              rounded-full
              bg-[#F7C84F]/15
              shadow-[0_0_18px_rgba(247,200,79,0.16)]
            "
                  >
                    <div
                      className="
                h-[8px]
                w-[8px]
                rounded-full
                bg-[#F7C84F]
                shadow-[0_0_10px_3px_rgba(247,200,79,0.35)]
              "
                    />
                  </div>

                  {/* Center number */}
                  <div
                    className="
              absolute
              left-1/2
              top-[220px]
              z-30
              flex
              h-[90px]
              w-[120px]
              -translate-x-1/2
              items-center
              justify-center
              font-['Hind_Siliguri']
              text-[64px]
              font-bold
              leading-none
              tracking-[-5px]
              text-[#F7C84F]
            "
                  >
                    ০২
                  </div>

                  {/* Bottom right line */}
                  <div
                    className="
              pointer-events-none
              absolute
              bottom-[73px]
              right-0
              z-20
              h-[2px]
              w-[68px]
              bg-[#718398]
              opacity-60
            "
                  />

                  {/* Oxford */}
                  <div
                    className="
              absolute
              bottom-[54px]
              left-[18px]
              z-30
              font-['Inter']
              text-[10px]
              font-bold
              uppercase
              tracking-[1.8px]
              text-white/75
            "
                  >
                    OXFORD 3000
                  </div>

                  {/* Student info */}
                  <div
                    className="
              student-card-caption
              absolute
              bottom-0
              left-0
              right-0
              z-40
              h-[66px]
              bg-[#121925]
              px-[18px]
              py-[10px]
            "
                  >
                    <div
                      className="
                font-['Hind_Siliguri']
                text-[17px]
                font-bold
                leading-[24px]
                text-white
              "
                    >
                      শিক্ষার্থী ০২
                    </div>

                    <div
                      className="
                font-['Hind_Siliguri']
                text-[12px]
                leading-[18px]
                text-white/55
              "
                    >
                      ব্যবহারকারী
                    </div>
                  </div>
                </div>

                {/* =======================================================
            CARD 03
        ======================================================= */}
                <div
                  className="
              student-proof-card
            relative
            h-[570px]
            overflow-visible
            rounded-[16px]
            border
            border-[#24354D]
            bg-[#07152D]
            shadow-[0_20px_45px_rgba(0,0,0,0.35)]
          "
                >
                  <YouTubeReviewVideo
                    className="absolute inset-0 z-0"
                    video={embeddedVideoByName.review3}
                    onSwipe={handleReviewSwipe}
                  />
                  {/* Background */}
                  <div
                    className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_70%_18%,rgba(49,108,140,0.48),transparent_34%),linear-gradient(145deg,#183E67_0%,#071A39_42%,#06122A_100%)]
            "
                  />

                  {/* Top horizontal line */}
                  <div
                    className="
              pointer-events-none
              absolute
              left-0
              top-[66px]
              z-10
              h-[2px]
              w-[68px]
              bg-[#718398]
              opacity-60
            "
                  />

                  {/* Diagonal line 01 */}
                  <div
                    className="
              pointer-events-none
              absolute
              left-[-30px]
              top-[155px]
              z-10
              h-[1px]
              w-[370px]
              rotate-[-29deg]
              origin-center
              bg-[#B79A42]
              opacity-80
            "
                  />

                  {/* Circle */}
                  <div
                    className="
              pointer-events-none
              absolute
              left-[58px]
              top-[175px]
              z-10
              h-[180px]
              w-[180px]
              rounded-full
              border
              border-[#B79A42]
              opacity-80
            "
                  />

                  {/* Diagonal line 02 */}
                  <div
                    className="
              pointer-events-none
              absolute
              left-[-30px]
              top-[375px]
              z-10
              h-[1px]
              w-[370px]
              rotate-[-29deg]
              origin-center
              bg-[#B79A42]
              opacity-70
            "
                  />

                  {/* Yellow glow dot */}
                  <div
                    className="
              pointer-events-none
              absolute
              right-[42px]
              top-[132px]
              z-20
              flex
              h-[28px]
              w-[28px]
              items-center
              justify-center
              rounded-full
              bg-[#F7C84F]/15
              shadow-[0_0_18px_rgba(247,200,79,0.16)]
            "
                  >
                    <div
                      className="
                h-[8px]
                w-[8px]
                rounded-full
                bg-[#F7C84F]
                shadow-[0_0_10px_3px_rgba(247,200,79,0.35)]
              "
                    />
                  </div>

                  {/* Center number */}
                  <div
                    className="
              absolute
              left-1/2
              top-[220px]
              z-30
              flex
              h-[90px]
              w-[120px]
              -translate-x-1/2
              items-center
              justify-center
              font-['Hind_Siliguri']
              text-[64px]
              font-bold
              leading-none
              tracking-[-5px]
              text-[#F7C84F]
            "
                  >
                    ০৩
                  </div>

                  {/* Bottom right line */}
                  <div
                    className="
              pointer-events-none
              absolute
              bottom-[73px]
              right-0
              z-20
              h-[2px]
              w-[68px]
              bg-[#718398]
              opacity-60
            "
                  />

                  {/* Oxford */}
                  <div
                    className="
              absolute
              bottom-[54px]
              left-[18px]
              z-30
              font-['Inter']
              text-[10px]
              font-bold
              uppercase
              tracking-[1.8px]
              text-white/75
            "
                  >
                    OXFORD 3000
                  </div>

                  {/* Student info */}
                  <div
                    className="
              student-card-caption
              absolute
              bottom-0
              left-0
              right-0
              z-40
              h-[66px]
              bg-[#121925]
              px-[18px]
              py-[10px]
            "
                  >
                    <div
                      className="
                font-['Hind_Siliguri']
                text-[17px]
                font-bold
                leading-[24px]
                text-white
              "
                    >
                      শিক্ষার্থী ০৩
                    </div>

                    <div
                      className="
                font-['Hind_Siliguri']
                text-[12px]
                leading-[18px]
                text-white/55
              "
                    >
                      ব্যবহারকারী
                    </div>
                  </div>
                </div>

                {/* =======================================================
            CARD 04 - URL placeholder
        ======================================================= */}
                {[
                  ["০৪", embeddedVideoByName.review4],
                  ["০৫", embeddedVideoByName.review5],
                  ["০৬", embeddedVideoByName.review6],
                ].map(([number, video]) => (
                  <div
                    key={number}
                    className="
                  student-proof-placeholder-card
              student-proof-card
            relative
            h-[570px]
            overflow-hidden
            rounded-[16px]
            border
            border-[#24354D]
            bg-[#07152D]
            shadow-[0_20px_45px_rgba(0,0,0,0.35)]
          "
                  >
                    <YouTubeReviewVideo
                      className="absolute inset-0 z-0"
                      video={video}
                      onSwipe={handleReviewSwipe}
                    />
                    <div className="student-card-caption absolute bottom-0 left-0 right-0 z-40 h-[66px] bg-[#121925] px-[18px] py-[10px] text-left">
                      <div className="font-['Hind_Siliguri'] text-[17px] font-bold leading-[24px] text-white">
                        শিক্ষার্থী {number}
                      </div>
                      <div className="font-['Hind_Siliguri'] text-[12px] leading-[18px] text-white/55">
                        ব্যবহারকারী
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="student-proof-carousel-controls"
              aria-label="Student review navigation"
            >
              <button
                type="button"
                className="student-proof-carousel-button"
                aria-label="আগের ভিডিও"
                onClick={() => handleReviewSwipe("previous")}
                disabled={reviewSlide === 0}
              >
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M10 4L6 8L10 12"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="student-proof-carousel-dots">
                {[0, 1].map((slide) => (
                  <button
                    type="button"
                    key={slide}
                    aria-label={`ভিডিও স্লাইড ${slide + 1}`}
                    aria-current={slide === reviewSlide ? "true" : undefined}
                    className={slide === reviewSlide ? "active" : ""}
                    onClick={() => setReviewSlide(slide)}
                  />
                ))}
              </div>
              <button
                type="button"
                className="student-proof-carousel-button"
                aria-label="পরের ভিডিও"
                onClick={() => handleReviewSwipe("next")}
                disabled={reviewSlide === 1}
              >
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M6 4L10 8L6 12"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <p className="student-proof-swipe-hint">ভিডিও দেখতে সোয়াইপ করুন</p>
          </div>

          {/* =========================================================
    WRITTEN FEEDBACK
========================================================= */}
          <div className="mt-[52px] hidden">
            {/* ================= HEADING ================= */}
            <div className="text-center">
              <div
                className="
        flex
        items-center
        justify-center
        gap-[8px]
        font-['Inter']
        text-[11px]
        font-bold
        uppercase
        leading-[16px]
        tracking-[2.5px]
        text-[#F7C84F]
      "
              >
                <span
                  className="
          h-[2px]
          w-[16px]
          shrink-0
          rounded-full
          bg-[#F7C84F]
        "
                />

                <span>WRITTEN FEEDBACK</span>

                <span
                  className="
          h-[2px]
          w-[16px]
          shrink-0
          rounded-full
          bg-[#F7C84F]
        "
                />
              </div>

              <h3
                className="
        mt-[6px]
        font-['Hind_Siliguri']
        text-[28px]
        font-bold
        leading-[38px]
        text-white
      "
              >
                লিখিত মতামত
              </h3>
            </div>

            {/* ================= FEEDBACK CARDS ================= */}
            <div
              className="
      mx-auto
      mt-[24px]
      grid
      w-full
      max-w-[1120px]
      grid-cols-1
      gap-[12px]
      sm:grid-cols-3
    "
            >
              {/* ================= FEEDBACK 01 ================= */}
              <div
                className="
        flex
        min-h-[96px]
        items-start
        rounded-[14px]
        border
        border-[#202A3A]
        bg-[#0B111D]
        px-[18px]
        py-[16px]
        text-left
      "
              >
                <div
                  className="
          shrink-0
          font-['Georgia']
          text-[32px]
          font-bold
          leading-[28px]
          text-[#F7C84F]
        "
                >
                  “
                </div>

                <p
                  className="
          ml-[10px]
          pt-[1px]
          font-['Hind_Siliguri']
          text-[15px]
          font-normal
          leading-[24px]
          tracking-[-0.15px]
          text-[#D8DEE8]
        "
                >
                  আগে শুধু word meaning পড়তাম, কিন্তু মনে থাকত না। এখন example,
                  audio আর app দিয়ে revise করতে পারছি।
                </p>
              </div>

              {/* ================= FEEDBACK 02 ================= */}
              <div
                className="
        flex
        min-h-[96px]
        items-start
        rounded-[14px]
        border
        border-[#202A3A]
        bg-[#0B111D]
        px-[18px]
        py-[16px]
        text-left
      "
              >
                <div
                  className="
          shrink-0
          font-['Georgia']
          text-[32px]
          font-bold
          leading-[28px]
          text-[#F7C84F]
        "
                >
                  “
                </div>

                <p
                  className="
          ml-[10px]
          max-w-[310px]
          pt-[1px]
          font-['Hind_Siliguri']
          text-[15px]
          font-normal
          leading-[24px]
          tracking-[-0.15px]
          text-[#D8DEE8]
        "
                >
                  Oxford 3000 এক জায়গায় সাজানো থাকায় আলাদা করে meaning খুঁজতে
                  হয় না। সময় বাঁচে।
                </p>
              </div>

              {/* ================= FEEDBACK 03 ================= */}
              <div
                className="
        flex
        min-h-[96px]
        items-start
        rounded-[14px]
        border
        border-[#202A3A]
        bg-[#0B111D]
        px-[18px]
        py-[16px]
        text-left
      "
              >
                <div
                  className="
          shrink-0
          font-['Georgia']
          text-[32px]
          font-bold
          leading-[28px]
          text-[#F7C84F]
        "
                >
                  “
                </div>

                <p
                  className="
          ml-[10px]
          pt-[1px]
          font-['Hind_Siliguri']
          text-[15px]
          font-normal
          leading-[24px]
          tracking-[-0.15px]
          text-[#D8DEE8]
        "
                >
                  বইয়ের সাথে app, audio আর video পাওয়ায় vocabulary শেখা অনেক
                  সহজ হয়েছে।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
    THE DECISION
========================================================= */}

      <section
        className="comparison-section"
        aria-labelledby="comparison-title"
      >
        <div className="comparison-content">
          <h2 id="comparison-title">অন্যান্য বইয়ের সাথে আমাদের পার্থক্য</h2>
          <img
            src={explainerUnderline}
            alt=""
            aria-hidden="true"
            className="comparison-underline"
          />

          <div className="comparison-table comparison-feature-table">
            <div className="comparison-row comparison-header-row">
              <div>বৈশিষ্ট্য</div>
              <div>আমাদের বই</div>
              <div>অন্যান্য বই</div>
            </div>
            {[
              ["অ্যান্ড্রয়েড অ্যাপ", true, false],
              ["ভিডিও লেসন", true, false],
              ["অডিও পডকাস্ট", true, false],
              ["প্রগ্রেস ট্র্যাকার", true, false],
              ["বাংলা অর্থ", true, true],
              ["গ্রামার নোট", true, false],
              ["চেকলিস্ট বক্স", true, false],
              ["পার্টস অব স্পিচ", true, true],
              ["ভোকাল এক্সারসাইজ", true, false],
              ["টাং টুইস্টার", true, false],
              ["অক্সফোর্ড সিকোয়েন্স", true, false],
              ["এক্সাম্পল", true, true],
            ].map(([feature, ours, others]) => (
              <div className="comparison-row" key={feature}>
                <div className="comparison-feature">{feature}</div>
                <div className="comparison-status comparison-ours">
                  <span className="comparison-check">{ours ? "✓" : "×"}</span>
                </div>
                <div className="comparison-status comparison-others">
                  <span
                    className={
                      others
                        ? "comparison-check is-positive"
                        : "comparison-check is-negative"
                    }
                  >
                    {others ? "✓" : "×"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="comparison-legacy-section relative overflow-hidden bg-[#FFFDF7] px-4 py-[70px] sm:px-6 sm:py-[76px] lg:px-8 lg:py-[86.4px]">
        {/* Subtle Figma background glow */}
        <div
          className="
      pointer-events-none
      absolute
      inset-0
      bg-[radial-gradient(106.02%_147.25%_at_85%_12%,rgba(248,201,75,0.13)_0%,rgba(248,201,75,0)_21%)]
    "
        />

        <div
          className="
      relative
      mx-auto
      flex
      w-full
      max-w-[1440px]
      flex-col
      items-center
    "
        >
          {/* =========================================================
        HEADER
    ========================================================= */}

          <div
            className="
        decision-header
        flex
        w-full
        max-w-[752px]
        flex-col
        items-center
      "
          >
            {/* THE DECISION */}
            <div
              className="
          flex
          h-[17px]
          items-center
          justify-center
          gap-[8px]
          font-['Inter']
          text-[12px]
          font-bold
          uppercase
          leading-[16px]
          tracking-[1.56px]
          text-[#73500C]
        "
            >
              <span
                className="
            h-[2px]
            w-[16px]
            shrink-0
            rounded-full
            bg-[#73500C]
          "
              />

              <span>THE DECISION</span>

              <span
                className="
            h-[2px]
            w-[16px]
            shrink-0
            rounded-full
            bg-[#73500C]
          "
              />
            </div>

            {/* MAIN TITLE */}
            <h2
              className="
      decision-title
    mt-[8px]
    w-full
    text-center
    text-[40px]
    font-bold
    leading-[52.53px]
    tracking-[-0.79px]
    text-[#0A1730]
  "
            >
              <span className="font-['Hind_Siliguri'] font-bold">সাধারণ </span>

              <span className="font-['Inter'] font-bold">Word List</span>

              <span className="font-['Hind_Siliguri'] font-bold">
                {" "}
                থেকে এটি কীভাবে আলাদা?
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
      decision-description
    mt-[14px]
    w-full
    text-center
    text-[17.6px]
    font-normal
    leading-[30px]
    tracking-[-0.44px]
    text-[#536174]
  "
            >
              <span className="font-['Hind_Siliguri']">সঠিক </span>

              <span className="font-['Inter']">Learning System</span>

              <span className="font-['Hind_Siliguri']">
                {" "}
                কীভাবে আপনার শেখার জার্নি বদলে দিতে পারে, জেনে নিন।
              </span>
            </p>
          </div>

          {/* =========================================================
        TABLE WRAPPER
    ========================================================= */}

          <div
            className="
        decision-table-scroll
        mt-[42px]
        w-full
        max-w-[1152px]
        overflow-x-auto
        pb-1
        lg:mt-[52px]
      "
          >
            {/* Fixed desktop table width.
          On mobile user can scroll horizontally. */}
            <div
              className="
          decision-table
          mx-auto
          min-w-[736px]
          w-[1150px]
          overflow-hidden
          rounded-[16px]
          border
          border-[#DCD3C0]
          bg-[#FFFDF8]
          shadow-[0px_12px_36px_rgba(4,9,20,0.08)]
        "
            >
              {/* =====================================================
            TABLE HEADER
        ===================================================== */}

              <div
                className="
            grid
            h-[65.59px]
            grid-cols-[345px_482.36px_322.66px]
          "
              >
                {/* Column 01 */}
                <div
                  className="
              flex
              items-center
              bg-[#071229]
              px-[24px]
              font-['Hind_Siliguri']
              text-[14.4px]
              font-bold
              leading-[24px]
              tracking-[-0.182812px]
              text-white
            "
                >
                  শেখার প্রয়োজন
                </div>

                {/* Column 02 */}
                <div
                  className="
              flex
              items-center
              bg-[#F8C94B]
              px-[24px]
              font-['Inter']
              text-[14.4px]
              font-bold
              leading-[24px]
              tracking-[-0.182812px]
              text-[#040914]
            "
                >
                  Oxford 3000 System
                </div>

                {/* Column 03 */}
                <div
                  className="
              flex
              items-center
              bg-[#071229]
              px-[24px]
              font-['Hind_Siliguri']
              text-[14.4px]
              font-bold
              leading-[24px]
              tracking-[-0.182812px]
              text-white
            "
                >
                  সাধারণ বই
                </div>
              </div>

              {/* =====================================================
            ROW 01
        ===================================================== */}

              <div
                className="
            grid
            h-[68.09px]
            grid-cols-[345px_482.36px_322.66px]
          "
              >
                {/* শেখার প্রয়োজন */}
                <div
                  className="
              flex
              items-center
              border-b
              border-[#DCD3C0]
              px-[24px]
              font-['Hind_Siliguri']
              text-[16px]
              font-bold
              leading-[27px]
              tracking-[-0.3125px]
              text-[#071229]
            "
                >
                  শব্দ শেখার ক্রম
                </div>

                {/* Oxford */}
                <div
                  className="
              flex
              items-center
              gap-[8.8px]
              border-b
              border-[#DCD3C0]
              bg-[#FFF8DC]
              px-[24px]
            "
                >
                  {/* Check */}
                  <span
                    className="
                flex
                h-[20.8px]
                w-[20.8px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#071229]
                font-['Inter']
                text-[11.52px]
                font-semibold
                leading-[19px]
                text-white
              "
                  >
                    ✓
                  </span>

                  <span
                    className="
                font-['Inter']
                text-[16px]
                font-semibold
                leading-[27px]
                tracking-[-0.3125px]
                text-[#071229]
              "
                  >
                    Oxford 3000 sequence
                  </span>
                </div>

                {/* সাধারণ বই */}
                <div
                  className="
              flex
              items-center
              border-b
              border-[#DCD3C0]
              px-[24px]
              font-['Hind_Siliguri']
              text-[16px]
              font-normal
              leading-[27px]
              tracking-[-0.3125px]
              text-[#536174]
            "
                >
                  বিচ্ছিন্ন word list
                </div>
              </div>

              {/* =====================================================
            ROW 02
        ===================================================== */}

              <div
                className="
            grid
            h-[68.59px]
            grid-cols-[345px_482.36px_322.66px]
          "
              >
                {/* শেখার প্রয়োজন */}
                <div
                  className="
              flex
              items-center
              border-b
              border-[#DCD3C0]
              px-[24px]
              font-['Hind_Siliguri']
              text-[16px]
              font-bold
              leading-[27px]
              tracking-[-0.3125px]
              text-[#071229]
            "
                >
                  বোঝা ও উচ্চারণ
                </div>

                {/* Oxford */}
                <div
                  className="
              flex
              items-center
              gap-[8.8px]
              border-b
              border-[#DCD3C0]
              bg-[#FFF8DC]
              px-[24px]
            "
                >
                  <span
                    className="
                flex
                h-[20.8px]
                w-[20.8px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#071229]
                font-['Inter']
                text-[11.52px]
                font-semibold
                leading-[19px]
                text-white
              "
                  >
                    ✓
                  </span>

                  <span
                    className="
                font-['Hind_Siliguri']
                text-[16px]
                font-semibold
                leading-[27px]
                tracking-[-0.3125px]
                text-[#071229]
              "
                  >
                    বাংলা অর্থ + উচ্চারণ + Example
                  </span>
                </div>

                {/* সাধারণ বই */}
                <div
                  className="
              flex
              items-center
              border-b
              border-[#DCD3C0]
              px-[24px]
              font-['Hind_Siliguri']
              text-[16px]
              font-normal
              leading-[27px]
              tracking-[-0.3125px]
              text-[#536174]
            "
                >
                  সাধারণত meaning-কেন্দ্রিক
                </div>
              </div>

              {/* =====================================================
            ROW 03
        ===================================================== */}

              <div
                className="
            grid
            h-[68.59px]
            grid-cols-[345px_482.36px_322.66px]
          "
              >
                {/* শেখার প্রয়োজন */}
                <div
                  className="
              flex
              items-center
              border-b
              border-[#DCD3C0]
              px-[24px]
              font-['Inter']
              text-[16px]
              font-bold
              leading-[27px]
              tracking-[-0.3125px]
              text-[#071229]
            "
                >
                  Practice support
                </div>

                {/* Oxford */}
                <div
                  className="
              flex
              items-center
              gap-[8.8px]
              border-b
              border-[#DCD3C0]
              bg-[#FFF8DC]
              px-[24px]
            "
                >
                  <span
                    className="
                flex
                h-[20.8px]
                w-[20.8px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#071229]
                font-['Inter']
                text-[11.52px]
                font-semibold
                leading-[19px]
                text-white
              "
                  >
                    ✓
                  </span>

                  <span
                    className="
                font-['Inter']
                text-[16px]
                font-semibold
                leading-[27px]
                tracking-[-0.3125px]
                text-[#071229]
              "
                  >
                    App + Audio + Video + Check Box
                  </span>
                </div>

                {/* সাধারণ বই */}
                <div
                  className="
              flex
              items-center
              border-b
              border-[#DCD3C0]
              px-[24px]
              font-['Hind_Siliguri']
              text-[16px]
              font-normal
              leading-[27px]
              tracking-[-0.3125px]
              text-[#536174]
            "
                >
                  বইয়ের ভেতরেই সীমিত
                </div>
              </div>

              {/* =====================================================
            ROW 04
        ===================================================== */}

              <div
                className="
            grid
            h-[68.09px]
            grid-cols-[345px_482.36px_322.66px]
          "
              >
                {/* শেখার প্রয়োজন */}
                <div
                  className="
              flex
              items-center
              px-[24px]
              font-['Hind_Siliguri']
              text-[16px]
              font-bold
              leading-[27px]
              tracking-[-0.3125px]
              text-[#071229]
            "
                >
                  এগিয়ে যাওয়ার cue
                </div>

                {/* Oxford */}
                <div
                  className="
              flex
              items-center
              gap-[8.8px]
              bg-[#FFF8DC]
              px-[24px]
            "
                >
                  <span
                    className="
                flex
                h-[20.8px]
                w-[20.8px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#071229]
                font-['Inter']
                text-[11.52px]
                font-semibold
                leading-[19px]
                text-white
              "
                  >
                    ✓
                  </span>

                  <span
                    className="
                font-['Inter']
                text-[16px]
                font-semibold
                leading-[27px]
                tracking-[-0.3125px]
                text-[#071229]
              "
                  >
                    Practice ও Progress support
                  </span>
                </div>

                {/* সাধারণ বই */}
                <div
                  className="
              flex
              items-center
              px-[24px]
              font-['Hind_Siliguri']
              text-[16px]
              font-normal
              leading-[27px]
              tracking-[-0.3125px]
              text-[#536174]
            "
                >
                  নিজে tracking করতে হয়
                </div>
              </div>
            </div>
          </div>

          <div className="decision-mobile-cards">
            {[
              [
                "শব্দ শেখার ক্রম",
                "Oxford 3000 sequence",
                "বিচ্ছিন্ন word list",
              ],
              [
                "বোঝা ও উচ্চারণ",
                "বাংলা অর্থ + উচ্চারণ + Example",
                "সাধারণত meaning-কেন্দ্রিক",
              ],
              [
                "Practice support",
                "App + Audio + Video + Check Box",
                "বইয়ের ভেতরেই সীমিত",
              ],
              [
                "এগিয়ে যাওয়ার cue",
                "Practice ও Progress support",
                "নিজে tracking করতে হয়",
              ],
            ].map(([need, system, usual]) => (
              <article key={need} className="decision-mobile-card">
                <h3>{need}</h3>
                <div className="decision-mobile-card-row decision-mobile-card-system">
                  <span className="decision-mobile-check">✓</span>
                  <p>{system}</p>
                </div>
                <div className="decision-mobile-card-row">
                  <span className="decision-mobile-label">সাধারণ বই</span>
                  <p>{usual}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section - 10 */}

      {/* =========================================================
    ANDROID COMPANION
========================================================= */}
      {false && (
        <section
          id="android-app"
          className="
    relative
    overflow-hidden
    bg-[#FDEEC2]
    px-4
    py-[70px]
    text-[#0A1730]
    sm:px-6
    sm:py-[76px]
    lg:px-8
    lg:py-[86.4px]
  "
        >
          <div
            className="
      mx-auto
      flex
      w-full
      max-w-[1152px]
      flex-col
      lg:h-[465.81px]
      lg:flex-row
      lg:items-start
      lg:justify-between
    "
          >
            {/* =======================================================
        LEFT CONTENT
    ======================================================= */}
            <div
              className="android-copy
        flex
        w-full
        max-w-[447.55px]
        flex-col
        items-start
        lg:mt-[1px]
      "
            >
              {/* ANDROID COMPANION */}
              <div
                className="
          flex
          h-[36.19px]
          w-full
          items-start
        "
              >
                <div
                  className="
            flex
            h-[17px]
            items-center
            gap-[8px]
            font-['Inter']
            text-[12px]
            font-bold
            uppercase
            leading-[16px]
            tracking-[1.56px]
            text-[#73500C]
          "
                >
                  <span
                    className="
              h-[2px]
              w-[16px]
              shrink-0
              rounded-full
              bg-[#73500C]
            "
                  />

                  <span>ANDROID COMPANION</span>
                </div>
              </div>

              {/* MAIN HEADING */}
              <h2
                className="
          m-0
          w-full
          max-w-[448px]
          font-['Hind_Siliguri']
          text-[40px]
          font-bold
          leading-[53px]
          tracking-[-0.7929px]
          text-[#0A1730]
        "
              >
                ফ্রি Android App ডাউনলোড করুন
              </h2>

              {/* DESCRIPTION */}
              <p
                className="
          m-0
          mt-[14.39px]
          w-full
          max-w-[447.55px]
          font-['Inter']
          text-[16px]
          font-normal
          leading-[27px]
          tracking-[-0.3125px]
          text-[#0A1730]
        "
              >
                Offline—যেকোনো সময় Practice করুন।
              </p>

              {/* FREE ACCESS NOTE */}
              <div
                className="
          mt-[17.59px]
          mb-[21.59px]
          box-border
          flex
          min-h-[24px]
          w-full
          max-w-[447.55px]
          items-center
          border-l-2
          border-[#1F9FB5]
          pl-[13.6px]
        "
              >
                <p
                  className="
            m-0
            font-['Hind_Siliguri']
            text-[14.08px]
            font-semibold
            leading-[24px]
            tracking-[-0.15675px]
            text-[#0A1730]
          "
                >
                  বইয়ের সঙ্গে ডেডিকেটেড Android App-এর অ্যাক্সেস সম্পূর্ণ ফ্রি।
                </p>
              </div>

              {/* =======================================================
          DOWNLOAD BUTTON
          APP LINK
      ======================================================= */}
              <div
                className="
          flex
          h-[46.94px]
          w-full
          items-start
        "
              >
                <a
                  href="https://app.englishcommando.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
            box-border
            flex
            h-[46.94px]
            min-h-[46.4px]
            w-[167.5px]
            items-center
            justify-center
            gap-[8.8px]
            whitespace-nowrap
            rounded-[12px]
            bg-gradient-to-br
            from-[#FFE38E]
            via-[#F8C94B]
            to-[#F2B81E]
            px-[18.4px]
            py-[12.48px]
            font-['Hind_Siliguri']
            text-[15.2px]
            font-bold
            leading-[19px]
            tracking-[-0.325375px]
            text-[#071229]
            shadow-[0px_11px_26px_rgba(248,201,75,0.22),inset_0px_1px_0px_rgba(255,255,255,0.5)]
            transition-all
            duration-200
            hover:-translate-y-[2px]
            hover:shadow-[0px_14px_30px_rgba(248,201,75,0.28),inset_0px_1px_0px_rgba(255,255,255,0.5)]
          "
                >
                  <span className="whitespace-nowrap">ডাউনলোড করুন</span>

                  {/* Download Icon */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mobile-cta-arrow shrink-0"
                  >
                    <path
                      d="M12 4V15"
                      stroke="#071229"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />

                    <path
                      d="M7.5 11.5L12 16L16.5 11.5"
                      stroke="#071229"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M5 20H19"
                      stroke="#071229"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* =======================================================
        RIGHT CONTENT
    ======================================================= */}
            <div
              className="
        relative
        mt-[45px]
        flex
        w-full
        max-w-[544px]
        flex-col
        items-center
        lg:mt-0
      "
            >
              {/* =====================================================
          ANDROID APP IMAGE
      ===================================================== */}
              <div
                className="
          flex
          h-[360px]
          w-full
          items-center
          justify-center
          sm:h-[400px]
        "
              >
                <img
                  src={androidApp}
                  alt="Dedicated Android App — Word Practice, Audio, Video and Progress"
                  className="
            block
                h-[360px]
                w-[370px]
            max-w-full
            select-none
            object-contain
            drop-shadow-[0px_18px_48px_rgba(0,0,0,0.25)]
                sm:h-[400px]
                sm:w-[430px]
          "
                />
              </div>

              {/* =====================================================
          SUPPORT PILLS
      ===================================================== */}
              <div
                className="
          mt-[24px]
          flex
          w-full
          max-w-[544px]
          flex-wrap
          items-center
          justify-center
          gap-[8.8px]
          lg:flex-nowrap
          lg:justify-center
        "
              >
                {/* Word Practice */}
                <span
                  className="
            box-border
            flex
            h-[46.4px]
            min-h-[46.4px]
            w-[129.39px]
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-[rgba(31,159,181,0.25)]
            bg-[#FFFDF7]
            px-[11.4px]
            py-[15.7px]
            font-['Inter']
            text-[12.16px]
            font-bold
            leading-[15px]
            tracking-[-0.0114px]
            text-[#071229]
            shadow-[0px_7px_17px_rgba(4,9,20,0.06)]
          "
                >
                  Word Practice
                </span>

                {/* Audio */}
                <span
                  className="
            box-border
            flex
            h-[46.4px]
            min-h-[46.4px]
            w-[129.41px]
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-[rgba(31,159,181,0.25)]
            bg-[#FFFDF7]
            px-[11.4px]
            py-[15.7px]
            font-['Inter']
            text-[12.16px]
            font-bold
            leading-[15px]
            tracking-[-0.0114px]
            text-[#071229]
            shadow-[0px_7px_17px_rgba(4,9,20,0.06)]
          "
                >
                  Audio
                </span>

                {/* Video */}
                <span
                  className="
            box-border
            flex
            h-[46.4px]
            min-h-[46.4px]
            w-[129.41px]
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-[rgba(31,159,181,0.25)]
            bg-[#FFFDF7]
            px-[11.4px]
            py-[15.7px]
            font-['Inter']
            text-[12.16px]
            font-bold
            leading-[15px]
            tracking-[-0.0114px]
            text-[#071229]
            shadow-[0px_7px_17px_rgba(4,9,20,0.06)]
          "
                >
                  Video
                </span>

                {/* Progress */}
                <span
                  className="
            box-border
            flex
            h-[46.4px]
            min-h-[46.4px]
            w-[129.41px]
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-[rgba(31,159,181,0.25)]
            bg-[#FFFDF7]
            px-[11.4px]
            py-[15.7px]
            font-['Inter']
            text-[12.16px]
            font-bold
            leading-[15px]
            tracking-[-0.0114px]
            text-[#071229]
            shadow-[0px_7px_17px_rgba(4,9,20,0.06)]
          "
                >
                  Progress
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section - 11 */}

      {/* =========================================================
    প্রশ্ন ও উত্তর / FAQ
========================================================= */}

      <section
        id="faq"
        className="
    relative
    overflow-hidden
    bg-[#FFFDF7]
    px-4
    py-[86.4px]
    text-[#071229]
  "
      >
        <div
          className="
      mx-auto
      w-full
      max-w-[1152px]
    "
        >
          <div
            className="
        flex
        w-full
        flex-col
        lg:flex-row
        lg:items-start
        lg:gap-[72px]
      "
          >
            {/* =====================================================
          LEFT SIDE
      ===================================================== */}

            <div
              className="faq-sidebar
          flex
          w-full
          flex-col
          items-start
          lg:w-[324px]
          lg:min-w-[324px]
        "
            >
              {/* প্রশ্ন ও উত্তর */}

              <div
                className="
            flex
            h-[36.19px]
            w-full
            items-start
          "
              >
                <div
                  className="
              mt-[9px]
              flex
              h-[17px]
              items-center
              gap-[8px]
              font-['Inter']
              text-[12px]
              font-bold
              uppercase
              leading-[16px]
              tracking-[1.56px]
              text-[#73500C]
            "
                >
                  <span
                    className="
                h-[2px]
                w-[16px]
                shrink-0
                rounded-full
                bg-[#73500C]
              "
                  />

                  <span>QUESTIONS, ANSWERED</span>
                </div>
              </div>

              {/* TITLE */}

              <h2
                className="
    m-0
    w-full
    whitespace-nowrap
    font-['Baloo_Da_2']
    text-[40px]
    font-semibold
    leading-[67px]
    tracking-[0.367031px]
    text-[#071229]
  "
              >
                সাধারণ প্রশ্ন ও উত্তর
              </h2>

              <img
                src={explainerUnderline}
                alt=""
                aria-hidden="true"
                className="faq-title-underline"
              />

              {/* DESCRIPTION + PHONE */}

              <div
                className="
            flex
            w-full
            flex-col
            items-start
            pt-[16px]
          "
              >
                <p
                  className="
              m-0
              w-full
              font-['Hind_Siliguri']
              text-[16px]
              font-normal
              leading-[27px]
              tracking-[-0.3125px]
              text-[#536174]
            "
                >
                  আরও কিছু জানতে চান? সরাসরি কল করুন
                </p>

                <a
                  href="tel:+8801410144536"
                  className="
              mt-[10px]
              inline-flex
              min-h-[44px]
              items-center
              font-['Inter']
              text-[16px]
              font-bold
              leading-[27px]
              tracking-[-0.3125px]
              text-[#72500E]
              underline
              decoration-[1px]
              underline-offset-[3px]
              transition-colors
              hover:text-[#F2B81E]
            "
                >
                  +8801410144536
                </a>
              </div>
            </div>

            {/* =====================================================
          RIGHT SIDE / FAQ
      ===================================================== */}

            <div
              className="
          mt-[48px]
          w-full
          lg:mt-0
          lg:w-[756px]
          lg:border-t
          lg:border-[#DCD3C0]
        "
            >
              {/* ===================================================
            FAQ 01
        =================================================== */}

              <div
                className="
            w-full
            border-b
            border-[#DCD3C0]
          "
              >
                {/* QUESTION */}

                <button
                  type="button"
                  onClick={() => setExpandedIndex(expandedIndex === 0 ? -1 : 0)}
                  className="
              flex
              h-[68px]
              min-h-[68px]
              w-full
              items-center
              justify-between
              gap-[24px]
              bg-transparent
              p-0
              text-left
            "
                >
                  <span
                    className="
                flex-1
                font-['Hind_Siliguri']
                text-[16px]
                font-bold
                leading-[27px]
                tracking-[-0.3125px]
                text-[#071229]
              "
                  >
                    এই প্যাকেজে ঠিক কী কী থাকছে?
                  </span>

                  <span
                    className="
                relative
                flex
                h-[20.8px]
                w-[20.8px]
                shrink-0
                items-center
                justify-center
              "
                  >
                    <span
                      className="
                  absolute
                  left-[20%]
                  right-[20%]
                  top-1/2
                  h-[1.04px]
                  -translate-y-1/2
                  bg-[#72500E]
                "
                    />

                    {expandedIndex !== 0 && (
                      <span
                        className="
                    absolute
                    bottom-[20%]
                    left-1/2
                    top-[20%]
                    w-[1.04px]
                    -translate-x-1/2
                    bg-[#72500E]
                  "
                      />
                    )}
                  </span>
                </button>

                {/* ANSWER */}

                {expandedIndex === 0 && (
                  <div
                    className="
                w-full
                pb-[21.5938px]
                pr-[44.8px]
              "
                  >
                    <p
                      className="
                  m-0
                  font-['Inter']
                  text-[16px]
                  font-normal
                  leading-[27px]
                  tracking-[-0.3125px]
                  text-[#536174]
                "
                    >
                      অক্সফোর্ড ৩০০০ ভোকাবুলারি বইয়ের সঙ্গে অ্যান্ড্রয়েড
                      অ্যাপ, অডিও, ভিডিও লেসন, প্র্যাকটিস ও প্রোগ্রেস সাপোর্ট
                      থাকছে।
                    </p>
                  </div>
                )}
              </div>

              {/* ===================================================
            FAQ 02
        =================================================== */}

              <div
                className="
            w-full
            border-b
            border-[#DCD3C0]
          "
              >
                <button
                  type="button"
                  onClick={() => setExpandedIndex(expandedIndex === 1 ? -1 : 1)}
                  className="
              flex
              h-[68px]
              min-h-[68px]
              w-full
              items-center
              justify-between
              gap-[24px]
              bg-transparent
              p-0
              text-left
            "
                >
                  <span
                    className="
                flex-1
                font-['Hind_Siliguri']
                text-[16px]
                font-bold
                leading-[27px]
                tracking-[-0.3125px]
                text-[#071229]
              "
                  >
                    মোট মূল্য কত? ডেলিভারি কি ফ্রি?
                  </span>

                  <span
                    className="
                relative
                flex
                h-[20.8px]
                w-[20.8px]
                shrink-0
                items-center
                justify-center
              "
                  >
                    <span
                      className="
                  absolute
                  left-[20%]
                  right-[20%]
                  top-1/2
                  h-[1.04px]
                  -translate-y-1/2
                  bg-[#72500E]
                "
                    />

                    {expandedIndex !== 1 && (
                      <span
                        className="
                    absolute
                    bottom-[20%]
                    left-1/2
                    top-[20%]
                    w-[1.04px]
                    -translate-x-1/2
                    bg-[#72500E]
                  "
                      />
                    )}
                  </span>
                </button>

                {expandedIndex === 1 && (
                  <div
                    className="
                w-full
                pb-[21.5938px]
                pr-[44.8px]
              "
                  >
                    <p
                      className="
                  m-0
                  font-['Hind_Siliguri']
                  text-[16px]
                  font-normal
                  leading-[27px]
                  tracking-[-0.3125px]
                  text-[#536174]
                "
                    >
                      মোট মূল্য ৳৪৯৯। সারা দেশে ডেলিভারি ফ্রি।
                    </p>
                  </div>
                )}
              </div>

              {/* ===================================================
            FAQ 03
        =================================================== */}

              <div
                className="
            w-full
            border-b
            border-[#DCD3C0]
          "
              >
                <button
                  type="button"
                  onClick={() => setExpandedIndex(expandedIndex === 2 ? -1 : 2)}
                  className="
              flex
              h-[68px]
              min-h-[68px]
              w-full
              items-center
              justify-between
              gap-[24px]
              bg-transparent
              p-0
              text-left
            "
                >
                  <span
                    className="
                flex-1
                font-['Inter']
                text-[16px]
                font-bold
                leading-[27px]
                tracking-[-0.3125px]
                text-[#071229]
              "
                  >
                    অ্যাপ কি অ্যান্ড্রয়েডের জন্য?
                  </span>

                  <span
                    className="
                relative
                flex
                h-[20.8px]
                w-[20.8px]
                shrink-0
                items-center
                justify-center
              "
                  >
                    <span
                      className="
                  absolute
                  left-[20%]
                  right-[20%]
                  top-1/2
                  h-[1.04px]
                  -translate-y-1/2
                  bg-[#72500E]
                "
                    />

                    {expandedIndex !== 2 && (
                      <span
                        className="
                    absolute
                    bottom-[20%]
                    left-1/2
                    top-[20%]
                    w-[1.04px]
                    -translate-x-1/2
                    bg-[#72500E]
                  "
                      />
                    )}
                  </span>
                </button>

                {expandedIndex === 2 && (
                  <div
                    className="
                w-full
                pb-[21.5938px]
                pr-[44.8px]
              "
                  >
                    <p
                      className="
                  m-0
                  font-['Hind_Siliguri']
                  text-[16px]
                  font-normal
                  leading-[27px]
                  tracking-[-0.3125px]
                  text-[#536174]
                "
                    >
                      হ্যাঁ, বর্তমানে অ্যাপটি শুধু অ্যান্ড্রয়েড ফোনের জন্য
                      উপলভ্য। তবে খুব শিগগিরই আইওএস-এর জন্যও চালু করা হবে।
                    </p>
                  </div>
                )}
              </div>

              {/* ===================================================
            FAQ 04
        =================================================== */}

              <div
                className="
            w-full
            border-b
            border-[#DCD3C0]
          "
              >
                <button
                  type="button"
                  onClick={() => setExpandedIndex(expandedIndex === 3 ? -1 : 3)}
                  className="
              flex
              h-[68px]
              min-h-[68px]
              w-full
              items-center
              justify-between
              gap-[24px]
              bg-transparent
              p-0
              text-left
            "
                >
                  <span
                    className="
                flex-1
                font-['Hind_Siliguri']
                text-[16px]
                font-bold
                leading-[27px]
                tracking-[-0.3125px]
                text-[#071229]
              "
                  >
                    শুধু পরীক্ষার জন্যই কি এই বই?
                  </span>

                  <span
                    className="
                relative
                flex
                h-[20.8px]
                w-[20.8px]
                shrink-0
                items-center
                justify-center
              "
                  >
                    <span
                      className="
                  absolute
                  left-[20%]
                  right-[20%]
                  top-1/2
                  h-[1.04px]
                  -translate-y-1/2
                  bg-[#72500E]
                "
                    />

                    {expandedIndex !== 3 && (
                      <span
                        className="
                    absolute
                    bottom-[20%]
                    left-1/2
                    top-[20%]
                    w-[1.04px]
                    -translate-x-1/2
                    bg-[#72500E]
                  "
                      />
                    )}
                  </span>
                </button>

                {expandedIndex === 3 && (
                  <div
                    className="
                w-full
                pb-[21.5938px]
                pr-[44.8px]
              "
                  >
                    <p
                      className="
                  m-0
                  font-['Hind_Siliguri']
                  text-[16px]
                  font-normal
                  leading-[27px]
                  tracking-[-0.3125px]
                  text-[#536174]
                "
                    >
                      না। পরীক্ষার প্রস্তুতির পাশাপাশি কথ্য ইংরেজি, আইইএলটিএস
                      এবং দৈনন্দিন ব্যবহারের জন্য শব্দের অর্থ, উচ্চারণ ও উদাহরণ
                      বুঝতে এটি সাজানো হয়েছে।
                    </p>
                  </div>
                )}
              </div>

              {/* ===================================================
            FAQ 05
        =================================================== */}

              <div
                className="
            w-full
            border-b
            border-[#DCD3C0]
          "
              >
                <button
                  type="button"
                  onClick={() => setExpandedIndex(expandedIndex === 4 ? -1 : 4)}
                  className="
              flex
              h-[68px]
              min-h-[68px]
              w-full
              items-center
              justify-between
              gap-[24px]
              bg-transparent
              p-0
              text-left
            "
                >
                  <span
                    className="
                flex-1
                font-['Hind_Siliguri']
                text-[16px]
                font-bold
                leading-[27px]
                tracking-[-0.3125px]
                text-[#071229]
              "
                  >
                    আমি একদম বিগিনার হলে শুরু করতে পারব?
                  </span>

                  <span
                    className="
                relative
                flex
                h-[20.8px]
                w-[20.8px]
                shrink-0
                items-center
                justify-center
              "
                  >
                    <span
                      className="
                  absolute
                  left-[20%]
                  right-[20%]
                  top-1/2
                  h-[1.04px]
                  -translate-y-1/2
                  bg-[#72500E]
                "
                    />

                    {expandedIndex !== 4 && (
                      <span
                        className="
                    absolute
                    bottom-[20%]
                    left-1/2
                    top-[20%]
                    w-[1.04px]
                    -translate-x-1/2
                    bg-[#72500E]
                  "
                      />
                    )}
                  </span>
                </button>

                {expandedIndex === 4 && (
                  <div
                    className="
                w-full
                pb-[21.5938px]
                pr-[44.8px]
              "
                  >
                    <p
                      className="
                  m-0
                  font-['Inter']
                  text-[16px]
                  font-normal
                  leading-[27px]
                  tracking-[-0.3125px]
                  text-[#536174]
                "
                    >
                      অক্সফোর্ড ক্রম, বাংলা অর্থ ও উচ্চারণ এবং ধাপে ধাপে শেখার
                      পদ্ধতি থাকায় বিগিনারও শুরু করতে পারবেন।
                    </p>
                  </div>
                )}
              </div>

              {/* ===================================================
            FAQ 06
        =================================================== */}

              <div
                className="
            w-full
            border-b
            border-[#DCD3C0]
          "
              >
                <button
                  type="button"
                  onClick={() => setExpandedIndex(expandedIndex === 5 ? -1 : 5)}
                  className="
              flex
              h-[68px]
              min-h-[68px]
              w-full
              items-center
              justify-between
              gap-[24px]
              bg-transparent
              p-0
              text-left
            "
                >
                  <span
                    className="
                flex-1
                font-['Hind_Siliguri']
                text-[16px]
                font-bold
                leading-[27px]
                tracking-[-0.3125px]
                text-[#071229]
              "
                  >
                    অর্ডার করতে কী করতে হবে?
                  </span>

                  <span
                    className="
                relative
                flex
                h-[20.8px]
                w-[20.8px]
                shrink-0
                items-center
                justify-center
              "
                  >
                    <span
                      className="
                  absolute
                  left-[20%]
                  right-[20%]
                  top-1/2
                  h-[1.04px]
                  -translate-y-1/2
                  bg-[#72500E]
                "
                    />

                    {expandedIndex !== 5 && (
                      <span
                        className="
                    absolute
                    bottom-[20%]
                    left-1/2
                    top-[20%]
                    w-[1.04px]
                    -translate-x-1/2
                    bg-[#72500E]
                  "
                      />
                    )}
                  </span>
                </button>

                {expandedIndex === 5 && (
                  <div
                    className="
                w-full
                pb-[21.5938px]
                pr-[44.8px]
              "
                  >
                    <p
                      className="
                  m-0
                  font-['Hind_Siliguri']
                  text-[16px]
                  font-normal
                  leading-[27px]
                  tracking-[-0.3125px]
                  text-[#536174]
                "
                    >
                      শুধু আপনার নাম, মোবাইল নম্বর ও ঠিকানা দিন। বই পাঠানোর আগে
                      আমাদের টিম ফোন করে অর্ডারটি নিশ্চিত করবে।
                    </p>
                  </div>
                )}
              </div>

              {/* ===================================================
            FAQ 07
        =================================================== */}

              <div
                className="
            w-full
            border-b
            border-[#DCD3C0]
          "
              >
                <button
                  type="button"
                  onClick={() => setExpandedIndex(expandedIndex === 6 ? -1 : 6)}
                  className="
              flex
              h-[68px]
              min-h-[68px]
              w-full
              items-center
              justify-between
              gap-[24px]
              bg-transparent
              p-0
              text-left
            "
                >
                  <span
                    className="
                flex-1
                font-['Hind_Siliguri']
                text-[16px]
                font-bold
                leading-[27px]
                tracking-[-0.3125px]
                text-[#071229]
              "
                  >
                    অর্ডারের আগে কথা বলতে চাইলে?
                  </span>

                  <span
                    className="
                relative
                flex
                h-[20.8px]
                w-[20.8px]
                shrink-0
                items-center
                justify-center
              "
                  >
                    <span
                      className="
                  absolute
                  left-[20%]
                  right-[20%]
                  top-1/2
                  h-[1.04px]
                  -translate-y-1/2
                  bg-[#72500E]
                "
                    />

                    {expandedIndex !== 6 && (
                      <span
                        className="
                    absolute
                    bottom-[20%]
                    left-1/2
                    top-[20%]
                    w-[1.04px]
                    -translate-x-1/2
                    bg-[#72500E]
                  "
                      />
                    )}
                  </span>
                </button>

                {expandedIndex === 6 && (
                  <div
                    className="
                w-full
                pb-[21.5938px]
                pr-[44.8px]
              "
                  >
                    <p
                      className="
                  m-0
                  font-['Inter']
                  text-[16px]
                  font-normal
                  leading-[27px]
                  tracking-[-0.3125px]
                  text-[#536174]
                "
                    >
                      +8801410144536 নম্বরে কল করে সহায়তা দলের সঙ্গে কথা বলতে
                      পারেন।
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="guarantee-section relative overflow-hidden bg-[#fff0c9] px-6 py-14 sm:px-8 lg:px-0 lg:py-[56px]">
        <div className="guarantee-card mx-auto grid w-full max-w-[1296px] grid-cols-1 items-center gap-6 rounded-[24px] border border-[rgba(248,201,75,0.34)] bg-[#071229] p-7 shadow-[0_28px_70px_0_rgba(4,9,20,0.18)] sm:grid-cols-[76px_minmax(0,1fr)] lg:h-[180px] lg:grid-cols-[76px_minmax(0,1fr)_226px] lg:gap-8 lg:p-[32px]">
          <div className="guarantee-icon grid h-[76px] w-[76px] place-self-center place-items-center rounded-full border border-[#f8c94b]">
            <svg
              viewBox="0 0 32 32"
              className="h-8 w-8 text-[#f8c94b]"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m9 16 4.5 4.5L23 11"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
          </div>
          <div className="guarantee-copy min-w-0">
            <div className="flex items-center gap-2 font-['Baloo_Da_2'] text-[12px] font-bold leading-[16.2px] tracking-[1.56px] text-[#f8c94b]">
              <span className="text-[18px] leading-none" aria-hidden="true">
                —
              </span>
              YOUR CONFIDENCE, PROTECTED
            </div>
            <h2 className="mt-1 font-['Baloo_Da_2'] text-[clamp(1.7rem,3vw,2.5rem)] font-bold leading-[1.25] text-white">
              ১০০% মানি-ব্যাক গ্যারান্টি
            </h2>
            <p className="mt-1 font-['Baloo_Da_2'] text-[16px] leading-[27px] text-white/65">
              হাতে পেয়ে দেখুন—পছন্দ না হলে ১০০% টাকা ফেরত। সহায়তা:{" "}
              <a
                href="tel:+8801410144536"
                className="guarantee-number inline-block align-middle font-bold text-[#f7d77d] underline decoration-[#f7d77d]/70 underline-offset-4 transition hover:text-[#ffe29a]"
              >
                +8801410144536
              </a>
            </p>
          </div>
          <a
            href="tel:01405458800"
            className="guarantee-call flex min-h-[94px] items-center justify-center rounded-[14px] bg-[#E8B84E] px-5 py-3 text-center font-['Baloo_Da_2'] text-sm font-bold leading-5 text-[#071229] transition hover:bg-[#ffd86d] lg:min-h-0"
          >
            <span>
              <span className="block text-xs font-normal">
                কোনো প্রশ্ন আছে?
              </span>
              <span className="block text-[1rem] font-bold">
                0140-545-8800-2
              </span>
              <span className="block text-xs font-normal">কল করে কথা বলুন</span>
            </span>
          </a>
        </div>
      </section>

      {/* Section - 11 */}

      {/* =========================================================
    FINAL OFFER / ORDER SECTION
========================================================= */}
      <section
        id="order"
        className="
    relative
    overflow-hidden
    bg-[#0B2238]
    px-4
    py-12
    sm:px-6
    sm:py-16
    lg:min-h-[1046px]
    lg:px-0
    lg:py-0
  "
      >
        {/* =====================================================
      WARM AMBIENT GLOW
  ===================================================== */}
        <div
          className="
      pointer-events-none
      absolute
      -right-[70px]
      -top-[230px]
      h-[480px]
      w-[480px]
      rounded-full
      bg-[rgba(248,201,75,0.10)]
      blur-[12px]
    "
        />

        {/* =====================================================
      CYAN AMBIENT GLOW
  ===================================================== */}
        <div
          className="
      pointer-events-none
      absolute
      -left-[160px]
      top-[625px]
      h-[560px]
      w-[560px]
      rounded-full
      bg-[rgba(116,221,234,0.11)]
      blur-[12px]
    "
        />

        {/* =====================================================
      MAIN 1152px CONTAINER
  ===================================================== */}
        <div
          className="order-shell
      relative
      mx-auto
      w-full
      max-w-[1152px]
      rounded-[32px]
      shadow-[0px_28px_70px_rgba(4,9,20,0.18)]
      lg:mt-[109px]
      lg:min-h-[828px]
    "
          style={{
            background: `
        radial-gradient(
          105.33% 153.99% at 10% 20%,
          rgba(248,201,75,0.11) 0%,
          rgba(248,201,75,0) 35%
        ),
        linear-gradient(
          135deg,
          #071229 0%,
          #040914 100%
        )
      `,
          }}
        >
          {/* =====================================================
        LEFT SIDE CONTENT
    ===================================================== */}
          <div
            className="order-copy
        relative
        z-10
        px-6
        py-12
        sm:px-10
        lg:absolute
        lg:left-[64px]
        lg:top-[155.64px]
        lg:w-[437.91px]
        lg:px-0
        lg:py-0
      "
          >
            {/* =================================================
          EYEBROW
      ================================================= */}
            <div
              className="
          font-['Inter']
          text-[15px]
          font-medium
          leading-[19px]
          text-[#F8C94B]
        "
            >
              START YOUR MASTERY LOOP
            </div>

            {/* =================================================
          MAIN HEADING
      ================================================= */}
            <h2
              className="
          mt-[19px]
          whitespace-nowrap
          font-['Hind_Siliguri']
          text-[30px]
          font-bold
          leading-[1.55]
          tracking-[-0.02em]
          text-white
          sm:text-[36px]
          lg:text-[36px]
          lg:leading-[62px]
        "
            >
              আগে বই বুঝে নিন তার পরে টাকা দিন
            </h2>

            <img
              src={explainerUnderline}
              alt=""
              aria-hidden="true"
              className="checkout-title-underline"
            />

            {/* =================================================
          DELIVERY PROMISE
      ================================================= */}
            <p
              className="
          mt-[18px]
          font-['Hind_Siliguri']
          text-[17px]
          font-normal
          leading-[30px]
          text-[#F8C94B]
          sm:text-[18px]
          lg:text-[20px]
        "
            >
              <span className="order-promise-full block whitespace-nowrap">
                সারা দেশে ক্যাশ অন ডেলিভারি — ফ্রি ডেলিভারি
              </span>
              <span className="order-promise-short hidden whitespace-nowrap font-normal">
                ক্যাশ অন ডেলিভারি · ফ্রি ডেলিভারি
              </span>
            </p>

            {/* =================================================
          BENEFIT CARDS
      ================================================= */}
            <div
              className="order-benefit-grid
          mt-[28px]
          grid
          w-full
          max-w-[438px]
          grid-cols-1
          gap-[10px]
          sm:grid-cols-2
        "
            >
              {/* =================================================
            BENEFIT CARD 1
        ================================================= */}
              <div
                className="
            relative
            box-border
            h-[106px]
            w-full
            rounded-[14px]
            border
            border-[rgba(255,255,255,0.12)]
            bg-[rgba(255,255,255,0.055)]
            px-[62px]
            py-[15px]
          "
              >
                {/* Icon */}
                <div
                  className="
              absolute
              left-[11px]
              top-[28px]
              flex
              h-[39px]
              w-[39px]
              items-center
              justify-center
              rounded-[11px]
              border
              border-[rgba(248,201,75,0.30)]
              bg-[rgba(248,201,75,0.13)]
            "
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="4"
                      y="3"
                      width="16"
                      height="18"
                      rx="2"
                      stroke="#F8C94B"
                      strokeWidth="1.75"
                    />

                    <path
                      d="M8 8H16"
                      stroke="#F8C94B"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />

                    <path
                      d="M8 12H14"
                      stroke="#F8C94B"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Text */}
                <p
                  className="
              m-0
              w-[150px]
              font-['Inter']
              text-[15px]
              font-normal
              leading-[23px]
              text-[#FFFDF8]
            "
                >
                  Oxford 3000 Vocab বই +
                  <br />
                  Dedicated Android App
                </p>
              </div>

              {/* =================================================
            BENEFIT CARD 2
        ================================================= */}
              <div
                className="
            relative
            box-border
            h-[106px]
            w-full
            rounded-[14px]
            border
            border-[rgba(255,255,255,0.12)]
            bg-[rgba(255,255,255,0.055)]
            px-[62px]
            py-[15px]
          "
              >
                {/* Icon */}
                <div
                  className="
              absolute
              left-[11px]
              top-[28px]
              flex
              h-[39px]
              w-[39px]
              items-center
              justify-center
              rounded-[11px]
              border
              border-[rgba(248,201,75,0.30)]
              bg-[rgba(248,201,75,0.13)]
            "
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="8"
                      stroke="#F8C94B"
                      strokeWidth="1.75"
                    />

                    <path
                      d="M8 14C8 10.8 9.8 8 12 8C14.2 8 16 10.8 16 14"
                      stroke="#F8C94B"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />

                    <path
                      d="M7 14H17"
                      stroke="#F8C94B"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Text */}
                <p
                  className="
              m-0
              w-[150px]
              font-['Inter']
              text-[15px]
              font-normal
              leading-[23px]
              text-[#FFFDF8]
            "
                >
                  Audio, Video, Practice ও
                  <br />
                  Progress Support
                </p>
              </div>
            </div>

            {/* =================================================
          PAY ON DELIVERY CARD
      ================================================= */}
            <div
              className="
          relative
          mt-[10px]
          flex
          min-h-[74.4px]
          items-center
          gap-[12px]
          rounded-[14px]
          border
          border-[rgba(248,201,75,0.12)]
          bg-[linear-gradient(135deg,rgba(248,201,75,0.05),rgba(255,255,255,0.02))]
          px-[14px]
          py-[18px]
          shadow-[0_10px_22px_rgba(0,0,0,0.08)]
          sm:px-[18px]
        "
              aria-label="Cash on delivery service"
            >
              <div className="order-cod-visual" aria-hidden="true">
                <svg viewBox="0 0 84 84" role="img" aria-hidden="true">
                  <path
                    d="M18 50C18 35.64 29.94 24 44 24C58.06 24 70 35.64 70 50C70 58.15 66.17 65.32 60.28 70.36"
                    stroke="rgba(255,230,160,0.92)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray="4 7"
                  />
                  <path
                    d="M24 56L38 48L49 58L60 40"
                    stroke="rgba(248,201,75,0.96)"
                    strokeWidth="2.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <circle
                    className="order-cod-dot"
                    cx="60"
                    cy="40"
                    r="4.6"
                    fill="#F8C94B"
                  />
                  <circle
                    cx="44"
                    cy="24"
                    r="6.2"
                    fill="rgba(248,201,75,0.12)"
                  />
                  <path
                    d="M44 16.5V20.5M44 27.5V31.5M37.5 24H41.5M46.5 24H50.5"
                    stroke="rgba(248,201,75,0.7)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <p
                className="
            m-0
            whitespace-normal
            font-['Hind_Siliguri']
            text-[14px]
            font-normal
            leading-[23px]
            text-[#FFFDF8]
            sm:text-[16px]
            max-[520px]:text-[13px]
          "
              >
                হাতে পেয়ে দেখে তারপর পেমেন্ট করুন
              </p>
            </div>
          </div>

          {/* =====================================================
        RIGHT ORDER FORM
    ===================================================== */}
          <form
            onSubmit={handleSubmit}
            className="
    tablet-order-form
    relative
    z-20
    pointer-events-auto
    mx-4
    mb-8
    rounded-[24px]
    border
    border-[rgba(248,201,75,0.5)]
    bg-[#FBF5E8]
    p-[20px]
    shadow-[0px_20px_55px_rgba(0,0,0,0.22)]
    sm:mx-auto
    sm:max-w-[514.09px]
    md:mx-auto
    md:max-w-[514.09px]
    lg:absolute
    lg:right-[64px]
    lg:top-[64px]
    lg:mx-0
    lg:mb-0
    lg:h-[714px]
    lg:w-[514.09px]
    lg:max-w-none
    lg:p-[34px]
        max-[520px]:p-[16px]
  "
          >
            <div className="flex flex-col gap-[16.17px] max-[520px]:gap-[10px]">
              {/* =================================================
            DELIVERY RIBBON
        ================================================= */}
              <div
                className="order-delivery-ribbon
            flex
            h-[36px]
            w-full
            flex-col
            items-center
            justify-center
            gap-0
            rounded-[12px]
            bg-[#0D1F35]
            px-[18px]
            py-[4px]
            sm:flex-row
            sm:gap-[8px]
            sm:py-[8px]
            max-[520px]:h-[32px]
            max-[520px]:px-[8px]
            max-[520px]:py-0
            max-[520px]:flex-row
            max-[520px]:gap-[4px]
          "
              >
                {/* Truck */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0"
                >
                  <path
                    d="M3 6H14V17H3V6Z"
                    stroke="#F8C94B"
                    strokeWidth="1.75"
                  />

                  <path
                    d="M14 10H18L21 13V17H14V10Z"
                    stroke="#F8C94B"
                    strokeWidth="1.75"
                    strokeLinejoin="round"
                  />

                  <circle
                    cx="7"
                    cy="18"
                    r="2"
                    stroke="#F8C94B"
                    strokeWidth="1.75"
                  />

                  <circle
                    cx="17"
                    cy="18"
                    r="2"
                    stroke="#F8C94B"
                    strokeWidth="1.75"
                  />
                </svg>

                {/* Delivery text */}
                <span
                  className="
              whitespace-nowrap
              order-ribbon-full
              font-['Hind_Siliguri']
              text-[11px]
              font-normal
              leading-[11px]
              text-[#DBEAF4]
              max-[520px]:whitespace-normal
              max-[520px]:text-center
            "
                >
                  সারা দেশে ক্যাশ অন ডেলিভারি — ফ্রি ডেলিভারি
                </span>
                <span className="order-ribbon-mobile whitespace-nowrap font-['Baloo_Da_2'] text-[13px] font-medium leading-[18px] text-white">
                  সারা দেশে ক্যাশ অন ডেলিভারি
                </span>
              </div>

              {/* =================================================
            ORDER SUMMARY
        ================================================= */}
              <div
                className="order-summary
            relative
            min-h-[140px]
            rounded-[13.6px]
            border
            border-[#DFD4BF]
            bg-[rgba(255,255,255,0.6)]
            px-[16.2px]
            py-[16.2px]
            w-full
            max-[520px]:w-[310px]
            max-[520px]:min-h-[126px]
            max-[520px]:px-[12px]
            max-[520px]:py-[12px]
          "
              >
                {/* Top row */}
                <div className="flex items-end justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div
                      className="
                  font-['Hind_Siliguri']
                  text-[11.84px]
                  font-normal
                  leading-[15px]
                  text-[#4D5A6B]
                "
                    >
                      আপনার অর্ডার
                    </div>

                    <div
                      className="
                  mt-[2px]
                  font-['Inter']
                  text-[15.04px]
                  font-bold
                  leading-[20px]
                  tracking-[-0.23735px]
                  text-[#071229]
                "
                    >
                      অক্সফোর্ড ৩০০০ ভোকাব + অ্যাপ
                    </div>
                  </div>

                  {/* TOTAL */}
                  <div className="flex-shrink-0 text-right">
                    <div
                      className="
                  font-['Hind_Siliguri']
                  text-[11.84px]
                  font-normal
                  leading-[15px]
                  text-[#4D5A6B]
                "
                    >
                      মোট
                    </div>

                    <div
                      className="
                  font-['Hind_Siliguri']
                  text-[24px]
                  font-bold
                  leading-[30px]
                  tracking-[-0.512px]
                  text-[#071229]
                "
                    >
                      ৳৪৯৯
                    </div>
                  </div>
                </div>

                {/* Price details */}
                <div
                  className="order-price-details
              mt-[14px]
              flex
              items-center
              justify-start
              gap-[8px]
              font-['Hind_Siliguri']
              text-[12.16px]
              leading-[17px]
              text-[#4D5A6B]
            "
                >
                  <span>বই ৳৪৯৯ · ডেলিভারি ফ্রি</span>
                </div>

                {/* COD chip */}
                <div
                  className="order-cod-chip
              mt-[14px]
              inline-flex
              h-[25.22px]
              items-center
              justify-center
              rounded-full
              bg-[rgba(248,201,75,0.15)]
              px-[8.96px]
              py-[5.12px]
              flex
              w-fit
            "
                >
                  <span
                    className="
                font-['Hind_Siliguri']
                text-[11.52px]
                font-bold
                leading-[12px]
                text-[#73500C]
              "
                  >
                    সারা দেশে ক্যাশ অন ডেলিভারি
                  </span>
                </div>
              </div>

              {/* =================================================
            DELIVERY INFORMATION
        ================================================= */}
              <div className="w-full">
                <h3
                  className="
              m-0
              w-full
              font-['Hind_Siliguri']
              text-[17.28px]
              font-bold
              leading-[22px]
              tracking-[-0.434025px]
              text-[#071229]
            "
                >
                  ডেলিভারির তথ্য দিন
                </h3>

                {/* NAME + PHONE */}
                <div
                  className="
              mt-[8px]
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
            "
                >
                  {/* NAME */}
                  <div>
                    <label
                      htmlFor="name"
                      className="
                  block
                  font-['Hind_Siliguri']
                  text-[13.12px]
                  font-bold
                  leading-[22px]
                  tracking-[-0.0845625px]
                  text-[#071229]
                "
                    >
                      আপনার নাম <span className="text-[#C0392B]">*</span>
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="আপনার পূর্ণ নাম"
                      className="
                  mt-[4.47px]
                  box-border
                  h-[47.78px]
                  w-full
                  rounded-[10.4px]
                  border
                  border-[#CFC5B3]
                  bg-white
                  px-3
                  text-[#000000]
                  caret-[#000000]
                  outline-none
                  focus:border-[#F8C94B]
                  focus:ring-2
                  focus:ring-[#F8C94B]/20
                  max-[520px]:mt-[2px]
                  max-[520px]:h-[42px]
                "
                    />
                  </div>

                  {/* PHONE */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="
                  block
                  font-['Hind_Siliguri']
                  text-[13.12px]
                  font-bold
                  leading-[22px]
                  tracking-[-0.0845625px]
                  text-[#071229]
                "
                    >
                      মোবাইল নম্বর <span className="text-[#C0392B]">*</span>
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      inputMode="tel"
                      pattern="(?:(?:01|০১)[0-9০-৯]{9}|\+8801[0-9০-৯]{9})"
                      placeholder="আপনার মোবাইল নম্বর"
                      className="
                  mt-[4.47px]
                  box-border
                      h-[52px]
                  w-full
                      rounded-[12px]
                  border
                      border-[#DCE8F1]
                  bg-white
                      px-[14px]
                      font-['Baloo_Da_2']
                      text-[14px]
                      leading-[22px]
                      text-[#5A6878]
                  caret-[#000000]
                      placeholder:text-[#5A6878]
                  outline-none
                  focus:border-[#F8C94B]
                  focus:ring-2
                  focus:ring-[#F8C94B]/20
                  max-[520px]:mt-[2px]
                "
                    />
                  </div>
                </div>

                {/* DISTRICT */}
                <div className="mt-[13px] max-[520px]:mt-[10px]">
                  <label
                    htmlFor="district"
                    className="
                block
                font-['Hind_Siliguri']
                text-[13.12px]
                font-bold
                leading-[22px]
                tracking-[-0.0845625px]
                text-[#071229]
              "
                  >
                    জেলা / এলাকা <span className="text-[#C0392B]">*</span>
                  </label>

                  <input
                    id="district"
                    name="district"
                    type="text"
                    required
                    placeholder="জেলা / এলাকা লিখুন"
                    className="
                mt-[4.47px]
                box-border
                h-[47.78px]
                w-full
                rounded-[10.4px]
                border
                border-[#CFC5B3]
                bg-white
                px-3
                text-[#000000]
                caret-[#000000]
                outline-none
                focus:border-[#F8C94B]
                focus:ring-2
                focus:ring-[#F8C94B]/20
                max-[520px]:mt-[2px]
                max-[520px]:h-[42px]
              "
                  />
                </div>

                {/* FULL ADDRESS */}
                <div className="mt-[13px] max-[520px]:mt-[10px]">
                  <label
                    htmlFor="address"
                    className="
                block
                font-['Hind_Siliguri']
                text-[13.12px]
                font-bold
                leading-[22px]
                tracking-[-0.0845625px]
                text-[#071229]
              "
                  >
                    সম্পূর্ণ ঠিকানা <span className="text-[#C0392B]">*</span>
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    required
                    placeholder="বাড়ি, রোড, থানা সহ সম্পূর্ণ ঠিকানা"
                    className="
                mt-[4.47px]
                box-border
                h-[83.2px]
                w-full
                resize-none
                rounded-[10.4px]
                border
                border-[#CFC5B3]
                bg-white
                px-3
                py-2
                text-[#000000]
                caret-[#000000]
                outline-none
                focus:border-[#F8C94B]
                focus:ring-2
                focus:ring-[#F8C94B]/20
                max-[520px]:mt-[2px]
                max-[520px]:h-[68px]
              "
                  />
                </div>
              </div>

              {/* =================================================
            CONFIRM ORDER BUTTON
        ================================================= */}
              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="order-button
            box-border
            flex
            h-[46.94px]
            w-full
            min-h-[46.4px]
            items-center
            justify-center
            gap-[8.8px]
            rounded-[12px]
            border-0
            bg-gradient-to-br
            from-[#FFE38E]
            via-[#F8C94B]
            to-[#F2B81E]
            px-[18.4px]
            py-[12.48px]
            font-['Hind_Siliguri']
            text-[15.2px]
            font-bold
            leading-[19px]
            tracking-[-0.325375px]
            text-[#071229]
            shadow-[0px_11px_26px_rgba(248,201,75,0.22),inset_0px_1px_0px_rgba(255,255,255,0.5)]
            transition
            hover:brightness-105
            active:scale-[0.99]
          "
              >
                <span>
                  {isSubmitting ? "লোড হচ্ছে…" : "অর্ডার কনফার্ম করুন"}
                </span>

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mobile-cta-arrow"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12H19"
                    stroke="#071229"
                    strokeWidth="0.833333"
                    strokeLinecap="round"
                  />

                  <path
                    d="M14 7L19 12L14 17"
                    stroke="#071229"
                    strokeWidth="0.833333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* =================================================
            PRIVACY / POLICY
        ================================================= */}
              <p
                className="
            m-0
            w-full
            text-center
            font-['Hind_Siliguri']
            text-[12.8px]
            font-normal
            leading-[20px]
            tracking-[-0.06px]
            text-[#4D5A6B]
          "
              >
                আপনার তথ্য শুধু ডেলিভারির জন্য ব্যবহার হবে।
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <Footer />
    </main>
  );
}

export default App;
