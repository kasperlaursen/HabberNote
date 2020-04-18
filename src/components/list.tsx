import * as React from "react";
import styled from "styled-components";
import { IAvailableNote } from "../react";

export interface ListComponentProps {
  notes: IAvailableNote[];
  isExpanded: boolean;
  onNoteSelect: (note: IAvailableNote) => void;
}

const ListContainer = styled.div`
  max-height: 0vh;
  margin: 0 -5px;
  overflow: hidden;
  transition: max-height 0.3s, margin-bottom 0.3s;
  ${(props: { isExpanded: boolean }): string => {
    return (
      props.isExpanded &&
      ` max-height: 60vh;
        overflow-y: auto;
        margin-top: -5px;
        margin-bottom: 5px;`
    );
  }}
`;

const ListItem = styled.div`
  padding: 10px;
  font-weight: bold;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background 0.3s, color 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
    color: #34a852;
  }
`;

const ListComponent: React.FC<ListComponentProps> = ({
  notes,
  isExpanded,
  onNoteSelect,
}: ListComponentProps) => {
  return (
    <ListContainer isExpanded={isExpanded}>
      {notes?.map((n) => (
        <ListItem key={n.name} onClick={(): void => onNoteSelect(n)}>
          {n.name}
        </ListItem>
      ))}
    </ListContainer>
  );
};

export default ListComponent;
