import { useState, MouseEvent } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';

import flagGB from 'circle-flags/flags/gb.svg';
import flagPL from 'circle-flags/flags/pl.svg';

export function Language() {
  const {t, i18n} = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (lang: string) => {
    i18n.changeLanguage(lang);
    window.Main.saveSetting('lang', lang);
    setAnchorEl(null);
  };

  let flag;
  switch (i18n.language) {
    case 'pl':
      flag = flagPL;
      break;
    default:
      flag = flagGB;
  }

  return <>
    <IconButton onClick={handleClick}>
      <img style={{ height: '1em' }} src={flag} />
    </IconButton>
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={() => { setAnchorEl(null); }}
    >
      <MenuItem onClick={() => { handleClose('en') }}>
        <IconButton disableRipple disableFocusRipple >
          <img style={{ height: '1em' }} src={flagGB} />
        </IconButton>
        {t('English')}
      </MenuItem>
      <MenuItem onClick={() => { handleClose('pl') }}>
        <IconButton disableRipple disableFocusRipple>
          <img style={{ height: '1em' }} src={flagPL} />
        </IconButton>
        {t('Polski')}
      </MenuItem>
    </Menu>
  </>;
}