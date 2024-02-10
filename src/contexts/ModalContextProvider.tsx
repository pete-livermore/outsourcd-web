'use client'
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react'

interface ModalContext {
  modal: ModalData | null
  setModal: Dispatch<SetStateAction<ModalData | null>>
}

export const ModalContext = createContext<ModalContext | null>(null)

interface ModalData {
  type: 'course' | 'calendly' | 'typeform'
}

export function ModalContextProvider({ children }: PropsWithChildren) {
  const [modal, setModal] = useState<ModalData | null>(null)

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  )
}
