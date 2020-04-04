import React from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import NoteComponent from "./components/note";
import MenuComponent from "./components/menu";

const bgColor = `rgba(255, 255, 255, .7)`;
const windowWidth = 320;

const GlobalStyle = createGlobalStyle`
  * { border: 0; margin: 0; box-sizing: border-box; outline: none;}
  *:focus { outline: none; }
  body {  font-family: monospace; }
`;

const TrayAppContainer = styled.div`
  position: relative;
  margin-top: 10px;

  height: calc(100vh - 10px);
  width: 100vw;

  box-sizing: border-box;

  background-color: ${bgColor};
  border-radius: 10px;

  display: flex;
  flex-direction: column;

  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;

    top: -10px;
    left: ${windowWidth / 2 - 10}px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${bgColor};
  }
`;

const Index = () => {
  return (
    <React.Fragment>
      <TrayAppContainer>
        <NoteComponent />
        <MenuComponent />
      </TrayAppContainer>
      <GlobalStyle />
    </React.Fragment>
  );
};

ReactDOM.render(<Index />, document.getElementById("app"));
