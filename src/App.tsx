import React from "react";
import  {MediaProvider} from "./context/media-context"
import MediaList from "./components/MediaList";
import NewMedia from "./components/NewMedia"

const App: React.FC = () => {
  return (
    <MediaProvider>
      <NewMedia />
      <MediaList />
    </MediaProvider>
  );
};

export default App;
