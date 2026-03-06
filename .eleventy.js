module.exports = function(eleventyConfig) {
  // Copy static assets to dist/
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/script.js");
  eleventyConfig.addPassthroughCopy("src/cookie-consent.js");
  eleventyConfig.addPassthroughCopy("src/images");

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
