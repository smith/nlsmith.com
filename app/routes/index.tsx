/**
 * All the blog post loading stuff here is from https://remix.run/docs/en/v1/guides/mdx#example-blog-usage
 */

import { Link, MetaFunction, useLoaderData, Outlet } from "remix";
import * as aBlog from "./posts/a-blog.md";
import * as ratPackDbq from "./posts/rat-pack-dbq.md";
import * as strangeloop2019 from "./posts/strangeloop-2019.md";
import * as recentReactEntrefest from "./posts/recent-react-entrefest.md";
import * as webHostingOnADollarAMonth from "./posts/web-hosting-on-a-dollar-a-month.md";
import type { Post } from "../posts";
import { posts } from "../posts";

export const meta: MetaFunction = () => {
  return { title: "NL Smith" };
};

export function loader(): { posts: Post[] } {
  // Return metadata about each of the posts for display on the index page.
  // Referencing the posts here instead of in the Index component down below
  // lets us avoid bundling the actual posts themselves in the bundle for the
  // index page.
  return { posts: Object.values(posts) };
}

export default function Index() {
  const { posts } = useLoaderData<{ posts: Post[] }>();

  return (
    <>
      <ul
        style={{ listStyle: "none", margin: 0, padding: 0 }}
        className="posts"
      >
        {posts.map(({ date, description, title, slug }) => (
          <li key={slug}>
            <article>
              <h2>
                {slug ? <Link to={`/posts/${slug}`}>{title}</Link> : title}
              </h2>
              <time style={{ display: "block", textAlign: "center" }}>
                {new Date(date).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              {description && <div>{description}</div>}
            </article>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  );
}
