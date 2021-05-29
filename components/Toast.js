import styled from "styled-components";

const Toast = styled.div`
  width: 90vw;
  max-width: 500px;
  position: absolute;
  bottom: ${(props) => (props.shown ? 20 : -100)}px;
  background: black;
  border-radius: 16px;
  color: white;
  padding: 8px 16px;
  transition: bottom 300ms ease-in-out;
`;

export default Toast;
