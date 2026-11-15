"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed hero background.
 * - Layer 1 (always): a looping, slowly zooming montage of real work images, so the hero is never static.
 * - Layer 2 (when the file exists): the generated video (public/video/hero.mp4), faded in over the montage.
 * Drop a muted, looping mp4 at `video` and it takes over automatically; remove it and the montage returns.
 * Reduced motion: no zoom, no autoplay (the first image / the video poster stays).
 */
export default function HeroBackdrop({ images, video = "/video/hero.mp4" }: { images: string[]; video?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onCanPlay = () => {
      setReady(true);
      if (reduce) v.pause();
    };
    v.addEventListener("canplay", onCanPlay);
    return () => v.removeEventListener("canplay", onCanPlay);
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-lab-bg">
      {images.slice(0, 6).map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={src} src={src} alt="" loading={i === 0 ? "eager" : "lazy"} className="lab-slide" style={{ "--i": i } as React.CSSProperties} />
      ))}
      <video
        ref={ref}
        src={video}
        poster={images[0]}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 size-full object-cover transition-opacity duration-1000"
        style={{ opacity: ready ? 1 : 0 }}
      />
    </div>
  );
}
