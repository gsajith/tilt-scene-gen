import React from "react";
import styled from "styled-components";
import Slider from "../components/Slider";
import { Label } from "./ImageSettings";

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

const Warning = styled.div`
  color: #ff3366;
  font-size: 12px;
  letter-spacing: 1px;
`;

const SettingsSheet = ({
  closeSettings,
  mattingWidth,
  setMattingWidth,
  perspective,
  setPerspective,
  tiltAngle,
  setTiltAngle,
}) => {
  return (
    <>
      <Overlay onClick={closeSettings} />
      <SettingsContainer>
        <Label for="perspective">
          <div>Perspective</div>
          <div>{perspective}</div>
        </Label>
        <Slider
          min={1}
          max={2000}
          id="perspective"
          value={perspective}
          onChange={(newPerspective) => {
            setPerspective(newPerspective);
          }}
        />
        {perspective < 300 && (
          <Warning>This is sort of wacky, shouldn't it be higher?</Warning>
        )}

        <Label for="titlAngle">
          <div>Tilt Angle</div>
          <div>{tiltAngle}</div>
        </Label>
        <Slider
          min={-90}
          max={90}
          step={1}
          id="tiltAngle"
          value={tiltAngle}
          onChange={(newTiltAngle) => {
            setTiltAngle(newTiltAngle);
          }}
        />

        <Label for="mattingWidth">
          <div>Matting width</div>
          <div>{mattingWidth}</div>
        </Label>
        <Slider
          min={0}
          max={3000}
          id="mattingWidth"
          value={mattingWidth}
          onChange={(newMattingWidth) => {
            setMattingWidth(newMattingWidth);
          }}
        />
        {mattingWidth > 2500 && (
          <Warning>This can cause lag. Maybe don't make it so big.</Warning>
        )}
      </SettingsContainer>
    </>
  );
};

export default SettingsSheet;
