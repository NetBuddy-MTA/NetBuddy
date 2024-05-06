import {createContext} from "react";

export type SideDrawerControls = {
  isOpen: boolean
}

type ContextType = {
  sideDrawerControls?: SideDrawerControls
  setSideDrawerControls?: (sideDrawerControl: SideDrawerControls) => void
}

export default createContext<ContextType>({});