import { PresenceTypeState, PresenceType } from "store/presence-type/types";

export interface PresenceProps {
  PresenceType: PresenceTypeState,
  setPresenceTypes: (types: PresenceType[]) => void
}

export interface PresenceCount {
  name: string,
  count: number
}