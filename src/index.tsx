import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import App from './root';
import {BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {LOCALSTORAGE_KEYS} from 'src/constants';
import {cache} from 'src/operations/cached';

const httpLink = createHttpLink({
  uri: 'https://graphqlzero.almansi.me/api',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(LOCALSTORAGE_KEYS.TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
