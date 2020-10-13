import React, {useEffect, useReducer} from 'react';
import './App.css';
import {rootReducer} from "./reducers/rootReducer";
import {setInitial} from "./actions/actions";
import {Content} from "./components/Content";

export const RootContext = React.createContext();

function App() {
  const [rootState, rootStateDispatch] =  useReducer(rootReducer, {contentReactions : [], users : [], supportedReactions : []});

  useEffect( ()=>{
    setInitial().then((resp)=> {
      rootStateDispatch(resp)
    });
  },[]);

  return (
    <div className="App">
      <RootContext.Provider value={{rootState, rootStateDispatch}}>
        {rootState.contentReactions.length ? <Content /> : ""}
      </RootContext.Provider>
    </div>
  );
}

export default App;
