const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  // Add RSS plugin for sitemap support
  eleventyConfig.addPlugin(pluginRss);

  // Copy static assets to dist/
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/script.js");
  eleventyConfig.addPassthroughCopy("src/cookie-consent.js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Copy all favicon files
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/favicon-96x96.png");
  eleventyConfig.addPassthroughCopy("src/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("src/web-app-manifest-192x192.png");
  eleventyConfig.addPassthroughCopy("src/web-app-manifest-512x512.png");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");

  // Create news collection (sorted by date, newest first)
  eleventyConfig.addCollection("news", function(collection) {
    return collection.getFilteredByGlob("src/news/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Filter for formatting dates
  eleventyConfig.addFilter("readableDate", dateObj => {
    return dateObj.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // Filter for ISO date format (for datetime attributes)
  eleventyConfig.addFilter("isoDate", dateObj => {
    return dateObj.toISOString();
  });

  // Configure dev server to use port 8090
  eleventyConfig.setServerOptions({
    port: 8090
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
