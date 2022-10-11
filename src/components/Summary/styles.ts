import styled from "styled-components";

interface TotalProps {
  highlightBackground: "#e52e4d" | "#33cc95" | "#33b7cc";
}

export const Container = styled.div<TotalProps>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -10rem;

  div {
    background: var(--shape);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: var(--text-title);

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
    }

    &.highlight-background {
      color: #fff;
      background: ${(props) => props.highlightBackground};
    }
  }
`;
