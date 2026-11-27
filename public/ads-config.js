/**
 * Centralized Adsterra Monetization Configuration
 * ------------------------------------------------
 * Paste your Adsterra Smartlink URL and ad zone scripts/IDs below.
 * Updating ADSTERRA_SMARTLINK_URL automatically updates every Smartlink CTA
 * across all 7 pages of the MeridianCover Insurance portal.
 */

const ADSTERRA_SMARTLINK_URL = "https://your-adsterra-smartlink-here.com";

const ADSTERRA_CONFIG = {
  smartlinkUrl: ADSTERRA_SMARTLINK_URL,
  labels: {
    caption: "Advertisement",
    leaderboard728: "ADSTERRA 728x90 SLOT",
    mobile320: "ADSTERRA 320x50 SLOT",
    classic468: "ADSTERRA 468x60 SLOT",
    rectangle300: "ADSTERRA 300x250 SLOT",
    skyscraper160x600: "ADSTERRA 160x600 SLOT",
    vertical160x300: "ADSTERRA 160x300 SLOT",
    nativeBanner: "ADSTERRA NATIVE BANNER SLOT",
  },
  // Optional: store Adsterra zone keys for reference or custom dynamic loaders
  zones: {
    popunderKey: "",
    socialBarKey: "",
    leaderboard728x90Key: "",
    mobile320x50Key: "",
    classic468x60Key: "",
    rectangle300x250Key: "",
    skyscraper160x600Key: "",
    vertical160x300Key: "",
    nativeBannerKey: "",
  },
};

if (typeof window !== "undefined") {
  window.ADSTERRA_SMARTLINK_URL = ADSTERRA_SMARTLINK_URL;
  window.ADSTERRA_CONFIG = ADSTERRA_CONFIG;
}
