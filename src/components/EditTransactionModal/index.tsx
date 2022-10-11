import { useEffect, useState } from "react";

import Modal from "react-modal";

import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useModal } from "../../hooks/useModal";

import { useTransaction } from "../../hooks/useTransactions";
import { Input } from "../Input";

import { Container, TransactionTypeContainer, RadioBox } from "./styles";

interface EditProps {
  title: string;
  amount: number;
  category: string;
  type: "deposit" | "withdraw";
}

export function EditTransactionModal() {
  const { transactionToBeEditedRef, EditTransaction } = useTransaction();
  const { CloseEditTransactionModal, isEditTransactionModalOpen } = useModal();

  const [type, setType] = useState<"deposit" | "withdraw">(
    transactionToBeEditedRef.current.type
  );

  useEffect(() => {
    setType(transactionToBeEditedRef.current.type);
  }, [isEditTransactionModalOpen]);

  function handleSubmitEditTransactionModal(response: EditProps) {
    const { amount, category, title } = response;

    const data = {
      id: transactionToBeEditedRef.current.id,
      title,
      amount: Number(amount),
      category,
      type,
      createdAt: new Date(),
    };
    EditTransaction(data);
    CloseEditTransactionModal();
  }

  return (
    <Modal
      isOpen={isEditTransactionModalOpen}
      onRequestClose={CloseEditTransactionModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button onClick={CloseEditTransactionModal} className="react-modal-close">
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container
        onSubmit={handleSubmitEditTransactionModal}
        initialData={transactionToBeEditedRef.current}
      >
        <h2>Editar transação</h2>

        <Input name="title" type="text" placeholder="Título" required />

        <Input
          name="amount"
          min={0}
          placeholder="Valor"
          type="number"
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

        <Input name="category" placeholder="Categoria" required />

        <button type="submit">Editar</button>
      </Container>
    </Modal>
  );
}
