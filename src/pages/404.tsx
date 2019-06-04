import React, { FunctionComponent } from "react";

import Layout from "../components/Layout";
import { Location } from "history";
import SEO from "../components/SEO";
import { graphql } from "gatsby";

interface NotFoundPageProps {
  data: any;
}

export const NotFoundPage: FunctionComponent<NotFoundPageProps> = ({
  data
}) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout title={siteTitle}>
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
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
