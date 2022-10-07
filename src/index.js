import React from 'react';
import { enableAllPlugins } from 'immer';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/AuthContext';
import store from './redux/store';
import { Provider } from 'react-redux';

import { orange, red } from "@mui/material/colors"

import { ThemeProvider, createTheme } from "@mui/material"

enableAllPlugins();

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  palette: {
    primary: {
      main: "#CCC"
    },
    secondary: {
      main: orange[500]
    },
    myCustomColor: {
      main: red[400],
      superDark: red[800],
      superLight: red[100]
    }
  },
  typography: {
    myVariant: {
      fontSize: "2.5rem",
      color: orange[500]
    }
  }
})

root.render(

   <Provider store={store}>

    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AuthContextProvider>
    
  </Provider> 

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
