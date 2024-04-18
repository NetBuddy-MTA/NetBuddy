import { createContext } from "react";

export type UserInfo = {
  username?: string
  email?: string
  expires?: Date
}

type ContextType = {
  userInfo?: UserInfo
  setUserInfo?: (userInfo: UserInfo) => void
}

export default createContext<ContextType>({});