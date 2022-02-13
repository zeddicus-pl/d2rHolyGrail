import { useEffect, useState } from 'react';
import { Container, Image } from './styles'

import logo from '../../../assets/logo.svg';
import twitchIcon from '../../../assets/twitch-icon.svg';
import 'animate.css';
import { FileReaderResponse } from '../../@types/main';
import { Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

type GreetingsProps = {
  onItemsLoaded: (fileReaderResponse: FileReaderResponse ) => void;
};

/* eslint-disable no-unused-vars */
enum UiState {
  AutoRead = -1,
  Ready = 0,
  FileDialog = 1,
  Reading = 2,
  Done = 3,
}
/* eslint-enable no-unused-vars */

export function Greetings({ onItemsLoaded }: GreetingsProps) {
  const [uiState, setUiState] = useState(UiState.AutoRead);
  const { t } = useTranslation();

  useEffect(() => {
    if (uiState === UiState.AutoRead) {
      window.Main.readFilesUponStart();
    }
    window.Main.on('noDirectorySelected', () => {
      setUiState(UiState.Ready);
    });
    window.Main.on('openFolderWorking', () => {
      setUiState(UiState.Reading);
    });
    window.Main.on('openFolder', (fileReaderResponse: FileReaderResponse) => {
      if (fileReaderResponse === null) {
        if (uiState !== UiState.AutoRead) {
          setUiState(UiState.Ready);
        }
        return;  
      }
      if (uiState !== UiState.Reading) {
        setUiState(UiState.Done);
        onItemsLoaded(fileReaderResponse);
        return;
      }
      setTimeout(() => {
        setUiState(UiState.Done);
        onItemsLoaded(fileReaderResponse);
      }, 500);
    });
  }, [])

  const handleClick = async () => {
    if (uiState === UiState.Ready) {
      setUiState(UiState.FileDialog);
      window.Main.openFolder();
    }
  }

  if (uiState === UiState.Done) {
    return null;
  }

  return (
    <Container className="animate__animated animate__fadeIn">
      <h1>{t('Holy Grail')}</h1>
      <h6>
        {t('by')}&nbsp;
        <a href="#" onClick={() => window.Main.openUrl('https://www.twitch.tv/nadinwins')}>
          NadinWins<img src={twitchIcon} alt="Twitch" />
        </a>
      </h6>
      <Image
        src={logo}
        alt=""
        className="animate__animated animate__tada"
      />
      { uiState !== UiState.AutoRead
        ? <Button
          variant="contained"
          onClick={handleClick}
          disableFocusRipple={uiState !== UiState.Ready}
          disableRipple={uiState !== UiState.Ready}
        >
          { uiState === UiState.Ready && t("Select folder to read saves from") }
          { uiState === UiState.FileDialog && t("Waiting for folder...") }
          { uiState === UiState.Reading && t("Reading files...") }
        </Button>
        : <Typography variant="body2">
          {t('Loading...')}
        </Typography>
      }
    </Container>
  )
};