import { Link, graphql } from "gatsby";
import React, { FunctionComponent } from "react";

import BlogPost from "../components/BlogPost";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

interface BlogIndexProps {
  data: any;
}

export const BlogIndex: FunctionComponent<BlogIndexProps> = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout title={siteTitle}>
      <SEO title="All posts" />
      <div>
        {posts.map(({ node }) => {
          const props = {
            date: node.frontmatter.date,
            content: node.frontmatter.description || node.excerpt,
            slug: node.fields.slug,
            title: node.frontmatter.title
          };

          return (
            <div key={node.fields.slug}>
              <BlogPost {...props} />
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
