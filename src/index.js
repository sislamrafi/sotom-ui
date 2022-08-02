import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import DebuggerLayout from 'layouts/debugger';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import Peripherals from 'views/debugger/peripherals';

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <HashRouter>
        <Switch>
          <Route path={`/debugger`} component={DebuggerLayout} />
          <Route path={`/debugger/peripherals`} component={Peripherals} />
          <Redirect from='/' exact to='/debugger/dashboard' />
        </Switch>
      </HashRouter>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);
