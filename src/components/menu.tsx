import * as React from 'react';
import styled from 'styled-components';
import { FiList, FiPlus, FiActivity } from 'react-icons/fi';
import ListComponent from './list';
import { IAvailableNote } from '../react';

import SettingsComponent from './settings';

const iconPadding = 5;
const iconSize = 16;
export interface MenuComponentProps {
  notes: IAvailableNote[];
  onNoteSelect: (note: IAvailableNote) => void;
  defaultPath: string;
  onPathUpdated: (newPath: string) => void;
  onNewNote: () => void;
}

const Menu = styled.div`
  padding: 5px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.05);
`;

const IconContainer = styled.div`
  flex-shrink: 0;
  line-height: 0;
  font-size: ${iconSize}px;
  & > svg {
    margin: ${iconPadding}px;
  }
`;

const StyledFiList = styled(FiList)`
  transition: transform 0.5s, color 0.3s ease-in-out;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #34a852;
  }
`;
const StyledFiPlus = styled(FiPlus)`
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
  onNewNote,
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
        <IconContainer>
          <StyledFiPlus onClick={onNewNote} />
          <StyledFiList onClick={() => setShowList(!showList)} />
        </IconContainer>
        <SettingsComponent
          onPathUpdated={onPathUpdated}
          defaultPath={defaultPath}
        />
      </MenuIconsContainer>
    </Menu>
  );
};

export default MenuComponent;
