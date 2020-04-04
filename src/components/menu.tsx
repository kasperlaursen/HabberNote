import * as React from "react";
import styled from "styled-components";

export interface MenuComponentProps {}

const Menu = styled.div`
  padding: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.05);
`;
const MenuComponent = (props: MenuComponentProps) => {
  return <Menu>Menu Bar!</Menu>;
};

export default MenuComponent;
