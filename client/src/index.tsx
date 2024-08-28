import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './store/store';
import { Provider } from 'react-redux';
import { setupStore } from './store/reduxStore';
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import { styled } from "@mui/material";
const reduxStore = setupStore();


interface State {
  store: Store
}


const store = new Store();

export const Context = createContext<State>({ store })

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <Context.Provider value={{ store }}>
    <Provider store={reduxStore}>
      <SnackbarProvider style={{ background: '#6a1b9a' }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  </Context.Provider>
);

