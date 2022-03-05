import { Box, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Settings } from "../../@types/main.d";

type Props = {
  appSettings: Settings,
}

export default function DropCalcSettings(props: Props) {
  const { t } = useTranslation();
  const { appSettings } = props;
  return <Box
    component="div"
    sx={{
      display: 'flex',
      alignItems: 'right',
      '& > :not(style)': { m: 1 },
    }}
  >
    <TextField
      label={t('Magic find')}
      defaultValue={appSettings.magicFind}
      onChange={(e) => {
        if (e.target.value === '') return;
        const value = parseInt(e.target.value);
        if (isNaN(value) || value < 0 || value > 2000) {
          window.Main.saveSetting('magicFind', 0);
        } else {
          window.Main.saveSetting('magicFind', parseInt(e.target.value));
        }
      }}
      onBlur={(e) => {
        const mf = window.Main.getSetting('magicFind');
        e.target.value = mf ? mf.toString() : "0";
      }}
      variant="standard"
      type="number"
      InputLabelProps={{ shrink: true }} 
    />
    <TextField
      label={t('Players')}
      defaultValue={appSettings.playersNumber}
      onChange={(e) => {
        if (e.target.value === '') return;
        const value = parseInt(e.target.value);
        if (isNaN(value) || value < 1 || value > 8) {
          window.Main.saveSetting('playersNumber', 1);
        } else {
          window.Main.saveSetting('playersNumber', parseInt(e.target.value));
        }
      }}
      onBlur={(e) => {
        const mf = window.Main.getSetting('playersNumber');
        e.target.value = mf ? mf.toString() : "1";
      }}
      variant="standard"
      type="number"
      InputLabelProps={{ shrink: true }} 
    />
  </Box>;
}