import logo from "../../assets/logo.svg";
import { useModal } from "../../hooks/useModal";

import { Container, Content } from "./styles";

export function Header() {
  const { OpenNewTransactionModal } = useModal();

  return (
    <Container>
      <Content>
        <img src={logo} alt="dt money" />
        <button onClick={OpenNewTransactionModal}>Nova transação</button>
      </Content>
    </Container>
  );
}
