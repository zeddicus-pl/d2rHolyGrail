import { MouseEventHandler, useState } from 'react';
import { Box, Button, Typography, Dialog, DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import { FullScreenContainer, Container, Image, Logo, ButtonPanel } from './styles';
import { TabPanel } from './tab';
import { useTranslation } from 'react-i18next';
import { FileReaderResponse } from '../../@types/main';

import { holyGrailSeedData } from '../../../electron/holyGrailSeedData';

import logo from '../../../assets/logo.svg';
import twitchIcon from '../../../assets/twitch-icon.svg';
import { TabState } from '.';
import html2canvas from 'html2canvas';

type ListProps = {
  fileReaderResponse: FileReaderResponse | null,
}

export function Summary({ fileReaderResponse }: ListProps) {
  const { t } = useTranslation();

  if (fileReaderResponse === null) {
    return null;
  }

  const [ open, setOpen ] = useState(false);
  const [ working, setWorking ] = useState(false);
  const [ copying, setCopying ] = useState(false);
  const [ saving, setSaving ] = useState(false);
  const { items, stats } = fileReaderResponse;

  const copyToClip: MouseEventHandler<HTMLButtonElement> = () => {
    const summary = document.querySelector("#summary") as HTMLElement;
    if (summary) {
      html2canvas(summary, { backgroundColor: "#111111" }).then(canvas => {
        canvas.toBlob(function(blob) { 
          const item = new ClipboardItem({ "image/png": blob });
          navigator.clipboard.write([item]); 
        });
      });
    }
  }

  const saveToDisk = () => {

  }

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <ShareIcon />
      </IconButton>
      {open &&
        <>
          <Dialog onClose={() => setOpen(false)} open>
            <DialogTitle>{t('Holy Grail summary image')}</DialogTitle>
            <Typography>{t("You can copy to clipboard, or save to disk, an image showing your progress with the list of all items in the challenge. The list will look similar to what you can see in this application.")}</Typography>
            <Button onClick={copyToClip}>
              {t(copying ? "Working..." : "Copy to clipboard")}
            </Button>
            <Button onClick={}>
              {t("Save to disk")}
            </Button>
          </Dialog>
          {working && <div>Loading ...</div>}
          {(copying || saving) &&
            <FullScreenContainer>
              <div style={{ position: 'absolute', opacity: 0}}>
                <Container id="summary" style={{ width: 1100, margin: 'auto' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <ButtonPanel>
                      <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon />
                      </IconButton>

                    </ButtonPanel>
                    <Logo>
                      <Image
                        src={logo}
                        alt=""
                      />
                      <h1>{t('Holy Grail')}</h1>
                      <h6>
                        {t('by')}&nbsp;
                        <a href="#" onClick={() => window.Main.openUrl('https://www.twitch.tv/nadinwins')}>
                          NadinWins<img src={twitchIcon} alt="Twitch" />
                        </a>
                      </h6>
                    </Logo>
                  </Box>
                  <TabPanel
                    value={TabState.Statistics}
                    index={TabState.Statistics}
                    player={items}
                    stats={stats}
                    search=""
                    noFileSummary
                  />
                  <TabPanel
                    value={TabState.UniqueArmor}
                    index={TabState.UniqueArmor}
                    items={holyGrailSeedData.uniques.armor}
                    player={items}
                    search=" "
                  />
                  <TabPanel
                    value={TabState.UniqueWeapons}
                    index={TabState.UniqueWeapons}
                    items={holyGrailSeedData.uniques.weapons}
                    player={items}
                    search=" "
                  />
                  <TabPanel
                    value={TabState.UniqueOther}
                    index={TabState.UniqueOther}
                    items={holyGrailSeedData.uniques.other}
                    player={items}
                    search=" "
                  />
                  <TabPanel
                    value={TabState.Sets}
                    index={TabState.Sets}
                    sets={holyGrailSeedData.sets}
                    player={items}
                    search=" "
                  />
                </Container>
              </div>
            </FullScreenContainer>
          }
        </>
      }
    </>
  );
}