'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const SRC = '/marry-your-daughter.mp3'

type Props = {
  /** When this flips to true, start playback immediately (the intro button is
   *  the user gesture browsers require before audio may play). */
  shouldPlay?: boolean
  /** Palette classes for the floating button. Everything else — position,
   *  safe-area padding, icons, aria — is identical across templates. */
  buttonClassName?: string
}

/**
 * Floating play/pause control for the invitation's background music.
 *
 * Templates 1–3 each carry their own 81-line copy of this, differing only in
 * the button's colour classes. This is the same component with that one
 * difference lifted into a prop; template4 uses it. The older three are left
 * alone on purpose — swapping three working templates is a separate change
 * with its own risk, not a free ride on this one.
 */
export function MusicPlayer({ shouldPlay = false, buttonClassName = '' }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!shouldPlay) return
    const el = audioRef.current
    if (!el) return
    void el
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false))
  }, [shouldPlay])

  const toggle = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    if (el.paused) {
      void el
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
    } else {
      el.pause()
      setPlaying(false)
    }
  }, [])

  // The element can also be driven by the OS media keys, so mirror its state
  // rather than trusting our own toggle to be the only source of truth.
  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const onEnded = () => setPlaying(false)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    el.addEventListener('ended', onEnded)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    return () => {
      el.removeEventListener('ended', onEnded)
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
    }
  }, [])

  return (
    <>
      <audio ref={audioRef} src={SRC} loop preload="auto" className="hidden" />
      <div className="pointer-events-none fixed bottom-0 right-0 z-50 flex justify-end pr-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={toggle}
          className={`pointer-events-auto flex h-14 w-14 items-center justify-center transition ${buttonClassName}`}
          aria-label={playing ? 'Jeda musik' : 'Putar musik'}
          aria-pressed={playing}
        >
          {playing ? (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </>
  )
}
