import React from "react";
import { isMobile } from "react-device-detect";
import styled from "styled-components";

const PreviewsContainer = styled.div`
  opacity: ${(props) => (props.fade ? 0.15 : 1)};
  width: 100%;
  max-width: 100%;
  z-index: 1;
  padding: 8px 0px;
  overflow-x: scroll;
  white-space: nowrap;
  min-height: 96px;
  transition: opacity 150ms ease-in-out;
`;

const PreviewContainer = styled.button`
  border: ${(props) =>
    props.selected ? "1px solid black" : "1px solid rgba(0, 0, 0, 0.3)"};
  box-shadow: ${(props) => (props.selected ? "2px 2px 0px black" : "none")};
  padding: 4px;
  width: 80px;
  height: 80px;
  margin-right: 8px;
  display: inline-block;
  cursor: pointer;
  background: none;
  outline: none;
  position: relative;
  transition: background 150ms ease-in-out;
  > button {
    display: none;
  }
  ${(props) =>
    !props.isMobile &&
    `&:hover {
      background: rgba(0, 0, 0, 0.1);
      > button {
        display: initial !important;
      }
    }
    &:focus {
      background: rgba(0, 0, 0, 0.1);
    }`}
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
`;

const CloseButton = styled.button`
  border: 1px solid black;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  cursor: pointer;
  position: absolute;
  padding: 0px;
  top: -4px;
  right: -16px;
  background: #f3f3f3;
  transition: background 150ms ease-in-out;
  &:hover {
    background: #ccc;
  }
`;

const ImagePreviews = ({
  images,
  selectedImage,
  setSelectedImage,
  setImages,
  fade,
}) => {
  return (
    <PreviewsContainer fade={fade}>
      {images.map((image, index) => (
        <PreviewContainer
          key={image.key + "-preview"}
          isMobile={isMobile}
          selected={selectedImage === index}
          onClick={(e) => {
            e.stopPropagation();
            if (selectedImage === index) {
              setSelectedImage(null);
              document.activeElement.blur();
            } else {
              setSelectedImage(index);
            }
          }}>
          <PreviewImage src={image.url} />
          <CloseButton
            style={{ display: selectedImage === index ? "initial" : "none" }}
            onClick={() => {
              setImages((images) => {
                const newImages = [...images];
                newImages.splice(index, 1);
                return newImages;
              });
            }}>
            X
          </CloseButton>
        </PreviewContainer>
      ))}
    </PreviewsContainer>
  );
};

export default ImagePreviews;
