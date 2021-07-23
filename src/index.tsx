import {
  ApolloProvider,
} from '@apollo/client';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import client from './services/apolloService';

ReactDOM.render(
  <ApolloProvider
    client={client}
  >
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
reportWebVitals();
