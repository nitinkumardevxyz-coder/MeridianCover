import { useEffect, useRef } from 'react';
import { AD_FORMAT_META, AdFormat } from '../../config/adsConfig';

interface AdSlotProps {
  format: AdFormat;
  slotId?: string;
  className?: string;
}

const RESPONSIVE_VISIBILITY: Record<AdFormat, string> = {
  '728x90': 'hidden md:flex flex-col',
  '320x50': 'flex flex-col md:hidden',
  '468x60': 'hidden md:flex flex-col',
  '300x250': 'flex flex-col',
  '160x600': 'hidden xl:flex flex-col',
  '160x300': 'hidden xl:flex flex-col',
  native: 'flex flex-col w-full',
};

export function AdSlot({ format, slotId, className = '' }: AdSlotProps) {
  const meta = AD_FORMAT_META[format];
  const commentHostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = commentHostRef.current;
    if (!host) return;
    const commentText = ` ${meta.commentTag}${slotId ? ` (${slotId})` : ''} `;
    const existing = Array.from(host.childNodes).find(
      (node) => node.nodeType === Node.COMMENT_NODE
    );
    if (!existing) {
      host.prepend(document.createComment(commentText));
    }
  }, [meta.commentTag, slotId]);

  const visibilityClass = RESPONSIVE_VISIBILITY[format];

  if (format === 'native') {
    return (
      <aside
        aria-label="Sponsored content"
        data-ad-format={format}
        data-ad-slot={slotId || format}
        className={`ad-wrapper w-full ${visibilityClass} ${className}`}
      >
        <span className="ad-caption">Advertisement</span>
        <div
          ref={commentHostRef}
          className="ad-placeholder-box w-full max-w-full"
          style={{ minHeight: `${meta.minHeight}px` }}
        >
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 text-left p-2">
            <div className="border border-dashed border-[#CBD8E8] rounded bg-white/80 p-4 flex flex-col justify-between min-h-[180px]">
              <span className="text-[11px] uppercase tracking-wider text-[#64748B] font-medium">
                Sponsored Comparison
              </span>
              <div className="my-2">
                <p className="font-display font-semibold text-sm text-[#0B1F3A]">
                  {meta.label} · Card 1
                </p>
                <p className="text-xs text-[#4B5D75] mt-1">
                  Native recommendation slot styled to match editorial policy cards without layout shift.
                </p>
              </div>
              <span className="text-xs font-medium text-[#0E9F6E]">Native Ad Container</span>
            </div>
            <div className="border border-dashed border-[#CBD8E8] rounded bg-white/80 p-4 flex flex-col justify-between min-h-[180px]">
              <span className="text-[11px] uppercase tracking-wider text-[#64748B] font-medium">
                Sponsored Offer
              </span>
              <div className="my-2">
                <p className="font-display font-semibold text-sm text-[#0B1F3A]">
                  {meta.label} · Card 2
                </p>
                <p className="text-xs text-[#4B5D75] mt-1">
                  Paste your Adsterra Native Banner widget script inside this container block.
                </p>
              </div>
              <span className="text-xs font-medium text-[#0E9F6E]">Native Ad Container</span>
            </div>
            <div className="border border-dashed border-[#CBD8E8] rounded bg-white/80 p-4 flex flex-col justify-between min-h-[180px]">
              <span className="text-[11px] uppercase tracking-wider text-[#64748B] font-medium">
                Partner Rate Check
              </span>
              <div className="my-2">
                <p className="font-display font-semibold text-sm text-[#0B1F3A]">
                  {meta.label} · Card 3
                </p>
                <p className="text-xs text-[#4B5D75] mt-1">
                  Responsive 3-column grid on desktop, single column on mobile (`min-height: 250px`).
                </p>
              </div>
              <span className="text-xs font-medium text-[#0E9F6E]">Native Ad Container</span>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label={`Advertisement ${format}`}
      data-ad-format={format}
      data-ad-slot={slotId || format}
      className={`ad-wrapper ${visibilityClass} ${className}`}
    >
      <span className="ad-caption">Advertisement</span>
      <div
        ref={commentHostRef}
        className="ad-placeholder-box"
        style={{
          minWidth: `${meta.minWidth}px`,
          width: `${meta.minWidth}px`,
          minHeight: `${meta.minHeight}px`,
          height: `${meta.minHeight}px`,
          maxWidth: '100%',
        }}
      >
        <span className="font-mono-num text-[11px] font-semibold tracking-wider text-[#0B1F3A]">
          {meta.label}
        </span>
        {meta.minHeight >= 90 && (
          <span className="text-[11px] text-[#64748B] mt-1">
            {meta.minWidth} × {meta.minHeight} · Zero-CLS Reserved Slot
          </span>
        )}
      </div>
    </aside>
  );
}
