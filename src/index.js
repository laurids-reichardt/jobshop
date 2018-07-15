import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import blueGrey from '@material-ui/core/colors/blueGrey';

const types = {
  dark: {
    type: 'dark',
    background: {
      default: grey[900],
    },
  },
  darkBlue: {
    type: 'dark',
    background: {
      default: blueGrey[900],
    },
  },
};

const theme = createMuiTheme({
  palette: {
    // ...types.dark,
    ...types.darkBlue,
    primary: blue,
  },
  customContainerWidth: '768px',
});

const Root = props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
