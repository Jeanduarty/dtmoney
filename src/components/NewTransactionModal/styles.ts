import styled from "styled-components";

export const Container = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;

    border: 1px solid #d7d7d7;
    background: #e7e9ee;

    font-size: 1rem;

    &::placeholder {
      color: var(--text-body);
    }

    & + input {
      margin-top: 1rem;
    }
  }

  button[type="submit"] {
    width: 100%;
    height: 4rem;
    padding: 0 1.5rem;
    margin-top: 1.5rem;
    border-radius: 0.25rem;
    border: 0;

    color: #fff;
    background: var(--green);
    font-size: 1rem;
    font-weight: 600;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const TransactionTypeContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;

interface RadioboxProps {
  isActive: boolean;
  activeColor: "green" | "red";
}

const colors = {
  green: "#c1efdf",
  red: "#f7c0c9",
};

export const RadioBox = styled.button<RadioboxProps>`
  height: 4rem;
  border: 1px solid #d7d7d7;
  border-radius: 0.25rem;

  background: ${(props) => (props.isActive ? colors[props.activeColor] : "")};

  display: flex;
  justify-content: center;
  align-items: center;

  transition: border-color 0.2s;

  &:hover {
    border-color: #a7a7a7;
  }

  img {
    width: 25px;
    height: 25px;
  }

  span {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1rem;
    color: var(--text-title);
  }
`;
