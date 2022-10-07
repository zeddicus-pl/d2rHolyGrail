import { useState, ReactChild } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Chip, DialogActions, List, ListItem, ListItemText, Table, TableBody, TableCell, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { GameMode, ItemDetails, RuneType, Settings } from '../../@types/main.d';
import { Trans, useTranslation } from 'react-i18next';
import { PopupTitle, Rune, RuneBg, RuneIcon, TooltipTitlePill, RuneListBig, RuneName } from './styles';
import { Runeword, runewordsMapping } from '../../../electron/lib/runewordsMapping';
import { Rune as TRune, runesMapping, reverseRunesMap } from '../../../electron/lib/runesMapping';
import { runewordsMappingPl } from '../../../electron/lib/runewordsMapping_pl';
import { runesMappingPl } from '../../../electron/lib/runesMapping_pl';
import { getRuneIcon } from './tab';
import runeBgImg from '../../../assets/rune.svg';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type RunePopupProps = {
  itemName: string,
  fullItemName: string,
  itemType: string,
  children: ReactChild,
  saveFiles: {[saveName: string]: ItemDetails[]},
  appSettings: Settings,
  disabled?: boolean,
  itemNote: string,
  view: "RUNEWORD" | "RUNE",
}

export default function RunePopup({
  itemType,
  itemName,
  fullItemName,
  saveFiles,
  children,
  appSettings,
  disabled,
  itemNote,
  view,
}: RunePopupProps) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState('');

  const handleClickOpen = () => {
    setOpen(!disabled && true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNotes = () => {
    setNote(itemNote);
    setNoteOpen(true);
  };

  const handleNoteChanged = () => {
    window.Main.setItemNote(itemName, note);
    setNoteOpen(false);
  }

  const runesMappingData = i18n.language == 'pl' ? runesMappingPl : runesMapping;

  let runeData: TRune | false = view == 'RUNE' && runesMapping[itemType as RuneType];
  if (runeData && i18n.language == 'pl' && runesMappingPl[itemType]) {
    runeData = { ...runeData, ...runesMappingPl[itemType] };
  }

  let runewordData: Runeword | false = view == 'RUNEWORD' && runewordsMapping[itemType];
  if (runewordData && i18n.language == 'pl' && runewordsMappingPl[itemType]) {
    runewordData = { ...runewordData, ...runewordsMappingPl[itemType] };
  }

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      borderColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <>
      <div onClick={handleClickOpen} style={{ position: 'relative' }}>
        {children}
      </div>
      <BootstrapDialog
        onClose={handleClose}
        open={open}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <PopupTitle>
            {fullItemName}
            {itemNote && itemNote !== '' && <Typography variant="body1" style={{
              whiteSpace: 'pre',
              borderBottom: '1px solid #555',
              marginBottom: 15,
              color: "#848484",
            }}>{itemNote}</Typography>}
            {runewordData && (
              <>
                <RuneListBig>
                  {runewordData.runes.map(runeName => {
                    const rune = runesMappingData[reverseRunesMap[runeName]];
                    if (!rune) return;
                    return <Rune>
                      <RuneBg src={runeBgImg} />
                      <RuneIcon>{getRuneIcon(reverseRunesMap[runeName])}</RuneIcon>
                      <RuneName>{rune.name}</RuneName>
                    </Rune>;
                  })}
                </RuneListBig>
                <TooltipTitlePill><Trans>Level</Trans>: {runewordData.level}</TooltipTitlePill>
                {runewordData.ladder ? <TooltipTitlePill><Trans>Ladder</Trans></TooltipTitlePill> : null}
              </>
            )}
          </PopupTitle>
          <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            {appSettings.gameMode !== GameMode.Manual && saveFiles && Object.keys(saveFiles).length ?
              <small style={{ fontSize: '11pt', fontWeight: 'normal' }}>
                {Object.keys(saveFiles).map(saveFile => <Chip
                  key={saveFile}
                  label={
                    saveFiles[saveFile].length > 1
                      ? <>{saveFile}<sub>&nbsp;x{saveFiles[saveFile].length}</sub></>
                      : saveFile
                  }
                  style={{ marginRight: 5 }}
                />)}
              </small>
            : null}
            <Tooltip title={<Trans>Edit notes</Trans>}>
              <IconButton
                aria-label="notes"
                onClick={handleNotes}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 48,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
        </DialogTitle>
        <DialogContent dividers>
        {runeData &&
          <List dense>
            <ListItem><ListItemText>
              <b><Trans>Level</Trans>:</b> {runeData.level}
            </ListItemText></ListItem>
            <ListItem><ListItemText>
              <Table size="small">
                <TableBody>
                {Object.entries(runeData.effect).map(([key, value]) => {
                  let sectionKey = <></>;
                  switch(key) {
                    case 'weapon':
                      sectionKey = <Trans>Weapons</Trans>
                      break;
                    case 'armorhelmshield':
                      sectionKey = <><Trans>Armor</Trans><br /><Trans>Helm</Trans><br /><Trans>Shield</Trans></>
                      break;
                    case 'armorhelm':
                      sectionKey = <><Trans>Armor</Trans><br /><Trans>Helm</Trans></>
                      break;
                    case 'shield':
                      sectionKey = <Trans>Shield</Trans>
                      break;
                  }
                  return <StyledTableRow>
                    <TableCell>{sectionKey}</TableCell>
                    <TableCell>{value}</TableCell>
                  </StyledTableRow>;
                })}
                </TableBody>
              </Table>
            </ListItemText></ListItem>
          </List>
        }
        {runewordData &&
          <List dense>
            <ListItem><ListItemText>
            <Trans>Bases: </Trans>
            {runewordData.bases.map((base) => {
              switch (base) {
                case 'helm':
                  return <Chip key={base} label={<Trans>Helm</Trans>} />;
                case 'shield':
                  return <Chip key={base} label={<Trans>Shield</Trans>} />;
                case 'body armor':
                  return <Chip key={base} label={<Trans>Body Armor</Trans>} />;
                case 'weapon':
                  return <Chip key={base} label={<Trans>Weapon</Trans>} />;
                case 'axe':
                  return <Chip key={base} label={<Trans>Axe</Trans>} />;
                case 'hammer':
                  return <Chip key={base} label={<Trans>Hammer</Trans>} />;
                case 'scepter':
                  return <Chip key={base} label={<Trans>Scepter</Trans>} />;
                case 'club':
                  return <Chip key={base} label={<Trans>Club</Trans>} />;
                case 'mace':
                  return <Chip key={base} label={<Trans>Mace</Trans>} />;
                case 'missile weapon':
                  return <Chip key={base} label={<Trans>Missile Weapon</Trans>} />;
                case 'claw':
                  return <Chip key={base} label={<Trans>Claw</Trans>} />;
                case 'polearm':
                  return <Chip key={base} label={<Trans>Polearm</Trans>} />;
                case 'melee weapon':
                  return <Chip key={base} label={<Trans>Melee Weapon</Trans>} />;
                case 'staff':
                  return <Chip key={base} label={<Trans>Staff</Trans>} />;
                case 'scepter':
                  return <Chip key={base} label={<Trans>Scepter</Trans>} />;
                case 'spear':
                  return <Chip key={base} label={<Trans>Spear</Trans>} />;
                case 'dagger':
                  return <Chip key={base} label={<Trans>Dagger</Trans>} />;
                default:
                  return <Chip key={base} label={base.charAt(0).toUpperCase() + base.substring(1)} />;
              }
            })}
            </ListItemText></ListItem>
            {runewordData.attributes.map((value: string) =>
              value.startsWith('#')
                ? <ListItem style={{ paddingTop: 10, paddingBottom: 4, borderBottom: '1px solid #555', fontWeight: 'bold' }}>
                  {value.replace('#', '').trim()}
                </ListItem>
                : <ListItem style={{ paddingTop: 4, paddingBottom: 4 }}>{value}</ListItem>
            )}
            <ListItem><ListItemText>
              <a href="#" onClick={() => runewordData && window.Main.openUrl(runewordData.wiki)}><Trans>More info</Trans></a>
            </ListItemText></ListItem>
          </List>
        }
        </DialogContent>
      </BootstrapDialog>
      <Dialog open={noteOpen} fullWidth onClose={() => setNoteOpen(false)}>
        <DialogTitle>{fullItemName}</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            autoFocus
            margin="dense"
            id="name"
            rows={10}
            fullWidth
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNoteOpen(false)}><Trans>Cancel</Trans></Button>
          <Button onClick={handleNoteChanged}><Trans>Save</Trans></Button>
        </DialogActions>
      </Dialog>
    </>  
  );
}
