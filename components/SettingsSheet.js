import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
`;

const SettingsContainer = styled.div`
  position: absolute;
  width: 90vw;
  max-width: 450px;
  background: white;
  border-radius: 32px 32px 0px 0px;
  z-index: 4;
  bottom: 0;
  padding: 24px;
`;

const SettingsSheet = ({ closeSettings }) => {
  return (
    <>
      <Overlay onClick={closeSettings} />
      <SettingsContainer>Hi</SettingsContainer>
    </>
  );
};

export default SettingsSheet;
