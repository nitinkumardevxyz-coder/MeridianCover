export type AdFormat =
  | '728x90'
  | '320x50'
  | '468x60'
  | '300x250'
  | '160x600'
  | '160x300'
  | 'native';

export interface AdFormatMeta {
  format: AdFormat;
  label: string;
  commentTag: string;
  minWidth: number;
  minHeight: number;
}

declare global {
  interface Window {
    ADSTERRA_SMARTLINK_URL?: string;
    ADSTERRA_CONFIG?: {
      smartlinkUrl?: string;
      labels?: Record<string, string>;
    };
  }
}

const DEFAULT_SMARTLINK_URL = 'https://your-adsterra-smartlink-here.com';

export function getAdsterraSmartlinkUrl(): string {
  if (typeof window !== 'undefined' && window.ADSTERRA_SMARTLINK_URL) {
    return window.ADSTERRA_SMARTLINK_URL;
  }
  return DEFAULT_SMARTLINK_URL;
}

export const AD_FORMAT_META: Record<AdFormat, AdFormatMeta> = {
  '728x90': {
    format: '728x90',
    label: 'ADSTERRA 728x90 SLOT',
    commentTag: 'PASTE ADSTERRA 728x90 LEADERBOARD CODE HERE',
    minWidth: 728,
    minHeight: 90,
  },
  '320x50': {
    format: '320x50',
    label: 'ADSTERRA 320x50 SLOT',
    commentTag: 'PASTE ADSTERRA 320x50 MOBILE BANNER CODE HERE',
    minWidth: 320,
    minHeight: 50,
  },
  '468x60': {
    format: '468x60',
    label: 'ADSTERRA 468x60 SLOT',
    commentTag: 'PASTE ADSTERRA 468x60 CLASSIC BANNER CODE HERE',
    minWidth: 468,
    minHeight: 60,
  },
  '300x250': {
    format: '300x250',
    label: 'ADSTERRA 300x250 SLOT',
    commentTag: 'PASTE ADSTERRA 300x250 MEDIUM RECTANGLE CODE HERE',
    minWidth: 300,
    minHeight: 250,
  },
  '160x600': {
    format: '160x600',
    label: 'ADSTERRA 160x600 SLOT',
    commentTag: 'PASTE ADSTERRA 160x600 WIDE SKYSCRAPER CODE HERE',
    minWidth: 160,
    minHeight: 600,
  },
  '160x300': {
    format: '160x300',
    label: 'ADSTERRA 160x300 SLOT',
    commentTag: 'PASTE ADSTERRA 160x300 VERTICAL BANNER CODE HERE',
    minWidth: 160,
    minHeight: 300,
  },
  native: {
    format: 'native',
    label: 'ADSTERRA NATIVE BANNER SLOT',
    commentTag: 'PASTE ADSTERRA NATIVE BANNER CODE HERE',
    minWidth: 280,
    minHeight: 250,
  },
};
