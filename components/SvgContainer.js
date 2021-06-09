import styled from "styled-components";

const SvgContainer = styled.div`
  position: absolute;
  pointer-events: none;

  width: 100%;
  height: 100%;

  top: ${(props) => (props.top !== null ? props.top : 50)}%;
  left: ${(props) => (props.left !== null ? props.left : 50)}%;
  transform: translateZ(
      ${(props) => (props.translateZ ? props.translateZ : 0)}px
    )
    ${(props) => (props.scale ? "scale(" + props.scale + ")" : "")};
`;

export default SvgContainer;
