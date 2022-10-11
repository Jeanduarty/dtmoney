import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { api } from "../services/api";

import toast from "react-hot-toast";

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  transactionToBeEditedRef: any;
  CreateNewTransactionModal: (
    transaction: CreateNewTransactionModalProps
  ) => void;
  DeleteTransaction: (transactionId: number) => void;
  EditTransaction: (transaction: Transaction) => void;
  SetTransactionToBeEdited: (transaction: Transaction) => void;
}

export interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: "deposit" | "withdraw";
  category: string;
  createdAt: Date;
}

type CreateNewTransactionModalProps = Omit<Transaction, "id">;

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const transactionToBeEditedRef = useRef<Transaction>({} as Transaction);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const response = await api.get("/transactions");
        setTransactions(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadTransactions();
  }, []);

  async function CreateNewTransactionModal(
    transaction: CreateNewTransactionModalProps
  ) {
    const toastId = toast.loading("Loading...");
    try {
      const response = await api.post("/transactions", {
        ...transaction,
      });
      setTransactions([...transactions, response.data]);
      toast.success("Transação cadastrada!");
      return true;
    } catch (error) {
      toast.error("Falha ao cadastrar transação!");
      return false;
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function DeleteTransaction(transactionId: number) {
    const toastId = toast.loading("Loading...");
    try {
      await api.delete(`/transactions/${transactionId}`);

      const filteredTransactions = transactions.filter(
        (transaction) => transaction.id !== transactionId
      );
      setTransactions(filteredTransactions);

      toast.success("Transação excluida!");
    } catch (error) {
      toast.error("Erro ao excluir transação!");
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function EditTransaction(transaction: Transaction) {
    const toastId = toast.loading("Loading...");
    try {
      const editedTransaction = await api.put(
        `/transactions/${transaction.id}`,
        {
          ...transaction,
        }
      );

      const updatedTransactions = transactions.map((transaction) =>
        transaction.id === editedTransaction.data.id
          ? editedTransaction.data
          : transaction
      );
      setTransactions(updatedTransactions);
      toast.success("Transação editada com sucesso!");
    } catch (error) {
      toast.error("Erro ao editar transação!");
    } finally {
      toast.dismiss(toastId);
    }
  }

  function SetTransactionToBeEdited(transaction: Transaction) {
    transactionToBeEditedRef.current = transaction;
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        transactionToBeEditedRef,
        CreateNewTransactionModal,
        DeleteTransaction,
        EditTransaction,
        SetTransactionToBeEdited,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransaction(): TransactionsContextData {
  const context = useContext(TransactionsContext);

  return context;
}
