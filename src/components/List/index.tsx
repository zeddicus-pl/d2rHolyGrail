import { useState, MouseEvent } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Container, Image, Logo, ButtonPanel } from './styles';
import { TabPanel } from './tab';
import SettingsPanel from '../Settings'
import { useTranslation } from 'react-i18next';
import { FileReaderResponse, Settings } from '../../@types/main';
import { Search } from '../Search';

import flagGB from 'circle-flags/flags/gb.svg';
import flagPL from 'circle-flags/flags/pl.svg';

import { holyGrailSeedData } from '../../../electron/holyGrailSeedData';

import logo from '../../../assets/logo.svg';
import twitchIcon from '../../../assets/twitch-icon.svg';
import { Summary } from './summary';

/* eslint-disable no-unused-vars */
export enum TabState {
  Statistics,
  UniqueArmor,
  UniqueWeapons,
  UniqueOther,
  Sets,
  None
}
/* eslint-enable no-unused-vars */

export const title = (str: string): string => {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}

type ListProps = {
  fileReaderResponse: FileReaderResponse | null,
  appSettings: Settings,
}

export function List({ fileReaderResponse, appSettings }: ListProps) {
  const [tab, setTab] = useState(TabState.Statistics);
  const [search, setSearch] = useState<string>('');
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

  if (fileReaderResponse === null) {
    return null;
  }

  let flag;
  switch (i18n.language) {
    case 'pl':
      flag = flagPL;
      break;
    default:
      flag = flagGB;
  }

  const { items, stats } = fileReaderResponse;

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <ButtonPanel>
          <Search
            onSearch={(text: string) => {
              setSearch(text);
            }}
          />
          <Summary fileReaderResponse={fileReaderResponse} />
          <IconButton onClick={handleClick}>
            <img style={{ height: '1em' }} src={flag} />
          </IconButton>
          <SettingsPanel appSettings={appSettings} />
        </ButtonPanel>
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
        {tab !== TabState.None && !search.length ?
          <Tabs
            value={tab}
            onChange={(_, value) => { setTab(value); }}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label={t("Statistics")} />
            <Tab label={t("Unique armor")} />
            <Tab label={t("Unique weapons")} />
            <Tab label={t("Unique other")} />
            <Tab label={t("Sets")} />
          </Tabs> 
        : null}
      </Box>
      <TabPanel
        value={search.length ? TabState.None : tab}
        index={TabState.Statistics}
        player={items}
        stats={stats}
        search=""
      />
      <TabPanel
        value={search.length ? TabState.UniqueArmor : tab}
        index={TabState.UniqueArmor}
        items={holyGrailSeedData.uniques.armor}
        player={items}
        search={search}
      />
      <TabPanel
        value={search.length ? TabState.UniqueWeapons : tab}
        index={TabState.UniqueWeapons}
        items={holyGrailSeedData.uniques.weapons}
        player={items}
        search={search}
      />
      <TabPanel
        value={search.length ? TabState.UniqueOther : tab}
        index={TabState.UniqueOther}
        items={holyGrailSeedData.uniques.other}
        player={items}
        search={search}
      />
      <TabPanel
        value={search.length ? TabState.Sets : tab}
        index={TabState.Sets}
        sets={holyGrailSeedData.sets}
        player={items}
        search={search}
      />
    </Container>
  );
}