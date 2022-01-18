import { Link, LoaderFunction, Outlet, useLoaderData } from "remix";
import type { Post } from "../posts";
import { getPostByPathname } from "../posts";

export const loader: LoaderFunction = async ({ request }) => {
  console.log({ r: request.url });
  return { post: getPostByPathname(new URL(request.url).pathname) };
};

export default function Posts() {
  const { post } = useLoaderData<{ post: Post }>();
  const { title, date, links } = post;
  console.log({ title });
  return (
    <article>
      <h2>{title}</h2>
      <time style={{ display: "block", textAlign: "center" }}>
        {new Date(date).toLocaleDateString(undefined, {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </time>
      <div>
        <Outlet />
        <nav className="commandBar">
          <ul>
            <>
              {links.previous && (
                <li>
                  <Link rel="prev" to={links.previous.slug}>
                    ← {links.previous.title}
                  </Link>
                </li>
              )}
              {links.next && (
                <li>
                  <Link rel="next" to={links.next.slug}>
                    {links.next.title} →
                  </Link>
                </li>
              )}
              <li />
            </>
          </ul>
        </nav>
      </div>
    </article>
  );
}
