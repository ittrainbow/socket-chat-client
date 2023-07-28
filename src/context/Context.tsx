import { useState, useContext, createContext, Dispatch, SetStateAction } from 'react'

type ContextChildren = {
  children: React.ReactNode
}

type NameType = string | null

type ContextType = {
  name: NameType
  setName: Dispatch<SetStateAction<NameType>>
}

export const Context = createContext<ContextType>({} as ContextType)

export const useAppContext = () => useContext(Context)

export const ContextProvider = ({ children }: ContextChildren) => {
  const [name, setName] = useState<null | string>(null)

  return (
    <Context.Provider
      value={{
        name,
        setName
      }}
    >
      {children}
    </Context.Provider>
  )
}
