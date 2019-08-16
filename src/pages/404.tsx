import { Link, graphql } from "gatsby";
import React, { FunctionComponent } from "react";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

interface NotFoundPageProps {
  data: any;
}

export const NotFoundPage: FunctionComponent<NotFoundPageProps> = ({
  data
}) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout title={siteTitle}>
      <SEO title="Not Found" />
      <h1>Not Found</h1>
      <p>
        The page you are looking for does not exist. <Link to="/">Go Home</Link>
        .
      </p>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
