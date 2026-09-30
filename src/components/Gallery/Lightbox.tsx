'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { usePresence } from '@/lib/usePresence';
import type { GalleryImage } from './types';

type Props = {
  open: boolean;
  index: number;
  photos: GalleryImage[];
  onClose: () => void;
  onIndex: (i: number) => void;
};

export default function Lightbox({ open, ...props }: Props) {
  const presence = usePresence(open);
  if (!presence.rendered) return null;
  return <LightboxContent {...props} open={open} state={presence.state} onTransitionEnd={presence.onTransitionEnd} />;
}

type ContentProps = Omit<Props, 'open'> & Pick<ReturnType<typeof usePresence>, 'state' | 'onTransitionEnd'> & {
  open: boolean;
};

function LightboxContent({ open, state, onTransitionEnd, index, photos, onClose, onIndex }: ContentProps) {
  const [mainRef, mainApi] = useEmblaCarousel({ loop: true, startIndex: index });
  const [thumbsRef, thumbsApi] = useEmblaCarousel({ containScroll: 'keepSnaps', dragFree: true });
  const [selected, setSelected] = useState(index);
  const onIndexRef = useRef(onIndex);

  useEffect(() => {
    onIndexRef.current = onIndex;
  }, [onIndex]);

  useEffect(() => {
    if (!mainApi) return;
    const onSelect = () => {
      const current = mainApi.selectedScrollSnap();
      setSelected(current);
      onIndexRef.current(current);
      thumbsApi?.scrollTo(current);
    };
    mainApi.on('select', onSelect);
    return () => {
      mainApi.off('select', onSelect);
    };
  }, [mainApi, thumbsApi]);

  useEffect(() => {
    thumbsApi?.scrollTo(index, true);
  }, [thumbsApi, index]);

  const prev = useCallback(() => mainApi?.scrollPrev(), [mainApi]);
  const next = useCallback(() => mainApi?.scrollNext(), [mainApi]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose, next, prev]);

  return (
    <div
      className="motion-backdrop fixed inset-0 z-[var(--z-modal)] flex flex-col bg-black/85 backdrop-blur-sm"
      data-state={state}
      onTransitionEnd={onTransitionEnd}
      inert={state === 'closed'}
      aria-hidden={state === 'closed' || undefined}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Foto ampliada"
    >
      <div className="flex items-center justify-between px-4 pt-4 text-secondary">
        <span aria-live="polite" className="text-sm font-semibold tabular-nums">
          {selected + 1} / {photos.length}
        </span>
        <button
          aria-label="Fechar"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="rounded-full border w-10 h-10 grid place-items-center hover:text-white transition"
        >
          ✕
        </button>
      </div>

      <div data-state={state} className="motion-zoom relative min-h-0 flex-1">
        <div ref={mainRef} className="h-full overflow-hidden">
          <div className="flex h-full touch-pan-y">
            {photos.map((photo, i) => (
              <div
                key={photo.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${photos.length}`}
                className="flex h-full min-w-0 shrink-0 grow-0 basis-full items-center justify-center p-4 sm:px-16"
              >
                <div
                  className="relative h-full w-full max-w-[1200px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="100vw"
                    className="object-contain select-none"
                    draggable={false}
                    priority={i === index}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          aria-label="Anterior"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 hidden sm:grid rounded-full border w-10 h-10 place-items-center text-secondary hover:text-white transition"
        >
          ‹
        </button>

        <button
          aria-label="Próxima"
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:grid rounded-full border w-10 h-10 place-items-center text-secondary hover:text-white transition"
        >
          ›
        </button>
      </div>

      <div className="shrink-0 px-4 pb-4 pt-2" onClick={(e) => e.stopPropagation()}>
        <div ref={thumbsRef} className="mx-auto max-w-5xl overflow-hidden">
          <div className="flex gap-2">
            {photos.map((photo, i) => (
              <button
                key={photo.id}
                onClick={() => mainApi?.scrollTo(i)}
                aria-label={`Ver foto ${i + 1}`}
                aria-current={i === selected}
                className={`relative h-14 w-20 sm:h-16 sm:w-24 shrink-0 overflow-hidden rounded-md border-2 transition ${
                  i === selected ? 'border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                <Image src={photo.src} alt="" fill sizes="96px" className="object-cover" draggable={false} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
