const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  createRedirect({
    fromPath: "/office",
    toPath: "https://zoom.us/j/2362193845",
    permanent: true
  });
  createRedirect({
    fromPath: "/resume",
    toPath: "https://www.dropbox.com/s/7fbkbin8zwkqwdf/resume.md?dl=0",
    permanent: true
  });
  createRedirect({
    fromPath: "/rat-pack",
    toPath:
      "https://docs.google.com/presentation/d/1i-peXuymkhkzbNdhgA0LF4Son988kGWQjc8X8STpQ8w/",
    permanent: true
  });
  createRedirect({
    fromPath: "/recent-react",
    toPath:
      "https://docs.google.com/presentation/d/1pLWOnbZ8EntHfKU2tmg3Q-yzDKacE6uPdj1rpYSMz5I/",
    permanent: true
  });
  createRedirect({
    fromPath: "/recent-react-2",
    toPath:
      "https://docs.google.com/presentation/d/1Th5xTcujr7_9xOIOfebt0Akz3F-YYYsZ_dEhIXpuQPc/",
    permanent: true
  });

  const blogPost = path.resolve(`./src/templates/BlogPost.tsx`);
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((post, index) => {
      const previous =
        index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next
        }
      });
    });

    return null;
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
