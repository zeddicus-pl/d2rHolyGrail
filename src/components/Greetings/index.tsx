import { useEffect, useState } from 'react';
import { Button } from '../Button'
import { Container, Image } from './styles'

import logo from '../../../assets/logo.svg';
import twitchIcon from '../../../assets/twitch-icon.svg';
import 'animate.css';
import { FileReaderResponse } from '../../@types/main';

type GreetingsProps = {
  onItemsLoaded: (fileReaderResponse: FileReaderResponse ) => void;
};

/* eslint-disable no-unused-vars */
enum UiState {
  Ready = 0,
  FileDialog = 1,
  Reading = 2,
  Done = 3,
}
/* eslint-enable no-unused-vars */

export function Greetings({ onItemsLoaded }: GreetingsProps) {
  const [uiState, setUiState] = useState(UiState.Ready);

  useEffect(() => {
    window.Main.on('openFolderWorking', () => {
      setUiState(UiState.Reading);
    });
    window.Main.on('openFolder', (fileReaderResponse: FileReaderResponse) => {
      if (fileReaderResponse === null) {
        setUiState(UiState.Ready);
        return;  
      }
      setTimeout(() => {
        setUiState(UiState.Done);
        onItemsLoaded(fileReaderResponse);
      }, 500);
    });
  }, [])

  const handleClick = async () => {
    setUiState(UiState.FileDialog);
    window.Main.openFolder();
  }

  if (uiState === UiState.Done) {
    return null;
  }

  return (
    <Container className="animate__animated animate__fadeIn">
      <h1>Holy Grail</h1>
      <h6>
        by&nbsp;
        <a href="#" onClick={() => window.Main.openUrl('https://www.twitch.tv/nadinwins')}>
          NadinWins<img src={twitchIcon} alt="Twitch" />
        </a>
      </h6>
      <Image
        src={logo}
        alt="Holy Grail logo"
        className="animate__animated animate__tada"
      />
      <Button
        onClick={handleClick}
        disabled={uiState !== UiState.Ready}
      >
        { uiState === UiState.Ready && "Select folder to read saves from" }
        { uiState === UiState.FileDialog && "Waiting for folder..." }
        { uiState === UiState.Reading && "Reading files..." }
      </Button>
    </Container>
  )
};
