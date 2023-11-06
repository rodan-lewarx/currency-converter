import { styled } from "styled-components";

export const Button = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
  background-color: #b0b0b0;
  cursor: pointer;
  transition: border-color 0.25s;
}
&:hover {
  border-color: #646cff;
}
&:focus,
&:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
`;
