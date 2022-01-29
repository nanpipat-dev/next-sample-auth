import { ProfileGlobal } from '@/models/auth-service.model'
import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'

type ContextType = {
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>
  isAuth: boolean,
  setIsAuth: Dispatch<SetStateAction<boolean>>
  member: ProfileGlobal,
  setMember: Dispatch<SetStateAction<ProfileGlobal>>
}

const memberDefault: ProfileGlobal = {
  memberId: '',
  firstName: '',
  lastName: '',
  username: '',
}

const globalContextType: ContextType = {
  loading: false,
  setLoading: null,
  isAuth: false,
  setIsAuth: null,
  member: memberDefault,
  setMember: null,
}

const GlobalContext = createContext(globalContextType)



export const GlobalProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [verifyPin, setVerifyPin] = useState(false)
  const [changePassword, setChangepassword] = useState(false)
  const [member, setMember] = useState<ProfileGlobal>(memberDefault)
  const [updateMember, setUpdateMember] = useState(false)
  const value: ContextType = { loading, setLoading, isAuth, setIsAuth, member, setMember }
  return (
    <GlobalContext.Provider value={value}>{ children }</GlobalContext.Provider>
  )
}

export const useGlobal = (): ContextType => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error('GlobalContext errors')
  }
  return context
}