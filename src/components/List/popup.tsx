import { useState, ReactChild } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Chip, DialogActions, Grid, TextField, Tooltip, Typography } from '@mui/material';
import { GameMode, ItemDetails, Settings, SilospenItem } from '../../@types/main.d';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { diablo2ioMapping } from '../../../electron/lib/diablo2ioMapping';
import { Trans, useTranslation } from 'react-i18next';
import DropCalcSettings from '../Settings/dropCalcSettings';
import { PopupTitle } from './styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type PopupProps = {
  itemName: string,
  fullItemName: string,
  itemType: string,
  children: ReactChild,
  saveFiles: {[saveName: string]: ItemDetails[]},
  ethSaveFiles: {[saveName: string]: ItemDetails[]},
  appSettings: Settings,
  itemNote: string,
}

export default function Popup({
  itemType,
  itemName,
  fullItemName,
  saveFiles,
  children,
  appSettings,
  ethSaveFiles,
  itemNote,
}: PopupProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState('');
  const [drop, setDrop] = useState<ReactChild | null>(null);

  const diablo2ioUrl = diablo2ioMapping[itemName] || 'https://diablo2.io/';

  const handleClickOpen = () => {
    window.Main.on('silospenResponse', (drops: SilospenItem[]) => {
      if (!drops || !drops.sort) {
        setOpen(false);
        return;
      }
      setDrop(
        <TableContainer>
          <Table aria-label="simple table">
            <TableBody>
              {drops
                .sort((dropA, dropB) => (parseInt(dropA.chance.replace(/\s/g, '')) - parseInt(dropB.chance.replace(/\s/g, ''))))
                .map(({name, area, chance}: SilospenItem) => 
                  <TableRow key={name+area+chance} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">{name}</TableCell>
                    <TableCell>{area}</TableCell>
                    <TableCell>1:{chance}</TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      );
    });
    window.Main.getSilospen(itemType, itemName);
    setOpen(true);
  };

  const handleClose = () => {
    setDrop(null);
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

  return (
    <>
      <div onClick={handleClickOpen} style={{ position: 'relative' }}>
        {children}
        {open && !drop && <div><HourglassEmptyIcon fontSize="small" style={{ position: 'absolute', top: 15, right: 20 }} /></div>}
      </div>
      <BootstrapDialog
        onClose={handleClose}
        open={open && !!drop}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <PopupTitle>{fullItemName}</PopupTitle>
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
          {appSettings.gameMode !== GameMode.Manual && ethSaveFiles && Object.keys(ethSaveFiles).length ?
            <small style={{ fontSize: '11pt', fontWeight: 'normal' }}>
              {Object.keys(ethSaveFiles).map(saveFile => <Chip
                variant='outlined'
                key={saveFile}
                label={
                  ethSaveFiles[saveFile].length > 1
                  ? <>{saveFile}<sub>&nbsp;x{ethSaveFiles[saveFile].length}</sub></>
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
          {itemNote && itemNote !== '' && 
            <Typography
              variant="body1"
              style={{
                whiteSpace: 'pre',
                paddingBottom: 15,
                borderBottom: "1px solid #4f4f4f",
                marginBottom: 15
            }}>{itemNote}</Typography>
          }
          <div style={{ marginBottom: 20 }}>
            {t('Item info on Diablo2.io')}
            <Typography variant="subtitle2">
              <a
                href="#"
                onClick={() => { window.Main.openUrl(diablo2ioUrl) }}
                style={{
                  fontSize: '10pt',
                }}
              >
                {diablo2ioUrl}
              </a>
            </Typography>
          </div>
          <Grid container spacing={0}>
            <Grid item xs={6}>
              {t('Silospen.com drop calculator')}
              <Typography variant="subtitle2">
                <a
                  href="#"
                  onClick={() => { window.Main.openUrl('https://dropcalc.silospen.com/') }}
                  style={{
                    fontSize: '10pt',
                  }}
                >
                  https://dropcalc.silospen.com/
                </a>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={0} alignItems="center">
                <Grid item xs>
                  <DropCalcSettings appSettings={appSettings} />
                </Grid>
                <Grid item xs={2}>
                  <Button variant='outlined' fullWidth onClick={() => { window.Main.getSilospen(itemType, itemName); }}>{t("Update")}</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div style={{ margin: 20 }}>
            {drop}
          </div>
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
