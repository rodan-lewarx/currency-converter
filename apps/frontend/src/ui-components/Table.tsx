import { styled } from "styled-components";

export const Table = styled.table`
  border-collapse: collapse;

  td,
  th {
    padding: 0.5rem;
    border: 2px solid #151414;
  }

  tbody tr {
    text-align: right;
  }

  td:nth-child(1),
  td:nth-child(2) {
    text-align: left;
  }
`;
