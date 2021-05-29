import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "../components/Slider";

const ImageSettingsContainer = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  width: 90vw;
  max-width: 500px;
  background: white;
  border: 1px solid black;
  padding: 16px;
`;

export const Label = styled.label`
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  div:last-child {
    color: #999;
  }
`;
const ImageSettings = ({ images, setImages, selectedImage }) => {
  return (
    <ImageSettingsContainer
      onClick={(e) => {
        e.stopPropagation();
      }}>
      {images &&
        selectedImage !== null &&
        typeof selectedImage !== "undefined" &&
        images.length > selectedImage && (
          <>
            <Label for="xPos">
              <div>X position</div>
              <div>{images[selectedImage].settings.x}</div>
            </Label>
            <Slider
              min={0}
              max={100}
              id="xPos"
              value={images[selectedImage].settings.x}
              onChange={(newX) => {
                let newImages = [...images];
                newImages[selectedImage].settings.x = newX;
                setImages(newImages);
              }}
            />

            <Label for="yPos">
              <div>Y position</div>
              <div>{images[selectedImage].settings.y}</div>
            </Label>
            <Slider
              min={0}
              max={100}
              id="yPos"
              value={images[selectedImage].settings.y}
              onChange={(newY) => {
                let newImages = [...images];
                newImages[selectedImage].settings.y = newY;
                setImages(newImages);
              }}
            />

            <Label for="zPos">
              <div>Z position</div>
              <div>{images[selectedImage].settings.z}</div>
            </Label>
            <Slider
              min={-5000}
              max={500}
              id="zPos"
              value={images[selectedImage].settings.z}
              onChange={(newZ) => {
                let newImages = [...images];
                newImages[selectedImage].settings.z = newZ;
                setImages(newImages);
              }}
            />

            <Label for="scale">
              <div>Scale</div>
              <div>{images[selectedImage].settings.scale}</div>
            </Label>
            <Slider
              min={0.01}
              max={5}
              step={0.01}
              value={images[selectedImage].settings.scale}
              id="scale"
              onChange={(newScale) => {
                let newImages = [...images];
                newImages[selectedImage].settings.scale = newScale;
                setImages(newImages);
              }}
            />
          </>
        )}
    </ImageSettingsContainer>
  );
};

export default ImageSettings;
