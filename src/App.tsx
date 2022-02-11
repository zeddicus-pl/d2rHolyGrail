import { GlobalStyle } from './styles/GlobalStyle'

import { Greetings } from './components/Greetings'
import { List } from './components/List'

import { useState } from 'react';
import { ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material';
import { FileReaderResponse } from './@types/main';

/* eslint-disable no-unused-vars */
export enum UiState {
  Greetings,
  List,
  Settings,
}
/* eslint-enable no-unused-vars */

export function App() {
  const [fileReaderResponse, setFileReaderResponse] = useState<FileReaderResponse | null>(null);
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={createTheme({palette: { mode: 'dark' }})}>
        <>
          <Greetings
            onItemsLoaded={(fileReaderResponse) => {
              setFileReaderResponse(fileReaderResponse);
            }}
          />
          <List
            fileReaderResponse={fileReaderResponse}
          />
        </>
      </ThemeProvider>
    </>
  )
}