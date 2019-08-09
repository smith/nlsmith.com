import React, { FunctionComponent } from "react";

import { Link } from "@reach/router";
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
  console.log({ content }, typeof content);
  return (
    <article>
      <Text
        as="h1"
        style={{ display: "block", textAlign: "center" }}
        variant="xxLarge"
      >
        {slug ? <Link to={slug}>{title}</Link> : title}
      </Text>
      <time style={{ display: "block", textAlign: "center" }}>{date}</time>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default BlogPost;
