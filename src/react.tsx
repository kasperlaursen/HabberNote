import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import NoteComponent from "./components/note";
import MenuComponent from "./components/menu";

import * as fs from "fs";

import "./styles.css";

const filePath = "/Users/kasperlaursen/Documents/HabberNote/test.md";

const bgColor = `rgba(255, 255, 255, .9)`;
const windowWidth = 320;

const TrayAppContainer = styled.div`
  position: relative;
  margin-top: 10px;

  height: calc(100vh - 10px);
  width: 100vw;

  box-sizing: border-box;

  background-color: ${bgColor};
  border-radius: 5px;

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
  const [file, setFile] = useState('# Title');
   
  fs.readFile(filePath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.log('Error');
    } else {
      setFile(data);
    }
  });

  return (
    <React.Fragment>
      <TrayAppContainer>
        <NoteComponent defaultValue={file} />
        <MenuComponent />
      </TrayAppContainer>
    </React.Fragment>
  );
};

ReactDOM.render(<Index />, document.getElementById("app"));
