import { GlobalStyle } from './styles/GlobalStyle'

import { Greetings } from './components/Greetings'
import { List } from './components/List'

import { useState, useEffect, MouseEventHandler } from 'react';
import { ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material';
import { FileReaderResponse, Settings } from './@types/main';

/* eslint-disable no-unused-vars */
export enum UiState {
  Greetings,
  List,
  Settings,
}
/* eslint-enable no-unused-vars */

export function App() {
  const [fileReaderResponse, setFileReaderResponse] = useState<FileReaderResponse | null>(null);

  const [appSettings, setAppSettings] = useState<Settings>({
    saveDir: '',
    lang: '',
  });

  useEffect(() => {
    window.Main.on('updatedSettings', (settings: Settings) => {
      setAppSettings(settings);
    });

    const auxclickHandler: MouseEventHandler<HTMLAnchorElement> = (event) => {
      const target = event.currentTarget
      if ( target && target.localName === 'a') {
          event.preventDefault();
          window.Main.openUrl(target.href);
      }
    }
    // @ts-ignore
    document.addEventListener('auxclick', auxclickHandler, false);
  }, [])

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
            appSettings={appSettings}
          />
        </>
      </ThemeProvider>
    </>
  )
}