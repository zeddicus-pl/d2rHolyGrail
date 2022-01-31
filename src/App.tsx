import { GlobalStyle } from './styles/GlobalStyle'

import { Greetings } from './components/Greetings'
import { List } from './components/List'

import { useState } from 'react';
import { ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material';
import { ItemsInSaves } from './@types/main';

export function App() {
  const [items, setItems] = useState<ItemsInSaves | null>(null);
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={createTheme({palette: { mode: 'dark' }})}>
        <>
          <Greetings onItemsLoaded={(items) => {
            setItems(items);
          }} />
          <List items={items} />
        </>
      </ThemeProvider>
    </>
  )
}