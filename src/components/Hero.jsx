import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import heroVideo from "../assets/hero video/Deepak_video_portfolio.mp4";

const socialLinks = [
  {
    label: "Gmail",
    href: "mailto:deepakwebcraft@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 5H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2Zm-.5 3.8-7.1 5.1c-.2.1-.5.2-.7.2s-.5-.1-.7-.2L3.5 8.8V7.6l8.5 5.9 7.5-5.3v.6Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/deepak-hiruthayaswamy/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45Z" />
      </svg>
    ),
  },
  {
    label: "Phone",
    href: "tel:+918489130301",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/14mXFHnCbhT/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.2 22v-8.5h2.86l.43-3.32H14.2V8.06c0-.96.27-1.62 1.65-1.62h1.76V3.47c-.3-.04-1.35-.13-2.57-.13-2.54 0-4.28 1.55-4.28 4.4v2.44H7.9v3.32h2.86V22h3.44Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/deepak_hiruthayaswamy?igsh=MW40dzAyY2N2cWd4",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0 2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z" />
      </svg>
    ),
  },
];

const Hero = () => {
  const videoRef = useRef(null);
  const playCountRef = useRef(0);
  const hasAutoStartedRef = useRef(false);
  const isDelayCompleteRef = useRef(false);
  const delayTimerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });

    const video = videoRef.current;
    if (!video) return undefined;

    video.muted = false;
    video.volume = 1;
    video.playsInline = true;
    video.loop = false;
    video.preload = "auto";
    video.pause();
    video.load();

    const resetStartFrame = () => {
      try {
        video.currentTime = 0;
      } catch {
        // Metadata not ready.
      }
    };

    const waitForVideoReady = () =>
      new Promise((resolve) => {
        if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
          resolve();
          return;
        }

        const handleReady = () => {
          video.removeEventListener("canplay", handleReady);
          video.removeEventListener("canplaythrough", handleReady);
          resolve();
        };

        video.addEventListener("canplay", handleReady);
        video.addEventListener("canplaythrough", handleReady);
      });

    const startVideoFromStart = async () => {
      if (!video) return;
      hasAutoStartedRef.current = true;
      playCountRef.current = 0;
      setIsPlaying(false);
      video.muted = false;
      video.volume = 1;
      video.playsInline = true;
      video.loop = false;
      video.pause();
      resetStartFrame();
      await waitForVideoReady();
      resetStartFrame();

      try {
        await video.play();
      } catch {
        video.muted = true;
        video.play().catch(() => video.pause());
      }
    };

    const handleEnded = () => {
      playCountRef.current += 1;
      if (playCountRef.current < 2) {
        video.currentTime = 0;
        video.play().catch(() => {});
        return;
      }

      video.pause();
      video.currentTime = Math.max(video.duration - 0.08, 0);
      setIsPlaying(false);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    const setStartFrame = () => {
      resetStartFrame();
      setIsVideoReady(true);
    };

    const scheduleHeroStart = () => {
      if (hasAutoStartedRef.current || delayTimerRef.current) return;
      delayTimerRef.current = window.setTimeout(() => {
        isDelayCompleteRef.current = true;
        startVideoFromStart();
        delayTimerRef.current = null;
      }, 4000);
    };

    const handleWindowLoad = () => {
      scheduleHeroStart();
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("loadedmetadata", setStartFrame);
    if (document.readyState === "complete") {
      handleWindowLoad();
    } else {
      window.addEventListener("load", handleWindowLoad);
    }

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("loadedmetadata", setStartFrame);
      window.removeEventListener("load", handleWindowLoad);
      if (delayTimerRef.current) {
        window.clearTimeout(delayTimerRef.current);
      }
    };
  }, []);

  const handlePlayReel = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isDelayCompleteRef.current) return;

    if (isPlaying) {
      video.pause();
      return;
    }

    await (async () => {
      hasAutoStartedRef.current = true;
      playCountRef.current = 0;
      video.muted = false;
      video.volume = 1;
      video.playsInline = true;
      video.loop = false;
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        // Ignore if metadata not ready.
      }
      if (video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
        await new Promise((resolve) => {
          const handleReady = () => {
            video.removeEventListener("canplay", handleReady);
            video.removeEventListener("canplaythrough", handleReady);
            resolve();
          };

          video.addEventListener("canplay", handleReady);
          video.addEventListener("canplaythrough", handleReady);
        });
      }
      video.currentTime = 0;
      try {
        await video.play();
      } catch {
        video.muted = true;
        video.play().catch(() => video.pause());
      }
    })();
  };

  return (
    <section
      id="home"
      className="hero-video-section relative w-full min-h-screen overflow-hidden"
    >
      <video
        ref={videoRef}
        playsInline
        preload="auto"
        className="hero-background-video"
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative min-h-screen z-20 px-6 pb-20 pt-32 md:pb-[8%] md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-end md:justify-between items-start md:items-end text-left w-full">
        <div className="hero-content-plain flex flex-col items-start text-left max-w-2xl w-full">
          <h1
            data-aos="fade-up"
            className="text-white text-4xl sm:text-5xl md:text-7xl font-black mb-5 tracking-tight leading-[0.95]"
          >
            Hi, I'm a <br />
            <span className="hero-title-glass">
              <span className="hero-title-web mr-3">Web</span> Developer
            </span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-white/82 text-sm md:text-lg font-semibold mb-8 max-w-md drop-shadow-md leading-relaxed"
          >
            I build fast, responsive, and user-friendly websites that help
            businesses grow online.
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="flex flex-row flex-wrap items-center gap-3 w-full"
          >
            <a href="#projects" className="luxury-button luxury-button-light">
              View My Work
            </a>
            <a href="#contact" className="luxury-button luxury-button-glass">
              Contact Me
            </a>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="520"
            className="hero-socials"
            aria-label="Contact links"
          >
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={item.label}
                title={item.label}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-play-reel absolute right-4 bottom-16 z-30 flex flex-col items-center gap-2 md:right-12 md:bottom-24 lg:right-16">
        <button
          type="button"
          onClick={handlePlayReel}
          disabled={!isDelayCompleteRef.current || !isVideoReady}
          aria-label={isPlaying ? "Stop Reel" : "Play Reel"}
          className="hero-play-reel-button group"
        >
          <span className="hero-play-reel-ring" />
          {isPlaying ? (
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="relative h-6 w-6 text-white"
            >
              <path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="relative h-6 w-6 text-white"
            >
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          )}
        </button>
        <span className="hero-play-reel-label">
          {!isDelayCompleteRef.current || !isVideoReady
            ? "Preparing"
            : isPlaying
              ? "Stop Reel"
              : "Play Reel"}
        </span>
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="800"
        className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
      >
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white/70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
