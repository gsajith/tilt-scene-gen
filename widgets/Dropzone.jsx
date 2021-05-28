import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const DropContainer = styled.div`
  position: absolute;
  bottom: 16px;
  color: ${(props) =>
    props.isReject ? "red" : props.isAccept ? "green" : "blue"};
  padding: 16px 32px;
  background: #f2f2f9;
  border-radius: 16px;
  border: 4px dashed
    ${(props) => (props.isReject ? "red" : props.isAccept ? "green" : "blue")};
  opacity: ${(props) => (props.isActive ? 1 : 0.2)};
  transition: all 300ms ease-in-out;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const Dropzone = ({ setAddedImages }) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
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
          })
        );
        const updatedImages = addedImages.concat(newAddedImages);
        return updatedImages;
      });
    },
  });

  return (
    <>
      <DropContainer
        isActive={isDragActive}
        isAccept={isDragAccept}
        isReject={isDragReject}
        {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </DropContainer>
    </>
  );
};

export default Dropzone;
