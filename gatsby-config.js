module.exports = {
  siteMetadata: {
    title: `NL Smith`,
    author: `Nathan Lloyd Smith`,
    description: `Nathan Lloyd Smith's website.`,
    siteUrl: `https://nlsmith.com/`,
    social: {
      gitHub: `smith`,
      twitter: `nlsmith`
    }
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-1765938-1`
      }
    },
    `gatsby-plugin-feed`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: process.env.AWS_BUCKET || "test",
        generateRedirectObjectsForPermanentRedirects: true,
        generateRoutingRules: false
      }
    }
  ]
};
