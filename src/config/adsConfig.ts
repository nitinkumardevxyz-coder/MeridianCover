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
  key?: string;
  scriptSrc: string;
  containerId?: string;
}

declare global {
  interface Window {
    ADSTERRA_SMARTLINK_URL?: string;
    ADSTERRA_SMARTLINK_SECONDARY_URL?: string;
    ADSTERRA_CONFIG?: {
      smartlinkUrl?: string;
      secondarySmartlinkUrl?: string;
      labels?: Record<string, string>;
    };
  }
}

const DEFAULT_PRIMARY_SMARTLINK_URL =
  'https://asiaso.org/4/cf44b67b6cd41ad8e1f8b68cabd93fbd';
const DEFAULT_SECONDARY_SMARTLINK_URL =
  'https://asiafilm.org/4/29f713d4660e7d8ea2178e2f0e29f2ae';

export function getAdsterraSmartlinkUrl(
  variant: 'primary' | 'secondary' = 'primary'
): string {
  if (typeof window !== 'undefined') {
    if (variant === 'secondary' && window.ADSTERRA_SMARTLINK_SECONDARY_URL) {
      return window.ADSTERRA_SMARTLINK_SECONDARY_URL;
    }
    if (variant === 'primary' && window.ADSTERRA_SMARTLINK_URL) {
      return window.ADSTERRA_SMARTLINK_URL;
    }
  }
  return variant === 'secondary'
    ? DEFAULT_SECONDARY_SMARTLINK_URL
    : DEFAULT_PRIMARY_SMARTLINK_URL;
}

export const AD_FORMAT_META: Record<AdFormat, AdFormatMeta> = {
  '728x90': {
    format: '728x90',
    label: 'ADSTERRA 728x90 SLOT',
    commentTag: 'ADSTERRA 728x90 LEADERBOARD',
    minWidth: 728,
    minHeight: 90,
    key: 'ceabc313e37248bcc97733ea61273f61',
    scriptSrc: 'https://brijmohan.org/22/ceabc313e37248bcc97733ea61273f61',
  },
  '320x50': {
    format: '320x50',
    label: 'ADSTERRA 320x50 SLOT',
    commentTag: 'ADSTERRA 320x50 MOBILE BANNER',
    minWidth: 320,
    minHeight: 50,
    key: 'd2221ff05cb1860d376ced442ee7adc4',
    scriptSrc: 'https://brijmohan.org/22/d2221ff05cb1860d376ced442ee7adc4',
  },
  '468x60': {
    format: '468x60',
    label: 'ADSTERRA 468x60 SLOT',
    commentTag: 'ADSTERRA 468x60 CLASSIC BANNER',
    minWidth: 468,
    minHeight: 60,
    key: '2a670e7b2469ea347fa0e8c4d8a6f7d8',
    scriptSrc: 'https://brijmohan.org/22/2a670e7b2469ea347fa0e8c4d8a6f7d8',
  },
  '300x250': {
    format: '300x250',
    label: 'ADSTERRA 300x250 SLOT',
    commentTag: 'ADSTERRA 300x250 MEDIUM RECTANGLE',
    minWidth: 300,
    minHeight: 250,
    key: 'b3f63e2c7618bec1932d3f91a3ffee02',
    scriptSrc: 'https://brijmohan.org/22/b3f63e2c7618bec1932d3f91a3ffee02',
  },
  '160x600': {
    format: '160x600',
    label: 'ADSTERRA 160x600 SLOT',
    commentTag: 'ADSTERRA 160x600 WIDE SKYSCRAPER',
    minWidth: 160,
    minHeight: 600,
    key: 'f0a92a495f10ab628b92f011a3c14f79',
    scriptSrc: 'https://brijmohan.org/22/f0a92a495f10ab628b92f011a3c14f79',
  },
  '160x300': {
    format: '160x300',
    label: 'ADSTERRA 160x300 SLOT',
    commentTag: 'ADSTERRA 160x300 VERTICAL BANNER',
    minWidth: 160,
    minHeight: 300,
    key: '47803a42a96f9b675728e1f91894c78a',
    scriptSrc: 'https://brijmohan.org/22/47803a42a96f9b675728e1f91894c78a',
  },
  native: {
    format: 'native',
    label: 'ADSTERRA NATIVE BANNER SLOT',
    commentTag: 'ADSTERRA NATIVE BANNER',
    minWidth: 280,
    minHeight: 250,
    containerId: 'container-0d2b03e8e9abaebc5c413d0b1242dff5',
    scriptSrc: 'https://brijmohan.org/21/0d2b03e8e9abaebc5c413d0b1242dff5',
  },
};

export function buildBannerSrcDoc(meta: AdFormatMeta): string {
  if (!meta.key) return '';
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>
  </head>
  <body>
    <script>
      atOptions = {
        'key': '${meta.key}',
        'format': 'iframe',
        'height': ${meta.minHeight},
        'width': ${meta.minWidth},
        'params': {}
      };
    </script>
    <script data-cfasync="false" src="${meta.scriptSrc}"></script>
  </body>
</html>`;
}
