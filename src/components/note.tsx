import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  formatTextToMarkdown,
  formatMarkdownToText,
} from "./markdownFormatter";

import { getCharacterOffset, setCaretPosition } from "./cursorHandler";

export interface NoteComponentProps {
  defaultValue: string;
}

const Note = styled.div`
  width: 100vw;
  border-radius: 5px 5px 0 0;
  flex-grow: 1;
  background: transparent;
  resize: none;
  padding: 10px;
  font-size: 0.8rem;
  white-space: pre-wrap;
  overflow-y: auto;
  overflow-x: hidden;
`;

const NoteComponent = (props: NoteComponentProps) => {
  // TODO: Get defaultNote from Props (form the filesystem)
  const defaultNote: string = formatTextToMarkdown(props.defaultValue);

  // State
  const [note, setNote] = useState(defaultNote);
  const [cursorPos, setCursorPos] = useState(0);
  const [wasEnter, setWasEnter] = useState(false);

  // Reference to the Editable div, used to set the cursor position later!
  let noteFieldRef: React.RefObject<HTMLDivElement> = React.createRef();

  // Whenever the note state changes, set the cursor position in the text field
  useEffect(() => {
      // Since the state has benne updated, set the cursor to the position from state
      setCaretPosition(noteFieldRef.current, cursorPos);
  }, [note]);

  /**
   * This function handles the formatting of the text, whenever a character is added/removed
   * @param event The react form event for onInput
   */
  const handleChange = (event: React.FormEvent<HTMLDivElement>) => {
    const inputElement: HTMLDivElement = event.currentTarget; // The element that triggered the event
    const inputText: string = inputElement.innerText; // The inner text of the element
    setCursorPos(getCharacterOffset(inputElement, wasEnter)); // Get the cursors position in the field, and save it to state
    setWasEnter(false); // Disable the return key flag after use
    setNote(formatTextToMarkdown(inputText)); // Format the raw text with html tags, and update state
  };

  /**
   * Handles any Return keypress, bu setting a flag in state.
   * This flag is then used to fix the cursor position after the markdown formatter is done.
   * @param event The react keyboard event triggered
   */
  const handleRetunKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
     // If the pressed key was enter, and shift was not held
    if (event.key === "Enter" && event.shiftKey == false) {
      // Set the enter flag to true in state
      setWasEnter(true);
    }
  };

  return (
    <Note
      ref={noteFieldRef}
      onKeyPress={handleRetunKey}
      contentEditable="true"
      onInput={handleChange}
      dangerouslySetInnerHTML={{ __html: note }}
    ></Note>
  );
};

export default NoteComponent;
