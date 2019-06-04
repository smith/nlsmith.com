import {
  CommandBar,
  CommandBarButton,
  IButtonProps,
  Text
} from "office-ui-fabric-react";
import React, { FunctionComponent } from "react";

import BlogPost from "../components/BlogPost";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { graphql } from "gatsby";
import { navigate } from "@reach/router";

interface NavProps {
  next?: any;
  previous?: any;
}

const Nav: React.FunctionComponent<NavProps> = ({ next, previous }) => {
  const customButton = (props: { to: string } & IButtonProps) => {
    const handleClick = () => navigate(props.to);
    return <CommandBarButton {...props} onClick={handleClick} />;
  };

  const items = [
    {
      disabled: !previous,
      key: "previous",
      name: previous ? `← ${previous.frontmatter.title}` : "← Previous",
      rel: "prev",
      to: previous && previous.fields.slug
    },
    {
      disabled: !next,
      key: "next",
      name: next ? `${next.frontmatter.title} →` : "Next →",
      rel: "next",
      to: next && next.fields.slug
    }
  ];

  return <CommandBar buttonAs={customButton} items={items} />;
};

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
