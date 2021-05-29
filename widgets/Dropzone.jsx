import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Toast from "../components/Toast";
import { uuidv4 } from "../utils";

const DropContainer = styled.div`
  position: absolute;
  bottom: 16px;
  color: ${(props) =>
    props.isReject ? "#db4458" : props.isAccept ? "#5fd47c" : "black"};
  padding: 16px 32px;
  background: ${(props) =>
    props.isReject ? "#fae6e9" : props.isAccept ? "#e1fae7" : "#f2f2f2"};
  border-radius: 16px;
  border: 1px dashed
    ${(props) =>
      props.isReject ? "#db4458" : props.isAccept ? "#5fd47c" : "black"};
  opacity: ${(props) => (props.isActive ? 1 : 0.2)};
  transition: all 300ms ease-in-out;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

export const DEFAULT_SETTINGS = {
  x: "50",
  y: "50",
  z: "-10",
  scale: "0.3",
};

const Dropzone = ({ setAddedImages }) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept:
      "image/jpeg, image/jpg, image/png, image/gif, image/svg+xml, image/webp",
    onDrop: (acceptedFiles) => {
      setAddedImages((addedImages) => {
        // const newAddedImages = [...addedImages];
        // acceptedFiles.forEach((file) => {
        //   newAddedImages.push(URL.createObjectURL(file));
        // });
        // return newAddedImages;
        const newAddedImages = acceptedFiles.map((file) =>
          Object.assign(file, {
            url: URL.createObjectURL(file),
            settings: { ...DEFAULT_SETTINGS },
            key: uuidv4(),
          })
        );
        const updatedImages = addedImages.concat(newAddedImages);
        return updatedImages;
      });
    },
    onDropRejected: (fileRejections) => {
      setError(
        fileRejections
          ? fileRejections[0].errors
            ? fileRejections[0].errors[0].message
            : "File upload error"
          : "File upload error"
      );
      setTimeout(() => setError(null), 3300);
      setTimeout(() => setErrorShown(false), 3000);
      setErrorShown(true);
    },
  });

  const [error, setError] = useState(null);
  const [errorShown, setErrorShown] = useState(false);

  return (
    <>
      <DropContainer
        isActive={isDragActive}
        isAccept={isDragAccept}
        isReject={isDragReject}
        {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p style={{ textAlign: "center" }}>
          Drag 'n' drop some images here, or click to pick files
        </p>
      </DropContainer>
      <Toast shown={errorShown}>{error}</Toast>
    </>
  );
};

export default Dropzone;
