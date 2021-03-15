import { createContext, useReducer, Dispatch } from "react";
import { Imedia } from '../models/media.model';
import { MediaActions, mediaReducer } from "../reducers/mediaReducer"


type InitialStateType = {
  mediaList: Imedia[];
};

const initialState = {
  mediaList: []
};

const MediaContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<MediaActions>;
}>({
  state: initialState,
  dispatch: () => null
});

const mainReducer = (
  { mediaList }: InitialStateType,
  action: MediaActions 
) => ({
  mediaList: mediaReducer(mediaList, action)
});

const MediaProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <MediaContext.Provider value={{ state, dispatch }}>
      {children}
    </MediaContext.Provider>
  );
};


export { MediaContext , MediaProvider } 
