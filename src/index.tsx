import {
  ApolloProvider,
} from '@apollo/client';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import client from './services/apolloService';

ReactDOM.render(
  <StrictMode>
    <ApolloProvider
      client={client}
    >
      <App />
    </ApolloProvider>

  </StrictMode>,
  document.getElementById('root'),
);
reportWebVitals();
