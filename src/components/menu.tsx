import * as React from "react";
import styled from "styled-components";
import SettingsComponent from "./settings";
import ListComponent from "./list";
import { FiList } from "react-icons/fi";
import { IAvailableNote } from "../react";

const iconPadding = 5;
const iconSize = 16;
export interface MenuComponentProps {
  notes: IAvailableNote[];
  onNoteSelect: (note: IAvailableNote) => void;
  defaultPath: string;
  onPathUpdated: (newPath: string) => void;
}

const Menu = styled.div`
  padding: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.05);
`;

const ListIconContainer = styled.div`
  line-height: 0;
  font-size: ${iconSize}px;
  padding: ${iconPadding}px;
`;

const StyledFiList = styled(FiList)`
  flex-shrink: 0;
  transition: transform 0.5s, color 0.3s ease-in-out;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #34a852;
  }
`;

const MenuIconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MenuComponent = ({
  notes,
  onPathUpdated,
  onNoteSelect,
  defaultPath,
}: MenuComponentProps) => {
  const [showList, setShowList] = React.useState(false);
  const handleNoteSelect = (note: IAvailableNote) => {
    setShowList(false);
    onNoteSelect(note);
  };
  return (
    <Menu>
      <ListComponent
        notes={notes}
        isExpanded={showList}
        onNoteSelect={handleNoteSelect}
      />
      <MenuIconsContainer>
        <ListIconContainer onClick={() => setShowList(!showList)}>
          <StyledFiList />
        </ListIconContainer>
        <SettingsComponent
          onPathUpdated={onPathUpdated}
          defaultPath={defaultPath}
        />
      </MenuIconsContainer>
    </Menu>
  );
};

export default MenuComponent;
