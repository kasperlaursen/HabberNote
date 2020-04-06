import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import NoteComponent from "./components/note";
import MenuComponent from "./components/menu";

import * as fs from "fs";

import "./styles.css";

const filePath = "/Users/kla/Documents/HabberNote/test.md";
const folderPath = "/Users/kla/Documents/HabberNote/";

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

interface IFile {
  name: string;
  data: string;
}

const getFilesInDirectory = (setFiles) => {
  fs.readdir(folderPath, (err, files) => {
    if (err)
      return console.log(`Unable to scan directory '${folderPath}': `, err);
    setFiles(files);
  });
};

const getFileByPath = (setOpenNote) => {
  fs.readFile(filePath, { encoding: "utf8" }, (err, data) => {
    if (err) return console.log(`Unable to read file '${filePath}': `, err);
    setOpenNote({ name: "test.md", data });
  });
};

const saveNote = (newData: string) => {
  console.log("Save File");
  fs.writeFile(filePath, newData, "utf8", function (err) {
    if (err) return console.log(err);
  });
};
const Index = () => {
  const [openNote, setOpenNote] = useState<IFile>();
  const [files, setFiles] = useState<string[]>();

  if(!openNote) {
    getFileByPath(setOpenNote);
  }

  if(!files) {
    getFilesInDirectory(setFiles);
  }

  return (
    <React.Fragment>
      <TrayAppContainer>
        <NoteComponent defaultValue={openNote?.data || '# Default'} onNoteUpdate={saveNote} />
        <MenuComponent />
      </TrayAppContainer>
    </React.Fragment>
  );
};

ReactDOM.render(<Index />, document.getElementById("app"));
