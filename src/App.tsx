import Modal from "react-modal";

import { Toaster } from "react-hot-toast";

import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";
import { GlobalStyle } from "./styles/global";
import { EditTransactionModal } from "./components/EditTransactionModal";
import { ModalProvider } from "./hooks/useModal";

Modal.setAppElement("#root");

export function App() {
  return (
    <TransactionsProvider>
      <ModalProvider>
        <Header />

        <Dashboard />

        <NewTransactionModal />
        <EditTransactionModal />
      </ModalProvider>
      
      <GlobalStyle />
      <Toaster position="top-center" />
    </TransactionsProvider>
  );
}
