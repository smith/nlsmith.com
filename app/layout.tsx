import { ReactNode } from "react";
import { Link } from "remix";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header>
        <h1>
          <Link to="/">NL Smith</Link>
        </h1>
        <nav className="commandBar">
          <ul>
            <li>
              <a href="https://github.com/smith">GitHub</a>
            </li>
            <li>
              <a href="https://twitter.com/nlsmith">Twitter</a>
            </li>
            <li>
              <a href="mailto:smith@nlsmith.com">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div>{children}</div>
      </main>
      <footer>© 2004 – {new Date().getFullYear()} Nathan Lloyd Smith</footer>
    </>
  );
}
