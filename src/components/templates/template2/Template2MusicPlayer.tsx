"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SRC = "/marry-your-daughter.mp3";

interface Props {
  /** When this flips to true, start playback immediately (triggered by user gesture in intro) */
  shouldPlay?: boolean;
}

export function Template2MusicPlayer({ shouldPlay = false }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  // Start playback once the parent unlocks it (user already interacted via intro button)
  useEffect(() => {
    if (!shouldPlay) return;
    const el = audioRef.current;
    if (!el) return;
    void el
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [shouldPlay]);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      void el
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      el.pause();
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onEnded = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    el.addEventListener("ended", onEnded);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    return () => {
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src={SRC} loop preload="auto" className="hidden" />
      <div className="pointer-events-none fixed bottom-0 right-0 z-50 flex justify-end pr-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={toggle}
          className="pointer-events-auto flex h-12 w-12 items-center justify-center border border-gilt/50 bg-forest-deep/90 text-gilt backdrop-blur-sm transition-colors hover:bg-gilt hover:text-forest-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt"
          aria-label={playing ? "Jeda musik" : "Putar musik"}
          aria-pressed={playing}
        >
          {playing ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
