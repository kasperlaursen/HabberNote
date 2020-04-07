import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import NoteComponent from "./components/note";
import MenuComponent from "./components/menu";

import "./styles.css";

import {
  getFileByPath,
  getFilesInDirectory,
  saveNote,
} from "./helpers/fileHandler";

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

const Index = () => {
  const [openNote, setOpenNote] = useState<IFile>();
  const [files, setFiles] = useState<string[]>();
  const [folderPath, setFolderPath] = useState<string>(
    localStorage.getItem("folderPath")
  );

  if (!files && folderPath) {
    getFilesInDirectory(folderPath).then(
      (files: string[]) => {
        console.log("!files && folderPath", files);
        setFiles(files);
      },
      (err) => {
        console.log("Error:", err);
      }
    );
  }

  const handlePathUpdate = (newPath: string) => {
    setFolderPath(newPath);
    localStorage.setItem("folderPath", newPath);
    getFilesInDirectory(newPath).then(
      (files: string[]) => {
        console.log("handlePathUpdate", files);
        setFiles(files);
      },
      (err) => {
        console.log("Error:", err);
      }
    );
  };

  const handleUpdateNote = (newData: string) => {
    if (folderPath && openNote) saveNote(`${folderPath}${openNote}`, newData);
  };

  return (
    <TrayAppContainer>
      <NoteComponent
        defaultValue={openNote?.data || "# Default"}
        onNoteUpdate={handleUpdateNote}
      />
      <MenuComponent onPathUpdated={handlePathUpdate} />
    </TrayAppContainer>
  );
};

ReactDOM.render(<Index />, document.getElementById("app"));
