import {
  defineDocumentType,
  ComputedFields,
  defineNestedType,
  makeSource,
} from "contentlayer2/source-files";
import { writeFileSync, readFileSync } from "fs";
import readingTime from "reading-time";
import { slug } from "github-slugger";
import path from "path";
import { globSync } from "glob";
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
// Remark packages
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { remarkAlert } from "remark-github-blockquote-alert";
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings,
} from "pliny/mdx-plugins/index.js";
// Rehype packages
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeKatexNoTranslate from "rehype-katex-notranslate";
import rehypeCitation from "rehype-citation";
import rehypePrismPlus from "rehype-prism-plus";
import rehypePresetMinify from "rehype-preset-minify";
import siteMetadata from "./data/siteMetadata";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer.js";

const root = process.cwd();
const isProduction = process.env.NODE_ENV === "production";

// heroicon mini link
const icon = fromHtmlIsomorphic(
  `
  <span class="content-header-link">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
  <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
  <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
  </svg>
  </span>
`,
  { fragment: true }
);

const computedFields: ComputedFields = {
  readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ""),
  },
  path: {
    type: "string",
    resolve: (doc) => {
      return doc._raw.flattenedPath;
    },
  },
  filePath: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: "json", resolve: (doc) => extractTocHeadings(doc.body.raw) },
  reading_time: {
    type: "string",
    resolve: (doc) => {
      const wordsPerMinute = doc.locale === "zh" ? 300 : 200; // 中文300字/分钟,英文200词/分钟
      const content = doc.body.raw;
      const wordCount = content.split(/\s+/g).length;
      const minutes = Math.ceil(wordCount / wordsPerMinute);
      return `${minutes} min`;
    },
  },
};

const docComputedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },

  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
};

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
function createTagCount(allBlogs) {
  const tagCount: Record<string, Record<string, number>> = {};
  allBlogs.forEach((file) => {
    const locale = file.locale || "en"; // Default to 'en' if locale is not specified
    if (!tagCount[locale]) {
      tagCount[locale] = {};
    }
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag);
        if (formattedTag in tagCount[locale]) {
          tagCount[locale][formattedTag] += 1;
        } else {
          tagCount[locale][formattedTag] = 1;
        }
      });
    }
  });
  writeFileSync("./app/tag-data.json", JSON.stringify(tagCount));
}

function createSearchIndex(allBlogs) {
  if (
    siteMetadata?.search?.provider === "kbar" &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    // 修改搜索索引数据，确保包含完整的URL
    const searchData = allCoreContent(sortPosts(allBlogs)).map((post) => ({
      ...post,
      // 确保 path 是完整的 URL 路径
      path: post.path.startsWith("/") ? post.path : `/${post.path}`,
    }));

    writeFileSync(
      `public/${path.basename(siteMetadata.search.kbarConfig.searchDocumentsPath)}`,
      JSON.stringify(searchData)
    );
    console.log("Local search index generated...");
  }
}

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "**/blog/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    locale: {
      type: "string",
      description: "The language of the post (en or zh)",
      default: "en",
    },
    date: { type: "date" },
    tags: { type: "list", of: { type: "string" }, default: [] },
    lastmod: { type: "date" },
    draft: { type: "boolean" },
    summary: {
      type: "string",
    },
    images: { type: "json" },
    authors: { type: "list", of: { type: "string" } },
    author: { type: "string" },
    layout: { type: "string" },
    bibliography: { type: "string" },
    canonicalUrl: { type: "string" },
  },
  computedFields: {
    ...computedFields,
    path: {
      type: "string",
      resolve: (doc) => {
        const pathSegments = doc._raw.flattenedPath.split("/");
        const locale = pathSegments[1];
        const restOfPath = pathSegments.slice(2).join("/");
        return locale === "en"
          ? `/blog/${restOfPath}`
          : `/${locale}/blog/${restOfPath}`;
      },
    },
    slug: {
      type: "string",
      resolve: (doc) => {
        const pathSegments = doc._raw.flattenedPath.split("/");
        return pathSegments.slice(2).join("/");
      },
    },
    structuredData: {
      type: "json",
      resolve: (doc) => ({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}${doc.path}`,
      }),
    },
  },
}));

export const Authors = defineDocumentType(() => ({
  name: "Authors",
  filePathPattern: "authors/**/*.mdx",
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    avatar: { type: "string" },
    occupation: { type: "string" },
    company: { type: "string" },
    email: { type: "string" },
    twitter: { type: "string" },
    bluesky: { type: "string" },
    linkedin: { type: "string" },
    github: { type: "string" },
    layout: { type: "string" },
  },
  computedFields,
}));

const LinksProperties = defineNestedType(() => ({
  name: "LinksProperties",
  fields: {
    title: { type: "string", required: true },
    links: { type: "list", of: { type: "string" }, required: true },
    description: { type: "string" },
  },
}));

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: "docs/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string" },
    nav_title: { type: "string" },
    related: { type: "nested", of: LinksProperties, required: false },
    toc: { type: "boolean", default: false },
    published: { type: "boolean", default: false },
  },
  computedFields: {
    ...computedFields,
    // 获取文档的文件夹名称
    folder: {
      type: "string",
      resolve: (doc) => {
        const segments = doc._raw.flattenedPath.split("/");
        return segments[2];
      },
    },
    slugAsParams: {
      type: "string",
      resolve: (doc) => {
        const segments = doc._raw.flattenedPath.split("/").slice(1).join("/");
        return segments;
      },
    },
    path: {
      type: "string",
      resolve: (doc) => {
        const segments = doc._raw.flattenedPath.split("/");
        const locale = segments[1];
        const restOfPath = segments.slice(2).join("/");
        return locale === "en"
          ? `/docs/${restOfPath}`
          : `/${locale}/docs/${restOfPath}`;
      },
    },
    headings: {
      type: "json",
      resolve: async (doc) => {
        const headings = extractTocHeadings(doc.body.raw);
        return headings;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Blog, Authors, Doc],
  mdx: {
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
      remarkAlert,
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          headingProperties: {
            className: ["content-header"],
          },
          content: icon,
        },
      ],
      rehypeKatex,
      [
        rehypeKatexNoTranslate,
        {
          strict: false,
          macros: {
            "\\eqref": "\\href{#1}",
          },
          throwOnError: false,
          output: "html",
        },
      ],
      [rehypeCitation, { path: path.join(root, "data") }],
      [rehypePrismPlus, { defaultLanguage: "js", ignoreMissing: true }],
      rehypePresetMinify,
    ],
    cwd: path.join(process.cwd()),
  },
  onSuccess: async (importData) => {
    try {
      const { allDocuments } = await importData();
      // 过滤出所有的博客文档
      const allBlogs = allDocuments.filter((doc) => doc.type === "Blog");

      const files = globSync("**/blog/**/*.mdx", {
        cwd: path.join(process.cwd(), "data"),
      });

      createTagCount(allBlogs);
      createSearchIndex(allBlogs);
    } catch (error) {
      console.error("Error in onSuccess:", error);
      if (error instanceof Error) {
        console.error("Error stack:", error.stack);
      }
    }
  },
});
