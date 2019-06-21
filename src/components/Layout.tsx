import "./style.css";

import { CommandBar, Link, Stack, Text } from "office-ui-fabric-react";
import React, { FunctionComponent } from "react";

import { Customizer } from "office-ui-fabric-react";
import { FluentCustomizations } from "@uifabric/fluent-theme";
import { Link as GatsbyLink } from "gatsby";
import Helmet from "react-helmet";

interface LayoutProps {
  title: string;
}

export const H1: React.FunctionComponent = ({ children }) => {
  return (
    <Text as="h1" variant="xLarge">
      {children}
    </Text>
  );
};

const P: React.FunctionComponent = ({ children }) => {
  return (
    <Text as="p" block={true} styles={{ root: { textAlign: "center" } }}>
      {children}
    </Text>
  );
};

export const Layout: FunctionComponent<LayoutProps> = ({ children, title }) => {
  return (
    <Customizer {...FluentCustomizations}>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/10.0.0/css/fabric.min.css"
        />
      </Helmet>

      <Stack horizontal={true} as="header" horizontalAlign={"space-between"}>
        <H1>
          <Link
            as={GatsbyLink}
            styles={{ root: { color: "inherit", textDecoration: "none" } }}
            to="/"
          >
            {title}
          </Link>
        </H1>
        <CommandBar
          items={[]}
          farItems={[
            { key: "GitHub", name: "GitHub", href: "https://github.com/smith" },
            {
              key: "Twitter",
              name: "Twitter",
              href: "https://twitter.com/nlsmith"
            },
            { key: "Résumé", name: "Résumé", href: "/resume" },
            {
              key: "Contact",
              name: "Contact",
              href: "mailto:smith@nlsmith.com"
            }
          ]}
        />
      </Stack>
      <main>
        <Stack horizontalAlign="center">{children}</Stack>
      </main>
      <footer style={{ bottom: 0, position: "fixed", width: "100%" }}>
        <P>© 2004 – {new Date().getFullYear()} Nathan Lloyd Smith</P>
      </footer>
    </Customizer>
  );
};

export default Layout;
