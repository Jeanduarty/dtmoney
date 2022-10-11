import { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextData {
  isNewTransactionModalOpen: boolean;
  OpenNewTransactionModal: () => void;
  CloseNewTransactionModal: () => void;
  isEditTransactionModalOpen: boolean;
  OpenEditTransactionModal: () => void;
  CloseEditTransactionModal: () => void;
}

interface ModalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps) {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] =
    useState(false);

  function OpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function CloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  function OpenEditTransactionModal() {
    setIsEditTransactionModalOpen(true);
  }

  function CloseEditTransactionModal() {
    setIsEditTransactionModalOpen(false);
  }

  return (
    <ModalContext.Provider
      value={{
        isNewTransactionModalOpen,
        OpenNewTransactionModal,
        CloseNewTransactionModal,
        isEditTransactionModalOpen,
        OpenEditTransactionModal,
        CloseEditTransactionModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal(): ModalContextData {
  const context = useContext(ModalContext);

  return context;
}
