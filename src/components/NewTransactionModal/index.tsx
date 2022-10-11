import { FormEvent, useState } from "react";

import Modal from "react-modal";

import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useModal } from "../../hooks/useModal";

import { useTransaction } from "../../hooks/useTransactions";

import { Container, TransactionTypeContainer, RadioBox } from "./styles";

export function NewTransactionModal() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"deposit" | "withdraw">("deposit");

  const { CreateNewTransactionModal } = useTransaction();
  const { isNewTransactionModalOpen, CloseNewTransactionModal } = useModal();

  function handleCreateNewTransactionModal(event: FormEvent) {
    event.preventDefault();

    const data = {
      title,
      amount,
      type,
      category,
      createdAt: new Date(),
    };

    CreateNewTransactionModal(data);
    setDefaultValue();
    CloseNewTransactionModal();
  }

  function setDefaultValue() {
    setTitle("");
    setType("deposit");
    setAmount(0);
    setCategory("");
  }

  return (
    <Modal
      isOpen={isNewTransactionModalOpen}
      onRequestClose={CloseNewTransactionModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      onAfterClose={setDefaultValue}
    >
      <button onClick={CloseNewTransactionModal} className="react-modal-close">
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransactionModal}>
        <h2>Cadastrar transação</h2>

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <input
          min={0}
          placeholder="Valor"
          type="number"
          onChange={(event) => setAmount(Number(event.target.value))}
          required
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive={type === "deposit"}
            activeColor="green"
            onClick={() => {
              setType("deposit");
            }}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            isActive={type === "withdraw"}
            activeColor="red"
            onClick={() => {
              setType("withdraw");
            }}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          required
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
