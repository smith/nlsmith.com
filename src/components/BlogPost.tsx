import React, { FunctionComponent } from "react";

import { Link } from "@reach/router";

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
      <h2>{slug ? <Link to={slug}>{title}</Link> : title}</h2>
      <time style={{ display: "block", textAlign: "center" }}>{date}</time>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default BlogPost;
