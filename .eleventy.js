const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const { DateTime } = require("luxon");

module.exports = (eleventyConfig) => {
  // Set up better markdown parsing library
  eleventyConfig.setLibrary('md', markdownIt({html: true, breaks: true, linkify: false}));

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  
  // eleventyConfig.addPassthroughCopy('favicon.ico');
  eleventyConfig.addPassthroughCopy('src/assets/fonts/');

  // Zone needs to be Etc/UTC for the dates to be displayed properly; if using America/New_York, the date is always a day behind
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: "Etc/UTC"}).toLocaleString(DateTime.DATE_FULL);
  });

  // Add layout aliases here
  eleventyConfig.addLayoutAlias('blogpost', 'layouts/blogpost.html');
  eleventyConfig.addLayoutAlias('column', 'layouts/column.html');
  eleventyConfig.addLayoutAlias('homepage', 'layouts/homepage.html');



  // Configuration for 11ty itself
  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
        input: 'src',
        output: 'dist'
    }
  };
};
