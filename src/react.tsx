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
  renameNote,
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

export interface IAvailableNote {
  name: string;
  path: string;
}

export interface INote extends IAvailableNote {
  data: string;
  tags?: string[];
}

const Index = () => {
  const [openNote, setOpenNote] = useState<INote>();
  const [notes, setNotes] = useState<IAvailableNote[]>();
  const [folderPath, setFolderPath] = useState<string>(
    localStorage.getItem("folderPath")
  );

  const updateNotes = () => {
    getFilesInDirectory(folderPath).then(
      (notes: IAvailableNote[]) => {
        setNotes(notes);
      },
      (err) => {
        console.log("Error:", err);
      }
    );
  };

  if (!notes && folderPath) {
    updateNotes();
  }

  const handlePathUpdate = (newPath: string) => {
    const fixedNewPath = newPath.slice(-1) == "/" ? newPath : newPath + "/";
    setFolderPath(fixedNewPath);
    localStorage.setItem("folderPath", fixedNewPath);
    getFilesInDirectory(fixedNewPath).then(
      (notes: IAvailableNote[]) => {
        setNotes(notes);
      },
      (err) => {
        console.log("Error:", err);
      }
    );
  };

  const getNote = (note: IAvailableNote) => {
    const { path, name } = note;
    getFileByPath(`${path}${name}`).then(
      (data: string) => {
        setOpenNote({
          ...note,
          data,
        });
      },
      (err) => {
        console.log("Error:", err);
      }
    );
  };

  if (notes && !openNote) {
    getNote(notes[0]);
  }

  const handleUpdateNote = (newData: string) => {
    // Check if the title of the note has changed.
    if (!newData) return;
    const titleMatch: RegExpMatchArray = newData.match(/(?<!#)#(?!#)(.*)/);
    const title: string = (titleMatch && titleMatch[0]) || "";
    const newFileName: string = title && `${title.replace("# ", "")}.md`;
    if (
      newFileName &&
      newFileName != openNote.name &&
      notes.map((n) => n.name).indexOf(newFileName) == -1
    ) {
      // If title changed, rename file
      renameNote(
        `${folderPath}${openNote.name}`,
        `${folderPath}${newFileName}`
      ).then(
        () => {
          // If rename success, Update file
          saveNote(`${folderPath}${newFileName}`, newData);
          setOpenNote({ ...openNote, name: newFileName });
          updateNotes();
        },
        (err) => console.log("Error:", err)
      );
    } else if (folderPath && openNote) {
      saveNote(`${folderPath}${openNote.name}`, newData);
      updateNotes();
    }
  };

  const handleNewNote = () => {
    console.log("handleNewNote");
    setOpenNote({ path: folderPath, name: "New Note.md", data: "# New Note" });
    console.log("handleNewNote", openNote);
  };

  return (
    <TrayAppContainer>
      <NoteComponent
        defaultValue={openNote?.data || "# New Note"}
        onNoteUpdate={handleUpdateNote}
      />
      <MenuComponent
        notes={notes}
        onNoteSelect={getNote}
        defaultPath={folderPath}
        onPathUpdated={handlePathUpdate}
        onNewNote={handleNewNote}
      />
    </TrayAppContainer>
  );
};

ReactDOM.render(<Index />, document.getElementById("app"));
