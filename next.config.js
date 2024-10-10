/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    output: "standalone",
  },
  env: {
    masterApiKey: "IMuX4EIk2ZzDYF2jSyiaGrn4osR-aAIb",
    fbAppId: "535344394492897",
    SITE_URL: "https://golive.vn/",
    API_URL: "https://golive.vn/api",
    DEV_API_URL: "http://localhost:3000/api",
    THUMBNAIL_URL_PREFIX: "https://golive.vn/data/dc_thumbnails/",
    DEFAULT_THUMBNAIL_URL: "https://golive.vn/data/assets/logo/golivelog1.png",
    REDIS_URL: "redis://redis:6379",
    siteTitle: "GOLIVE.VN - THÔNG TIN GIẢI TRÍ DÀNH CHO GIỚI TRẺ",
    siteDesciption:
      "GOLIVE - Chia sẻ Thông Tin Nghệ Thuật và Giải trí xã hội Việt Nam - Quốc Tế.  Video ngôi sao, phim ảnh, tình yêu, học đường.",
    highlightPostsForumsID: 15,
    highlightPostsLimit: 10,
    generalInfomationID: 10,
    categoryHomepage: [
      {
        title: "Sao & Đời Sống",
        slug: "sao_va_doi_song",
        icon: "/images/star_category.svg",
        display_on_homepage: true,
        categoryId: 10,
      },
      {
        title: "Xã Hội",
        slug: "xa_hoi",
        icon: "/images/xa_hoi.svg",
        display_on_homepage: true,
        categoryId: 10,
      },
      {
        title: "Điện Ảnh & Giải Trí",
        slug: "dien_anh_va_giai_tri",
        icon: "/images/dien_anh_va_giai_tri.svg",
        display_on_homepage: true,
        categoryId: 2,
      },
      {
        title: "Âm Nhạc",
        slug: "am_nhac",
        icon: "/images/am_nhac.svg",
        display_on_homepage: true,
        categoryId: 3,
      },
      {
        title: "Phim",
        slug: "phim",
        icon: "/images/film.svg",
        display_on_homepage: true,
        categoryId: 2,
      },
      {
        title: "Sức Khỏe",
        slug: "suc_khoe",
        icon: "/images/xa_hoi.svg",
        display_on_homepage: true,
        categoryId: 11,
      },
      {
        title: "Công Nghệ",
        slug: "cong_nghe",
        icon: "/images/cong_nghe.svg",
        display_on_homepage: true,
        categoryId: 11,
      },
      {
        title: "Học Đường",
        slug: "hoc_duong",
        icon: "/images/hoc_duong.svg",
        display_on_homepage: true,
        categoryId: 11,
      },
      {
        title: "Thể Thao",
        slug: "the_thao",
        icon: "/images/the_thao.svg",
        display_on_homepage: true,
        categoryId: 11,
      },
      {
        title: "Mua Sắm",
        slug: "mua_sam",
        icon: "/images/shopping-bag.svg",
        display_on_homepage: true,
        categoryId: 11,
      },
      {
        title: "Làm Đẹp",
        slug: "lam_dep",
        icon: "/images/lam_dep.svg",
        display_on_homepage: true,
        categoryId: 11,
      },
      {
        title: "Thế giới đó đây",
        slug: "the_gioi_do_day",
        icon: "/images/thegioi.svg",
        display_on_homepage: false,
      },
      {
        title: "Money-Z",
        slug: "money_z",
        icon: "/images/xa_hoi.svg",
        display_on_homepage: false,
      },
      {
        title: "Video",
        slug: "video",
        icon: "/images/youtube.svg",
        display_on_homepage: false,
      },
    ],
  },
  images: {
    domains: ["golive.vn"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  plugins: [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
        features: {
          "custom-properties": false,
        },
      },
    ],
    [
      "@fullhuman/postcss-purgecss",
      {
        content: [
          "./pages/**/*.{js,jsx,ts,tsx}",
          "./components/**/*.{js,jsx,ts,tsx}",
          "./pages/*.{js,jsx,ts,tsx}",
          "./components/*.{js,jsx,ts,tsx}",
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: ["html", "body"],
      },
    ],
  ],
  i18n: {
    locales: ["vi"],
    defaultLocale: "vi",
  },
}

module.exports = nextConfig
