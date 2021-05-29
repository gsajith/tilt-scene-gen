import styled from "styled-components";

const ParallaxImage = styled.img`
  pointer-events: none;
  position: absolute;
  top: ${(props) => (props.top ? props.top : 50)}%;
  left: ${(props) => (props.left ? props.left : 50)}%;
  transform: translate(-50%, -50%)
    translateZ(${(props) => (props.translateZ ? props.translateZ : 0)}px)
    ${(props) => (props.scale ? "scale(" + props.scale + ")" : "")};
`;

export default ParallaxImage;
