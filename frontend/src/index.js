import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { StoreContextProvider } from './Context/StoreContext';
import { Provider } from 'react-redux';
import { persistor, store } from './Store/Store';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from './Components/Loader';
import LoaderScreen from './Components/LoaderScreen';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreContextProvider>
    <Provider store={store}>
      <PersistGate loading={<LoaderScreen/>} persistor={persistor}>
       <CookiesProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CookiesProvider>
      </PersistGate>
    </Provider>
  </StoreContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
