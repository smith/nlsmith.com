import React, { FunctionComponent } from "react";

import styled from "styled-components";

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

export const CommandBar: FunctionComponent = ({ children }) => (
  <nav>
    <UL>{children}</UL>
  </nav>
);

export default CommandBar;
