import "./style.css";

import React, { FunctionComponent } from "react";

import { Link } from "gatsby";
import { Stack } from "office-ui-fabric-react";
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

const UL = styled("ul")`
  display: inline;
  list-style: none;
  margin: 0;

  li {
    display: inline;
    margin-right: 1em;
  }

  li a {
    color: inherit;
    text-decoration: none;
  }
`;

const Footer = styled("footer")`
  display: block;
  margin-top: 2em;
  text-align: center;
  width: 100%;
`;

export const Layout: FunctionComponent<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <Stack horizontal={true} as="header" horizontalAlign={"space-between"}>
        <H1>
          <Link to="/">{title}</Link>
        </H1>
        <UL>
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
        </UL>
      </Stack>
      <Stack as="main" horizontalAlign="center">
        {children}
      </Stack>
      <Footer>© 2004 – {new Date().getFullYear()} Nathan Lloyd Smith</Footer>
    </>
  );
};

export default Layout;
