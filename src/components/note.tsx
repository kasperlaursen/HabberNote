import React, { useState } from "react";
import styled from "styled-components";

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
  const defaultNote = `# Titel 

## Header

**Dette skal være fed tekst!**

__Dette skal være kusiv!__`;

  const [note, setNote] = useState(defaultNote);

  const handleChange = (event: React.FormEvent<HTMLDivElement>) => {
    const inputText = event.currentTarget.innerText;
    const regex = /(#+)(.*)/
    let mdText = inputText.replace(regex, `<b>${inputText.match(regex).join('')}</b>`);
    setNote(mdText);
  };

  return (
    <Note contentEditable="true" onInput={handleChange}>
      {note}
    </Note>
  );
};

export default NoteComponent;
