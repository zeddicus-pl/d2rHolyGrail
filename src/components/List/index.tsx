import { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { Container, Image, Logo, ButtonPanel } from './styles';
import { TabPanel } from './tab';
import SettingsPanel from '../Settings'
import { useTranslation } from 'react-i18next';
import { FileReaderResponse, HolyGrailStats, Settings } from '../../@types/main.d';
import { Search } from '../Search';

import { getHolyGrailSeedData } from '../../../electron/lib/holyGrailSeedData';

import logo from '../../../assets/logo.svg';
import twitchIcon from '../../../assets/twitch-icon.svg';
import { Summary } from './summary';
import { Language } from './language';
import { computeStats } from '../../utils/objects';

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
  const { t } = useTranslation();

  if (fileReaderResponse === null) {
    return null;
  }

  const { items, stats } = fileReaderResponse;
  const holyGrailSeedData = getHolyGrailSeedData(appSettings);
  const holyGrailStats = computeStats(items, holyGrailSeedData, appSettings);

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <ButtonPanel>
          <Search
            onSearch={(text: string) => {
              setSearch(text);
            }}
          />
          <Summary
            fileReaderResponse={fileReaderResponse}
            appSettings={appSettings}
            holyGrailStats={holyGrailStats}
          />
          <Language />
          <SettingsPanel appSettings={appSettings} />
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
        appSettings={appSettings}
        holyGrailStats={holyGrailStats}
      />
      <TabPanel
        value={search.length ? TabState.UniqueArmor : tab}
        index={TabState.UniqueArmor}
        items={holyGrailSeedData.uniques.armor}
        player={items}
        search={search}
        appSettings={appSettings}
        holyGrailStats={holyGrailStats}
      />
      <TabPanel
        value={search.length ? TabState.UniqueWeapons : tab}
        index={TabState.UniqueWeapons}
        items={holyGrailSeedData.uniques.weapons}
        player={items}
        search={search}
        appSettings={appSettings}
        holyGrailStats={holyGrailStats}
      />
      <TabPanel
        value={search.length ? TabState.UniqueOther : tab}
        index={TabState.UniqueOther}
        items={holyGrailSeedData.uniques.other}
        player={items}
        search={search}
        appSettings={appSettings}
        holyGrailStats={holyGrailStats}
      />
      <TabPanel
        value={search.length ? TabState.Sets : tab}
        index={TabState.Sets}
        sets={holyGrailSeedData.sets}
        player={items}
        search={search}
        appSettings={appSettings}
        holyGrailStats={holyGrailStats}
      />
    </Container>
  );
}