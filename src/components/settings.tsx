import * as React from "react";
import styled from "styled-components";
import { FiSettings } from "react-icons/fi";
export interface SettingsComponentProps {
  onPathUpdated: (newPath: string) => void;
}

const iconPadding = 5;
const iconSize = 16;

const SettingsContainer = styled.div`
  display: flex;
  align-items: center;

  line-height: 0;
  font-size: ${iconSize}px;

  padding: ${iconPadding}px;
  border-radius: ${iconSize}px;
  width: ${iconPadding * 2 + iconSize}px;
  overflow: hidden;

  transition: background 0.1s linear 0.3s, width 0.3s ease-in-out;

  & > svg:hover {
    color: #34a852;
    cursor: pointer;
  }

  ${(props: { isActive: boolean }) => {
    return (
      props.isActive &&
      `
        background: #fff;
        width: 100%;
        transition: background .1s linear 0s, width .3s ease-in-out;

        svg {
          color: rgba(0,0,0,.4);
          transform: rotate(360deg);
        }
      `
    );
  }}
`;

const PathInput = styled.input`
  padding-left: ${iconPadding}px;
  flex-grow: 1;
  flex-shrink: 1;
  background: transparent;
  width: ${(props: { isActive: boolean }) => {
    return props.isActive ? "auto" : "0";
  }};
`;

const StyledFiSettings = styled(FiSettings)`
  flex-shrink: 0;
  transition: transform 0.5s, color 0.3s ease-in-out;
`;

const SettingsComponent = (props: SettingsComponentProps) => {
  const { onPathUpdated } = props;
  const [isActive, setIsActive] = React.useState(false);

  const inputRef: React.RefObject<HTMLInputElement> = React.createRef();

  const handleKeypressInInput = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      setIsActive(false);
      onPathUpdated(inputRef?.current?.value);
    }
  };

  const handleSettingsClick = (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    if (!isActive) inputRef?.current?.focus();
    else onPathUpdated(inputRef?.current?.value);
    setIsActive(!isActive);
  };

  return (
    <SettingsContainer isActive={isActive}>
      <StyledFiSettings onClick={handleSettingsClick} />
      <PathInput
        type="text"
        placeholder="Notes folder path"
        onKeyPress={handleKeypressInInput}
        ref={inputRef}
        isActive={isActive}
      />
    </SettingsContainer>
  );
};

export default SettingsComponent;
