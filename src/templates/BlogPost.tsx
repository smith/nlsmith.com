import { Link, graphql } from "gatsby";
import React, { FunctionComponent } from "react";

import BlogPost from "../components/BlogPost";
import CommandBar from "../components/CommandBar";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

interface NavProps {
  next?: any;
  previous?: any;
}

const Nav: React.FunctionComponent<NavProps> = ({ next, previous }) => (
  <CommandBar>
    <>
      {previous && (
        <li>
          <Link rel="prev" to={previous && previous.fields.slug}>
            ← {previous.frontmatter.title}
          </Link>
        </li>
      )}
      {next && (
        <li>
          <Link rel="next" to={next && next.fields.slug}>
            {next.frontmatter.title} →
          </Link>
        </li>
      )}
      <li />
    </>
  </CommandBar>
);

interface BlogPostTemplateProps {
  data: any;
  pageContext: any;
}

export const BlogPostTemplate: FunctionComponent<BlogPostTemplateProps> = ({
  data,
  pageContext
}) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  return (
    <Layout title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <BlogPost
        content={post.html}
        date={post.frontmatter.date}
        title={post.frontmatter.title}
      />
      <Nav next={next} previous={previous} />
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
