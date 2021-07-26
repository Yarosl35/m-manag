/* eslint-disable camelcase */
import {
  ApolloProvider,
} from '@apollo/client';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import './index.css';
import { reportWebVitals } from './reportWebVitals';
import { client } from './services/apolloService';

const theme = unstable_createMuiStrictModeTheme();

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ApolloProvider
        client={client}
      >
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root'),
);
reportWebVitals();
