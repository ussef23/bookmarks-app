import { Imedia } from "../models/media.model";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? {
    type: Key;
  }
  : {
    type: Key;
    payload: M[Key];
  }
};

export enum Types {
  Add = "ADD_NEW_MEDIA",
  Delete = "DELETE_MEDIA",
  Edit = "EDIT_MEDIA"
}

type MediaPayload = {
  [Types.Add]: Imedia;
  [Types.Delete]: { id: string };
  [Types.Edit]: { update: Imedia }
};

export type MediaActions = ActionMap<MediaPayload>[keyof ActionMap<MediaPayload>];

export const mediaReducer = (
  state: Imedia[],
  action: MediaActions
) => {
  switch (action.type) {
    case Types.Add:
      console.log('action', action)
      return [
        action.payload,
        ...state
      ];
    case Types.Delete:
      return [...state.filter(media => media.id !== action.payload.id)];
    case Types.Edit:
      const update = action.payload.update
      const objIndex = state.findIndex((obj => obj.id === update.id));
      state[objIndex] = {
        ...state[objIndex],
        ...update
      }
      return [...state]
    default:
      return state;
  }
};