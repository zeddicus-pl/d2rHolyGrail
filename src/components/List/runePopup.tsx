import { useState, ReactChild } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Chip, DialogContentText, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { ItemDetails, Settings, SilospenItem } from '../../@types/main.d';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { diablo2ioMapping } from '../../../electron/lib/diablo2ioMapping';
import { Trans, useTranslation } from 'react-i18next';
import DropCalcSettings from '../Settings/dropCalcSettings';
import { runesMapping } from '../../../electron/lib/runesMapping';
import { Box } from '@mui/system';

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
}

export default function RunePopup({
  itemType,
  itemName,
  fullItemName,
  saveFiles,
  children,
  appSettings,
  disabled,
}: RunePopupProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(!disabled && true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <Typography variant="h4">{fullItemName}</Typography>
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
            {saveFiles && Object.keys(saveFiles).length ?
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
        </DialogTitle>
        {/*
        <DialogContent dividers>
          <List dense>
            <ListItem><ListItemText>
              <h4><Trans>Level: </Trans>{runesMapping[itemType].level}</h4>
            </ListItemText></ListItem>
            <ListItem><ListItemText>
              <h4>Effects:</h4>
              <List dense>
                {Object.entries(runesMapping[itemType].effect).map(([key, value]) => {
                  let sectionKey = <></>;
                  switch(key) {
                    case 'weapon':
                      sectionKey = <Trans>Weapons</Trans>
                      break;
                    case 'armorhelmshield':
                      sectionKey = <Trans>Armor / Helm / Shield</Trans>
                      break;
                    case 'armorhelm':
                      sectionKey = <Trans>Armor / Helm</Trans>
                      break;
                    case 'shield':
                      sectionKey = <Trans>Shield</Trans>
                      break;
                  }
                  return <ListItem><ListItemText><b>{sectionKey}:</b> {value}</ListItemText></ListItem>
                })}
              </List>
            </ListItemText></ListItem>
          </List>
        </DialogContent>
        */}
      </BootstrapDialog>
    </>  
  );
}
