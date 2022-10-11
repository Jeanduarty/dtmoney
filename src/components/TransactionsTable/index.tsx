import { Transaction, useTransaction } from "../../hooks/useTransactions";
import { useModal } from "../../hooks/useModal";

import { NumberFormatBRL } from "../../services/NumberFormatBRL";

import { FiTrash, FiEdit } from "react-icons/fi";

import { Container } from "./styles";

export function TransactionsTable() {
  const { transactions, DeleteTransaction, SetTransactionToBeEdited } =
    useTransaction();
  const { OpenEditTransactionModal } = useModal();

  const descendingTransaction = [...transactions].reverse();

  function handleRemoveTransaction(transactionId: number) {
    DeleteTransaction(transactionId);
  }

  function handleEditTransaction(transaction: Transaction) {
    OpenEditTransactionModal();
    SetTransactionToBeEdited(transaction);
  }

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {descendingTransaction.map((transaction) => (
            <tr key={transaction.id}>
              <td
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "345px",
                }}
              >
                {transaction.title}
              </td>
              <td className={transaction.type}>
                {NumberFormatBRL(transaction.amount)}
              </td>
              <td
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "240px",
                }}
              >
                {transaction.category}
              </td>
              <td style={{ maxWidth: "100px" }}>
                {new Intl.DateTimeFormat("pt-BR").format(
                  new Date(transaction.createdAt)
                )}
              </td>
              <td className="td-icons">
                <FiEdit
                  size={25}
                  onClick={() => handleEditTransaction(transaction)}
                />
                <FiTrash
                  size={25}
                  onClick={() => handleRemoveTransaction(transaction.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
