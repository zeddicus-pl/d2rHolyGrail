import { forwardRef, useState, ReactElement, Ref, useRef, useEffect, SyntheticEvent } from 'react';
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
import { useTranslation } from 'react-i18next';
import { GameMode, Settings } from '../../@types/main.d';
import { Grid, Accordion, AccordionDetails, AccordionSummary, Divider, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import GroupIcon from '@mui/icons-material/Group';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalculateIcon from '@mui/icons-material/Calculate';
import DropCalcSettings from './dropCalcSettings';
import packageJson from '../../../package.json';

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
  const { t } = useTranslation();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = 'http://localhost:3666/';
    }
  }, [iframeVisible]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSettings = (event: SelectChangeEvent) => {
    const gameMode = (event.target.value as GameMode);
    window.Main.saveSetting('gameMode', gameMode);
  }

  const gameMode: GameMode = appSettings.gameMode || GameMode.Both;

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
              secondary={"Click here to open releases page in GitHub for changelog and older versions"}
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
              onClick={() => { window.Main.openFolder() }}
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
                onChange={handleSettings}
              >
                <MenuItem value={GameMode.Both}>{t("Both softcore and hardcore")}</MenuItem>
                <MenuItem value={GameMode.Softcore}>{t("Only softcore")}</MenuItem>
                <MenuItem value={GameMode.Hardcore}>{t("Only hardcore")}</MenuItem>
                <MenuItem value={GameMode.Manual}>{t("Manual selection of items")}</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
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
              <Typography>{t("To add a progress overlay into your stream, add a Browser source in your OBS, and point it to the below address. Set it to 300x300 width and heigth.")}</Typography>
              <Typography><a onClick={() => { window.Main.openUrl("http://localhost:3666/") }}>http://localhost:3666/</a></Typography>
              <div style={{ paddingTop: 15 }}>
                <iframe ref={iframeRef} style={{ width: 300, height: 300, background: '#000', border: 0 }} />
              </div>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Dialog>
    </>
  );
}
