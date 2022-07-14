import { GlobalStyle } from './styles/GlobalStyle'

import { Greetings } from './components/Greetings'
import { List } from './components/List'

import { useState, useEffect, MouseEventHandler, useRef, createRef } from 'react';
import { ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material';
import { ToastContainer } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import { FileReaderResponse, GameMode, Settings } from './@types/main.d';
import defaultSettings from './utils/defaultSettings';
import VersionCheck from './components/Settings/VersionCheck';

/* eslint-disable no-unused-vars */
export enum UiState {
  Loading = -1,
  Ready = 0,
  FileDialog = 1,
  Reading = 2,
  List = 3,
}
/* eslint-enable no-unused-vars */

export function App() {
  const [fileReaderResponse, setFileReaderResponse] = useState<FileReaderResponse | null>(null);
  const [uiState, setUiState] = useState(UiState.Loading);
  const appSettings = useRef(defaultSettings);

  const updateSettings = (settings: Settings) => {
    // @ts-ignore
    if (!settings.gameMode || settings.gameMode === '') {
      settings.gameMode = GameMode.Both;
    }
    // @ts-ignore
    if (!settings.saveDir) {
      settings.saveDir = defaultSettings.saveDir;
    }
    if (!settings.magicFind && settings.magicFind !== 0) {
      settings.magicFind = defaultSettings.magicFind;
    }
    if (!settings.playersNumber) {
      settings.playersNumber = defaultSettings.playersNumber;
    }
    if (typeof settings.grailType === 'undefined') {
      settings.grailType = defaultSettings.grailType;
    }
    if (typeof settings.grailRunes === 'undefined') {
      settings.grailRunes = defaultSettings.grailRunes;
    }
    if (typeof settings.grailRunewords === 'undefined') {
      settings.grailRunewords = defaultSettings.grailRunewords;
    }
    if (typeof settings.gameVersion === 'undefined') {
      settings.gameVersion = defaultSettings.gameVersion;
    }
    appSettings.current = settings;
  }

  const saveSetting = <K extends keyof Settings>(setting: K, value: Settings[K]) => {
    window.Main.saveSetting(setting, value);
    appSettings.current[setting] = value;
  }

  const readData = (settings: Settings) => {
    setTimeout(() => {
      if (settings.gameMode === GameMode.Manual) {
        window.Main.loadManualItems();
      } else if (settings.saveDir && settings.saveDir !== '') {
        window.Main.readFilesUponStart();
      } else {
        setUiState(UiState.Ready);
      }
    }, 1);
  }

  const handleFileClick = async () => {
    if (uiState === UiState.Ready) {
      setUiState(UiState.FileDialog);
      window.Main.openFolder();
    }
  }

  const handleManualClick = async () => {
    if (uiState === UiState.Ready) {
      saveSetting('gameMode', GameMode.Manual);
      window.Main.loadManualItems();
    }
  }

  useEffect(() => {
    window.Main.on('updatedSettings', (settings: Settings) => {
      updateSettings(settings);
      readData(settings);
    });
    window.Main.on('noDirectorySelected', () => {
      setUiState(UiState.Ready);
    });
    window.Main.on('openFolderWorking', () => {
      setUiState(UiState.Reading);
    });
    window.Main.on('openFolder', (fileReaderResponse: FileReaderResponse) => {
      if (fileReaderResponse === null) {
        if (uiState !== UiState.Loading) {
          setUiState(UiState.Ready);
        }
        return;
      }
      setFileReaderResponse(fileReaderResponse);
      if (uiState !== UiState.Reading) {
        setUiState(UiState.List);
        return;
      }
      setTimeout(() => {
        setUiState(UiState.List);
      }, 500);
    });

    const settings = window.Main.getSettings();
    updateSettings(settings);
    readData(settings);

    const auxclickHandler: MouseEventHandler<HTMLAnchorElement> = (event) => {
      event.preventDefault();
    }

    // @ts-ignore
    document.addEventListener('auxclick', auxclickHandler, false);
  }, [])

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={createTheme({palette: { mode: 'dark' }})}>
        <>
          <Greetings uiState={uiState} onFileClick={handleFileClick} onManualClick={handleManualClick} />
          {uiState === UiState.List &&
            <List
              fileReaderResponse={fileReaderResponse}
              appSettings={appSettings.current}
            />
          }
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
          />
          <VersionCheck />
        </>
      </ThemeProvider>
    </>
  )
}