import * as aBlog from "./routes/posts/a-blog.md";
import * as ratPackDbq from "./routes/posts/rat-pack-dbq.md";
import * as strangeloop2019 from "./routes/posts/strangeloop-2019.md";
import * as recentReactEntrefest from "./routes/posts/recent-react-entrefest.md";
import * as webHostingOnADollarAMonth from "./routes/posts/web-hosting-on-a-dollar-a-month.md";
import { Link } from "remix";
import { ComponentType } from "react";

export interface Post {
  slug: string;
  title: string;
  date: string;
  description?: string;
  links: { previous?: Post; next?: Post };
}

function postFromModule(mod: any): Post {
  return {
    slug: mod.filename.replace(/\.mdx?$/, ""),
    ...mod.attributes.meta,
  };
}

/**
 * There's some limitations with frontmatter and importing md modules so we
 * export objects with all the data we need here.
 */
export const posts: Post[] = [
  postFromModule(webHostingOnADollarAMonth),
  postFromModule(strangeloop2019),
  postFromModule(recentReactEntrefest),
  postFromModule(aBlog),
  postFromModule(ratPackDbq),
];

export const getPostByPathname = (pathname: string): Post | undefined => {
  const index = posts.findIndex(
    (post) => post.slug === pathname.replace(/\/posts\//, "")
  );
  console.log({
    index,
    post: {
      ...posts[index],
      links: { previous: posts[index - 1], next: posts[index + 1] },
    },
    pathname,
  });
  if (index === -1) {
    return undefined;
  }

  return {
    ...posts[index],
    links: { previous: posts[index - 1], next: posts[index + 1] },
  };
};
