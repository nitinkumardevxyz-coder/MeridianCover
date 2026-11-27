/**
 * Centralized Adsterra Monetization Configuration
 * Domain: https://meridiancover.t20tycoon.com/
 * ------------------------------------------------
 * All active Adsterra Smartlinks, Popunder, Social Bar, Native Banner,
 * and Display Banner zone keys are configured here for site-wide application.
 */

const SITE_DOMAIN = "https://meridiancover.t20tycoon.com";
const ADSTERRA_SMARTLINK_URL = "https://asiaso.org/4/cf44b67b6cd41ad8e1f8b68cabd93fbd";
const ADSTERRA_SMARTLINK_SECONDARY_URL = "https://asiafilm.org/4/29f713d4660e7d8ea2178e2f0e29f2ae";

const ADSTERRA_CONFIG = {
  siteDomain: SITE_DOMAIN,
  smartlinkUrl: ADSTERRA_SMARTLINK_URL,
  secondarySmartlinkUrl: ADSTERRA_SMARTLINK_SECONDARY_URL,
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
  zones: {
    popunderScript: "https://ahuramazda.org/1/caf082f9d2c86aa55dddb1b616174c09",
    socialBarScript: "https://brijmohan.org/14/7b9a72dd7878a01beff1f89af23c0564",
    nativeBanner: {
      containerId: "container-0d2b03e8e9abaebc5c413d0b1242dff5",
      scriptSrc: "https://brijmohan.org/21/0d2b03e8e9abaebc5c413d0b1242dff5",
    },
    leaderboard728x90: {
      key: "ceabc313e37248bcc97733ea61273f61",
      width: 728,
      height: 90,
      scriptSrc: "https://brijmohan.org/22/ceabc313e37248bcc97733ea61273f61",
    },
    mobile320x50: {
      key: "d2221ff05cb1860d376ced442ee7adc4",
      width: 320,
      height: 50,
      scriptSrc: "https://brijmohan.org/22/d2221ff05cb1860d376ced442ee7adc4",
    },
    classic468x60: {
      key: "2a670e7b2469ea347fa0e8c4d8a6f7d8",
      width: 468,
      height: 60,
      scriptSrc: "https://brijmohan.org/22/2a670e7b2469ea347fa0e8c4d8a6f7d8",
    },
    rectangle300x250: {
      key: "b3f63e2c7618bec1932d3f91a3ffee02",
      width: 300,
      height: 250,
      scriptSrc: "https://brijmohan.org/22/b3f63e2c7618bec1932d3f91a3ffee02",
    },
    skyscraper160x600: {
      key: "f0a92a495f10ab628b92f011a3c14f79",
      width: 160,
      height: 600,
      scriptSrc: "https://brijmohan.org/22/f0a92a495f10ab628b92f011a3c14f79",
    },
    vertical160x300: {
      key: "47803a42a96f9b675728e1f91894c78a",
      width: 160,
      height: 300,
      scriptSrc: "https://brijmohan.org/22/47803a42a96f9b675728e1f91894c78a",
    },
  },
};

if (typeof window !== "undefined") {
  window.SITE_DOMAIN = SITE_DOMAIN;
  window.ADSTERRA_SMARTLINK_URL = ADSTERRA_SMARTLINK_URL;
  window.ADSTERRA_SMARTLINK_SECONDARY_URL = ADSTERRA_SMARTLINK_SECONDARY_URL;
  window.ADSTERRA_CONFIG = ADSTERRA_CONFIG;
}
