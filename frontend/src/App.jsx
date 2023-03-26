import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import questTheme from 'src/MyDesignSystemLightTheme';
import MainPage from 'src/components/MainPage/MainPage';
import Component4 from 'src/components/Component4/Component4';
import Component7 from 'src/components/Component7/Component7';
import TransactionSuccessful from 'src/components/TransactionSuccessful/TransactionSuccessful';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={questTheme}>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Component4 />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Component7 />} />
        </Routes>
        <Routes>
          <Route path="/" element={<TransactionSuccessful />} />
        </Routes>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
