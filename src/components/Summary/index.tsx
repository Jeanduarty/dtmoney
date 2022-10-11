import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";

import { useTransaction } from "../../hooks/useTransactions";
import { NumberFormatBRL } from "../../services/NumberFormatBRL";

import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransaction();

  const incomingAmount = transactions
    .filter((transaction) => transaction.type === "deposit")
    .reduce((incomingAmount, c) => (incomingAmount += c.amount), 0);

  const outcomeAmount = transactions
    .filter((transaction) => transaction.type === "withdraw")
    .reduce((incomingAmount, c) => (incomingAmount += c.amount), 0);

  const totalAmount = incomingAmount - outcomeAmount;

  return (
    <Container
      highlightBackground={
        totalAmount === 0 ? "#33b7cc" : totalAmount > 0 ? "#33cc95" : "#e52e4d"
      }
    >
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>{NumberFormatBRL(incomingAmount)}</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong> -{NumberFormatBRL(outcomeAmount)}</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>{NumberFormatBRL(totalAmount)}</strong>
      </div>
    </Container>
  );
}
