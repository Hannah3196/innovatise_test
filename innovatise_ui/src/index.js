import React, { Suspense} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import App from './App';
import store, { history } from './redux/store';
import theme from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialStore = {};

ReactDOM.render(
  <Provider store = {store(initialStore)}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false} 
           pauseOnVisibilityChange
           draggable
           pauseOnHover
           />
          <Suspense fallback={<div />}>
            <App history={history}/>
          </Suspense>
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
