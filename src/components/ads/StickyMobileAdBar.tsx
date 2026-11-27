import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface StickyMobileAdBarProps {
  visible: boolean;
  onDismiss: () => void;
}

export function StickyMobileAdBar({ visible, onDismiss }: StickyMobileAdBarProps) {
  const commentHostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = commentHostRef.current;
    if (!host) return;
    const hasComment = Array.from(host.childNodes).some(
      (n) => n.nodeType === Node.COMMENT_NODE
    );
    if (!hasComment) {
      host.prepend(
        document.createComment(' PASTE ADSTERRA 320x50 STICKY MOBILE BANNER CODE HERE ')
      );
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Mobile sticky advertisement"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur border-t border-[#DDE5F0] px-2.5 py-1 flex items-center justify-center gap-1.5 shadow-sm"
    >
      <div
        ref={commentHostRef}
        className="ad-placeholder-box flex-row gap-2 shrink-0"
        style={{
          minWidth: '320px',
          width: '320px',
          minHeight: '50px',
          height: '50px',
          padding: '4px 8px',
        }}
      >
        <span className="font-mono-num text-[11px] font-semibold text-[#0B1F3A]">
          ADSTERRA 320x50 SLOT
        </span>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Close mobile advertisement banner"
        className="inline-flex items-center justify-center w-8 h-8 rounded text-[#4B5D75] hover:text-[#0B1F3A] hover:bg-[#F4F7FB] transition-colors shrink-0"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
