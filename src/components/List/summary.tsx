import { MouseEventHandler, useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { Container, Image, Logo } from './styles';
import { TabPanel } from './tab';
import { useTranslation } from 'react-i18next';
import { FileReaderResponse, HolyGrailStats, Settings } from '../../@types/main.d';
import { toast } from 'material-react-toastify';
import html2canvas from 'html2canvas';
import CloseIcon from '@mui/icons-material/Close';

import { getHolyGrailSeedData } from '../../../electron/lib/holyGrailSeedData';

import logo from '../../../assets/logo.svg';
import twitchIcon from '../../../assets/twitch-icon.svg';
import { TabState } from '.';

type ListProps = {
  fileReaderResponse: FileReaderResponse | null,
  appSettings: Settings,
  holyGrailStats: HolyGrailStats,
}

export function Summary({ fileReaderResponse, appSettings, holyGrailStats }: ListProps) {
  const { t } = useTranslation();

  if (fileReaderResponse === null) {
    return null;
  }

  const [ open, setOpen ] = useState(false);
  const [ working, setWorking ] = useState(false);
  const [ rendering, setRendering ] = useState(false);
  const [ mode, setMode ] = useState('');
  const { items, ethItems, stats } = fileReaderResponse;

  const copyToClip: MouseEventHandler<HTMLButtonElement> = () => {
    setMode('copy');
    setWorking(true);
    setTimeout(() => {
      const copyToClipboard = (summary: HTMLElement) => {
        return html2canvas(summary, { backgroundColor: "#111111" })
          .then(canvas => {
            return new Promise<void>((resolve) => {
              canvas.toBlob((blob) => {
                if (blob) {
                  // eslint-disable-next-line no-undef
                  const item = new ClipboardItem({ "image/png": blob });
                  navigator.clipboard.write([item]);
                }
                resolve();
              });
            });
          });
      }
      const copyWhenSummaryRendered = () => {
        const summary = document.querySelector("#summary") as HTMLElement;
        if (summary) {
          copyToClipboard(summary).then(() => {
            setWorking(false);
            setRendering(false);
            toast.success(t('Copied image to clipboard!'), {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
            });
          })
        }
      }
      setRendering(true);
      copyWhenSummaryRendered();
    }, 500);
  }

  const saveToDisk: MouseEventHandler<HTMLButtonElement> = () => {
    setMode('file');
    setWorking(true);
    setTimeout(() => {
      const saveAsFile = (summary: HTMLElement) => {
        return html2canvas(summary, { backgroundColor: "#111111" }).then(canvas => {
          const data = canvas.toDataURL("image/png");
          window.Main.saveImage(data);
        });
      }
      const copyWhenSummaryRendered = () => {
        const summary = document.querySelector("#summary") as HTMLElement;
        if (summary) {
          saveAsFile(summary).then(() => {
            setWorking(false);
            setRendering(false);
          })
        }
      }
      setRendering(true);
      copyWhenSummaryRendered();
    }, 500);
  }
 
  const holyGrailSeedData = getHolyGrailSeedData(appSettings);
 
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <ShareIcon />
      </IconButton>
      {open &&
        <>
          <Dialog onClose={() => setOpen(false)} open>
            <DialogTitle>
              {t('Share your progress')}
              <IconButton
                onClick={() => setOpen(false)}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t("You can copy to clipboard, or save to disk, an image showing your progress with the list of all items in the challenge. The list will look similar to what you can see in this application.")}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={copyToClip} disabled={working}>
                {working && mode === 'copy' ? t("Generating image...") : t("Copy to clipboard")}
              </Button>
              <Button onClick={saveToDisk} disabled={working}>
                {working && mode === 'file' ? t("Generating image...") : t("Save as file")}
              </Button>
            </DialogActions>
          </Dialog>
          {(rendering) &&
            <div style={{ position: 'absolute', opacity: 0 }}>
              <Container id="summary" style={{ width: 800, margin: 'auto' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
                  ethPlayer={ethItems}
                  stats={stats}
                  search=""
                  noFileSummary
                  noAnimation
                  appSettings={appSettings}
                  holyGrailStats={holyGrailStats}
                />
                <TabPanel
                  value={TabState.UniqueArmor}
                  index={TabState.UniqueArmor}
                  items={holyGrailSeedData.uniques.armor}
                  ethPlayer={ethItems}
                  player={items}
                  search=" "
                  appSettings={appSettings}
                  holyGrailStats={holyGrailStats}
                />
                <TabPanel
                  value={TabState.UniqueWeapons}
                  index={TabState.UniqueWeapons}
                  items={holyGrailSeedData.uniques.weapons}
                  player={items}
                  ethPlayer={ethItems}
                  search=" "
                  appSettings={appSettings}
                  holyGrailStats={holyGrailStats}
                />
                <TabPanel
                  value={TabState.UniqueOther}
                  index={TabState.UniqueOther}
                  items={holyGrailSeedData.uniques.other}
                  player={items}
                  ethPlayer={ethItems}
                  search=" "
                  appSettings={appSettings}
                  holyGrailStats={holyGrailStats}
                />
                <TabPanel
                  value={TabState.Sets}
                  index={TabState.Sets}
                  sets={holyGrailSeedData.sets}
                  player={items}
                  ethPlayer={ethItems}
                  search=" "
                  appSettings={appSettings}
                  holyGrailStats={holyGrailStats}
                />
                <TabPanel
                  value={TabState.Runes}
                  index={TabState.Runes}
                  runes={holyGrailSeedData.runes}
                  player={items}
                  ethPlayer={ethItems}
                  search=" "
                  appSettings={appSettings}
                  holyGrailStats={holyGrailStats}
                />
                <TabPanel
                  value={TabState.Runewords}
                  index={TabState.Runewords}
                  runewords={holyGrailSeedData.runewords}
                  runes={holyGrailSeedData.runes}
                  player={items}
                  ethPlayer={ethItems}
                  search=" "
                  appSettings={appSettings}
                  holyGrailStats={holyGrailStats}
                />
              </Container>
            </div>
          }
        </>
      }
    </>
  );
}