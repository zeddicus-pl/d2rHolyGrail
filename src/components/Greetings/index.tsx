import { Container, Image } from './styles'

import logo from '../../../assets/logo.svg';
import twitchIcon from '../../../assets/twitch-icon.svg';
import 'animate.css';
import { Typography, Button } from '@mui/material';
import { Language } from '../List/language';
import { useTranslation } from 'react-i18next';
import { ButtonPanel } from '../List/styles';
import { UiState } from '../../App';
import { MouseEventHandler } from 'react';

type GreetingsProps = {
  uiState: UiState,
  onFileClick: MouseEventHandler<HTMLButtonElement>,
  onManualClick: MouseEventHandler<HTMLButtonElement>,
}

export function Greetings({ uiState, onFileClick, onManualClick }: GreetingsProps) {
  const { t } = useTranslation();

  if (uiState === UiState.List) {
    return null;
  }

  return (
    <Container className="animate__animated animate__fadeIn">
      <ButtonPanel style={{ position: 'absolute', right: 10, top: -14 }}>
        <Language />
      </ButtonPanel>
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
      { uiState !== UiState.Loading
        ? <>
          <Button
            variant="contained"
            onClick={onFileClick}
            disableFocusRipple={uiState !== UiState.Ready}
            disableRipple={uiState !== UiState.Ready}
          >
            { uiState === UiState.Ready && t("Select folder to read saves from") }
            { uiState === UiState.FileDialog && t("Waiting for folder...") }
            { uiState === UiState.Reading && t("Reading files...") }
          </Button>
          <Button
            onClick={onManualClick}
            size="small"
            color="info"
            style={{ marginTop: 15, color: '#aaa' }}
          >
            {t('or click here to manually select found items')}
          </Button> 
        </>
        : <Typography variant="body2">
          {t('Loading...')}
        </Typography>
      }
    </Container>
  )
};
