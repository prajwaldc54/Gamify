import React from 'react';
import './assets/css/App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './themes/theme';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import RouteList from './routes/RouteList';
import ErrorBoundaries from 'ErrorHandling/ErrorBoundaries';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundaries>
        <BrowserRouter>
          <div className="App">
            <RouteList />
          </div>
        </BrowserRouter>
      </ErrorBoundaries>
    </ChakraProvider>
  );
}

export default App;
