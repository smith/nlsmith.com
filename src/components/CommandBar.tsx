import React, { FunctionComponent } from "react";

import styled from "styled-components";

const Nav = styled("nav")`
  text-align: center;
`;

const UL = styled("ul")`
  display: inline;
  list-style: none;
  margin: 0;

  li {
    display: inline;
    margin-right: 1em;
  }
`;

export const CommandBar: FunctionComponent = ({ children }) => (
  <Nav>
    <UL>{children}</UL>
  </Nav>
);

export default CommandBar;
