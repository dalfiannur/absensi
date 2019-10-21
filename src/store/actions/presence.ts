import { User } from 'types/entity';

export const PresenceAction = {
  SET_NIK: 'SET_NIK',
  SET_USER: 'SET_USER',
};

export const setNIK = (payload: string) => ({
  type: PresenceAction.SET_NIK,
  payload,
});

export const setUser = (payload: User) => ({
  type: PresenceAction.SET_USER,
  payload,
});
