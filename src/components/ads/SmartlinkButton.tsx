import { ExternalLink } from 'lucide-react';
import { getAdsterraSmartlinkUrl } from '../../config/adsConfig';

interface SmartlinkButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  slotType?: 'primary' | 'secondary';
  className?: string;
}

const SECONDARY_LABELS = new Set([
  'Check Claim Eligibility',
  'Download Policy Checklist PDF',
  'Unlock Best Rates',
]);

export function SmartlinkButton({
  label,
  variant = 'primary',
  slotType,
  className = '',
}: SmartlinkButtonProps) {
  const resolvedSlot =
    slotType || (SECONDARY_LABELS.has(label) ? 'secondary' : 'primary');
  const href = getAdsterraSmartlinkUrl(resolvedSlot);

  const variantStyles =
    variant === 'primary'
      ? 'bg-[#0E9F6E] hover:bg-[#0B875D] text-white border border-transparent'
      : variant === 'secondary'
      ? 'bg-[#0B1F3A] hover:bg-[#132E54] text-white border border-transparent'
      : 'bg-white hover:bg-[#F4F7FB] text-[#0B1F3A] border border-[#CBD8E8]';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-smartlink-cta="true"
      data-smartlink-slot={resolvedSlot}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E9F6E] ${variantStyles} ${className}`}
    >
      <span>{label}</span>
      <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
    </a>
  );
}
