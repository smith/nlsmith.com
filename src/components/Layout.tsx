import "./style.css";

import React, { FunctionComponent } from "react";

import CommandBar from "./CommandBar";
import { Link } from "gatsby";
import SEO from "./SEO";
import styled from "styled-components";

interface LayoutProps {
  title: string;
}

const H1 = styled("h1")`
  display: inline;
  font-weight: inherit;
  margin: 0;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Header = styled("header")`
  display: flex;
  justify-content: space-between;
`;

const Main = styled("main")`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    align-self: center;
    width: 33rem;
  }
`;

const Footer = styled("footer")`
  display: block;
  margin-top: 2em;
  text-align: center;
  width: 100%;
`;

export const Layout: FunctionComponent<LayoutProps> = ({ children, title }) => (
  <>
    <SEO title={title} />
    <Header>
      <H1>
        <Link to="/">{title}</Link>
      </H1>
      <CommandBar>
        <li>
          <a href="https://github.com/smith">GitHub</a>
        </li>
        <li>
          <a href="https://twitter.com/nlsmith">Twitter</a>
        </li>
        <li>
          <a href="/resume">Résumé</a>
        </li>
        <li>
          <a href="mailto:smith@nlsmith.com">Contact</a>
        </li>
      </CommandBar>
    </Header>
    <Main>
      <div>{children}</div>
    </Main>
    <Footer>© 2004 – {new Date().getFullYear()} Nathan Lloyd Smith</Footer>
  </>
);

export default Layout;
