import { createContext } from "react";

export type UserInfo = {
  username?: string
  email?: string
}

type ContextType = {
  userInfo?: UserInfo
  setUserInfo?: (userInfo: UserInfo) => void
}

export default createContext<ContextType>({});