import React, { forwardRef, useState, ReactElement, Ref, useRef, useEffect, SyntheticEvent } from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import InfoIcon from '@mui/icons-material/Info';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import SettingsIcon from '@mui/icons-material/Settings';
import { TransitionProps } from '@mui/material/transitions';
import { Trans, useTranslation } from 'react-i18next';
import { GameMode, GameVersion, GrailType, Settings } from '../../@types/main.d';
import { Grid, Accordion, AccordionDetails, AccordionSummary, Divider, FormControl, MenuItem, Select, SelectChangeEvent, Checkbox, FormControlLabel } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import GroupIcon from '@mui/icons-material/Group';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalculateIcon from '@mui/icons-material/Calculate';
import WineBarIcon from '@mui/icons-material/WineBar';
import DropCalcSettings from './dropCalcSettings';
import packageJson from '../../../package.json';
import i18n from '../../i18n';
import { settingsKeys } from '../../utils/defaultSettings';
import cc from '../../../assets/cc.svg';
import { clearPrevUniqItemsFound } from '../../utils/objects';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type SettingsPanelProps = {
  appSettings: Settings,
}

export default function SettingsPanel({ appSettings }: SettingsPanelProps) {
  const [open, setOpen] = useState(false);
  const [iframeVisible, setIframeVisible] = useState(false);
  const [streamPort, setStreamPort] = useState(0);
  const { t } = useTranslation();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setStreamPort(window.Main.getStreamPort());
  }, []);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = 'http://localhost:'+streamPort+'/';
    }
  }, [iframeVisible, streamPort]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenFolder = () => {
    window.Main.openFolder();
  };

  const handleGameMode = (event: SelectChangeEvent) => {
    const gameMode = (event.target.value as GameMode);
    clearPrevUniqItemsFound();
    window.Main.saveSetting(settingsKeys.gameMode, gameMode);
  };

  const handleGrailType = (event: SelectChangeEvent) => {
    const grailType = (event.target.value as GrailType);
    clearPrevUniqItemsFound();
    window.Main.saveSetting(settingsKeys.grailType, grailType);
  };

  const handleRunes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const runes = event.target.checked;
    clearPrevUniqItemsFound();
    window.Main.saveSetting(settingsKeys.grailRunes, runes);
  };

  const handleRunewords = (event: React.ChangeEvent<HTMLInputElement>) => {
    const runewords = event.target.checked;
    clearPrevUniqItemsFound();
    window.Main.saveSetting(settingsKeys.grailRunewords, runewords);
  };

  const handleSound = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sound = event.target.checked;
    window.Main.saveSetting(settingsKeys.enableSounds, sound);
  };

  const handleGameVersion = (event: SelectChangeEvent) => {
    const version = (event.target.value as GameVersion);
    window.Main.saveSetting(settingsKeys.gameVersion, version);
  };

  const gameMode: GameMode = appSettings.gameMode || GameMode.Both;
  const grailType: GrailType = appSettings.grailType || GrailType.Both;

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <SettingsIcon />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {t('Settings')}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText
              primary={t("App version: ") + packageJson.version}
              secondary={t("Click here to open releases page in GitHub for changelog and older versions")}
              onClick={() => { window.Main.openUrl('https://github.com/zeddicus-pl/d2rHolyGrail/releases') }}
            />
          </ListItem>
          <Divider />
          <ListItem button disabled={gameMode === GameMode.Manual}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText
              primary={t("Saved games folder")}
              secondary={appSettings.saveDir || ''}
              onClick={handleOpenFolder}
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText
              primary={t("Game mode")}
              secondary={t("Select which types of games you want to include in the list")}
            />
            <FormControl>
              <Select
                // @ts-ignore
                value={gameMode}
                // @ts-ignore
                onChange={handleGameMode}
              >
                <MenuItem value={GameMode.Both}>{t("Both softcore and hardcore")}</MenuItem>
                <MenuItem value={GameMode.Softcore}>{t("Only softcore")}</MenuItem>
                <MenuItem value={GameMode.Hardcore}>{t("Only hardcore")}</MenuItem>
                <MenuItem value={GameMode.Manual}>{t("Manual selection of items")}</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <WineBarIcon />
            </ListItemIcon>
            <ListItemText
              primary={t("Grail type")}
              secondary={t("Select what type of items you are looking for")}
            />
            <FormControl>
              <Select
                // @ts-ignore
                value={grailType}
                // @ts-ignore
                onChange={handleGrailType}
              >
                <MenuItem value={GrailType.Both}>{t("Both normal and ethereal items")}</MenuItem>
                <MenuItem value={GrailType.Normal}>{t("Only normal items")}</MenuItem>
                <MenuItem value={GrailType.Ethereal}>{t("Only ethereal items")}</MenuItem>
                <MenuItem value={GrailType.Each}>{t("Normal and ethereal items separately counted")}</MenuItem>
              </Select>
              <FormControlLabel
                sx={{mt: 1}}
                control={<Checkbox checked={appSettings.grailRunes} onChange={handleRunes} />}
                label={i18n.t`Include Runes`}
              />
              <FormControlLabel
                sx={{mt: 1}}
                control={<Checkbox checked={appSettings.grailRunewords} onChange={handleRunewords} />}
                label={i18n.t`Include Runewords`}
              />
              <FormControlLabel
                sx={{mt: 1}}
                control={<Checkbox checked={appSettings.enableSounds} onChange={handleSound} />}
                label={i18n.t`Play sound when new item is found`}
              />
            </FormControl>
          </ListItem>
          <div style={{ opacity: 0.5, textAlign: 'right', padding: 10  }}>
            <a href="http://creativecommons.org/licenses/by/4.0/" style={{ color: '#eee' }}>
              <img src={cc} alt="" style={{ width: 20, verticalAlign: "bottom"}} />
            </a>
            &nbsp;
            <Trans>Sounds from</Trans>
            &nbsp;
            <a href="https://freesound.org/people/InspectorJ/" style={{ color: '#eee' }}>InspectorJ</a>
          </div>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <CalculateIcon />
            </ListItemIcon>
            <ListItemText
              primary={t('Drop calculator settings')}
            />
            <DropCalcSettings appSettings={appSettings} />
          </ListItem>
        </List>
        <Divider />
        <ListItem button>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText
              primary={t("Game version")}
           />
            <FormControl>
              <Select
                // @ts-ignore
                value={appSettings.gameVersion}
                // @ts-ignore
                onChange={handleGameVersion}
              >
                <MenuItem value={GameVersion.Resurrected}>{t("Diablo 2 Resurrected")}</MenuItem>
                <MenuItem value={GameVersion.Classic}>{t("Diablo 2 Lord of Destruction")}</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <Divider />
        <Grid m={{ t: 2 }} p={3}>
          <Accordion onChange={(event: SyntheticEvent, expanded: boolean) => {
            setIframeVisible(expanded);
          }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>{t("Streaming tools")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{t("To add a progress overlay into your stream, add a Browser source in your OBS, and point it to the below address. Set it to 300x400 width and heigth.")}</Typography>
              <Typography><a onClick={() => { window.Main.openUrl("http://localhost:"+streamPort+"/") }}>http://localhost:{streamPort}/</a></Typography>
              <div style={{ paddingTop: 15 }}>
                <iframe ref={iframeRef} style={{ width: 300, height: 400, background: '#000', border: 0 }} />
              </div>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Dialog>
    </>
  );
}
