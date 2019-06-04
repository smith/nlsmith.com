import { DocumentCard, DocumentCardTitle } from "office-ui-fabric-react";
import { Link, navigate } from "@reach/router";
import React, { FunctionComponent } from "react";

import { Text } from "office-ui-fabric-react";

export interface BlogPostProps {
  date: string;
  content: string;
  slug?: string;
  title?: string;
}

export const BlogPost: FunctionComponent<BlogPostProps> = ({
  date,
  content,
  slug,
  title
}) => {
  return (
    <article style={{ textAlign: "center" }}>
      <Text as="h1" variant="xxLarge">
        {slug ? <Link to={slug}>{title}</Link> : title}
      </Text>
      <time style={{ display: "block" }}>{date}</time>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default BlogPost;
