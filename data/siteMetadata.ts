interface SiteMetadata {
  title: string;
  author: string;
  headerTitle: string;
  description: string;
  language: string;
  theme: "system" | "dark" | "light";
  siteUrl: string;
  siteRepo: string;
  siteLogo: string;
  socialBanner: string;
  email: string;
  github: string;
  x: string;
  facebook: string;
  youtube: string;
  linkedin: string;
  threads: string;
  instagram: string;
  medium: string;
  bluesky: string;
  locale: string;
  stickyNav: boolean;
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: string;
    };
  };
  newsletter: {
    provider: string;
  };
  search: {
    provider: string;
    kbarConfig: {
      searchDocumentsPath: string;
    };
  };
}

const siteMetadata: SiteMetadata = {
  title: "NUBRI",
  author: "Atalas",
  headerTitle: "AI AGENT",
  description: "AI AGENT",
  language: "en-us",
  theme: "system", // system, dark or light
  siteUrl:

    process.env.NODE_ENV === "production"
      ? "https://nubri.co" // 生产环境URL
      : "http://localhost:3000", // 开发环境URL
  siteRepo: "https://github.com/masapasa/nubri",
  siteLogo: `${process.env.BASE_PATH || ""}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ""}/static/images/twitter-card.png`,
  email: "address@yoursite.com",
  github: "https://github.com",
  x: "https://twitter.com/x",
  facebook: "https://facebook.com",
  youtube: "https://youtube.com",
  linkedin: "https://www.linkedin.com",
  threads: "https://www.threads.net",
  instagram: "https://www.instagram.com",
  medium: "https://medium.com",
  bluesky: "https://bsky.app/",
  locale: "en-US",
  stickyNav: true,
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
  },
  newsletter: {
    provider: "buttondown",
  },

  search: {
    provider: "kbar",
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ""}/search.json`,
    },
  },
};

export default siteMetadata;
