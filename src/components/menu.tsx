import * as React from "react";
import styled from "styled-components";
import SettingsComponent from "./settings";
export interface MenuComponentProps {}

const Menu = styled.div`
  padding: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.05);
`;

const MenuComponent = (props: MenuComponentProps) => {
  return (
    <Menu>
      <SettingsComponent />
    </Menu>
  );
};

export default MenuComponent;
