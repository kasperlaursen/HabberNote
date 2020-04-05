import React, { useState } from "react";
import styled from "styled-components";
import {
  formatTextToMarkdown,
  formatMarkdownToText
} from "./markdownFormatter";

export interface NoteComponentProps {}

const Note = styled.div`
  width: 100vw;
  border-radius: 10px 10px 0 0;
  flex-grow: 1;
  background: transparent;
  resize: none;
  padding: 10px;
  font-size: 0.8rem;
  white-space: pre-wrap;
`;

const NoteComponent = (props: NoteComponentProps) => {

  const defaultNote: string = formatTextToMarkdown(`# Titel 

## Header

**Dette skal være fed tekst!**
__Dette skal være fed tekst!__

*Dette skal være kusiv!*
_Dette skal være kusiv!_

## Header

# Title`);

  const [note, setNote] = useState(defaultNote);

  const handleChange = (event: React.FormEvent<HTMLDivElement>) => {
    const inputText: string = event.currentTarget.innerText;
    const cleanText: string = formatMarkdownToText(inputText);
    setNote(formatTextToMarkdown(cleanText));
  };

  return (
    <Note
      contentEditable="true"
      onInput={handleChange}
      dangerouslySetInnerHTML={{ __html: note }}
    ></Note>
  );
};

export default NoteComponent;
