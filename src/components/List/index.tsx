import { ChangeEvent, LegacyRef, useMemo, useRef, useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { Container, Image, Logo, ButtonPanel, MissingOnlySwitch } from './styles';
import { TabPanel } from './tab';
import SettingsPanel from '../Settings'
import { Trans, useTranslation } from 'react-i18next';
import { FileReaderResponse, Settings } from '../../@types/main.d';
import { Search } from '../Search';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';import DoneIcon from '@mui/icons-material/Done';

import { getHolyGrailSeedData } from '../../../electron/lib/holyGrailSeedData';

import dingSound from '../../../assets/ding.mp3';
import cc from '../../../assets/cc.svg';
import logo from '../../../assets/logo.svg';
import twitchIcon from '../../../assets/twitch-icon.svg';
import { Summary } from './summary';
import { Language } from './language';
import { computeStats } from '../../utils/objects';
import { settingsKeys } from '../../utils/defaultSettings';

/* eslint-disable no-unused-vars */
export enum TabState {
  Statistics,
  UniqueArmor,
  UniqueWeapons,
  UniqueOther,
  Sets,
  Runes,
  Runewords,
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
  
  const dingPlayer: LegacyRef<HTMLAudioElement> = useRef<HTMLAudioElement>(null);
  const playSound = () => {
    dingPlayer.current?.load();
    dingPlayer.current?.play();
  };

  const { items, ethItems, stats } = fileReaderResponse;
  const holyGrailSeedData = useMemo(
    () => getHolyGrailSeedData(appSettings),
    [
      appSettings.grailRunes,
      appSettings.grailRunewords,
    ]
  );

  const holyGrailStats = useMemo(
    () => computeStats(items, ethItems, holyGrailSeedData, appSettings, playSound),
    [
      items,
      ethItems,
      holyGrailSeedData,
      appSettings.grailType,
      appSettings.grailRunes,
      appSettings.grailRunewords,
      appSettings.gameMode,
      appSettings.gameVersion,
    ]
  ) ;

  const handleOnlyMissing = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    window.Main.saveSetting(settingsKeys.onlyMissing, checked);
  }

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
            {appSettings.grailRunes && <Tab label={t("Runes")} />} 
            {appSettings.grailRunewords && <Tab label={t("Runeswords")} />}
          </Tabs> 
        : null}
      </Box>
      {tab != TabState.Statistics && <MissingOnlySwitch>
        <FormControlLabel
          style={{ opacity: 0.7, paddingTop: 10 }}
          control={<Switch size='small' onChange={handleOnlyMissing} checked={appSettings.onlyMissing} />}
          label={<small><Trans>Only missing items</Trans></small>}
        />
      </MissingOnlySwitch>}
      <TabPanel
        value={search.length ? TabState.None : tab}
        index={TabState.Statistics}
        player={items}
        ethPlayer={ethItems}
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
        ethPlayer={ethItems}
        search={search}
        appSettings={appSettings}
        holyGrailStats={holyGrailStats}
      />
      <TabPanel
        value={search.length ? TabState.UniqueWeapons : tab}
        index={TabState.UniqueWeapons}
        items={holyGrailSeedData.uniques.weapons}
        player={items}
        ethPlayer={ethItems}
        search={search}
        appSettings={appSettings}
        holyGrailStats={holyGrailStats}
      />
      <TabPanel
        value={search.length ? TabState.UniqueOther : tab}
        index={TabState.UniqueOther}
        items={holyGrailSeedData.uniques.other}
        player={items}
        ethPlayer={ethItems}
        search={search}
        appSettings={appSettings}
        holyGrailStats={holyGrailStats}
      />
      <TabPanel
        value={search.length ? TabState.Sets : tab}
        index={TabState.Sets}
        sets={holyGrailSeedData.sets}
        player={items}
        ethPlayer={ethItems}
        search={search}
        appSettings={appSettings}
        holyGrailStats={holyGrailStats}
      />
      <TabPanel
        value={search.length ? TabState.Runes : tab}
        index={TabState.Runes}
        runes={holyGrailSeedData.runes}
        player={items}
        ethPlayer={ethItems}
        search={search}
        appSettings={appSettings}
        holyGrailStats={holyGrailStats}
      />
      <TabPanel
        value={search.length ? TabState.Runewords : tab}
        index={TabState.Runewords}
        runewords={holyGrailSeedData.runewords}
        runes={holyGrailSeedData.runes}
        player={items}
        ethPlayer={ethItems}
        search={search}
        appSettings={appSettings}
        holyGrailStats={holyGrailStats}
      />
      {(tab == TabState.Runes || tab == TabState.Runewords) && <div style={{ opacity: 0.3, paddingTop: 20 }}>
        <a href="http://creativecommons.org/licenses/by/3.0/" style={{ color: '#eee' }}>
          <img src={cc} alt="" style={{ width: 20, verticalAlign: "bottom"}} />
        </a>
        &nbsp;
        <Trans>Rune icons from</Trans>
        &nbsp;
        <a href="https://www.deviantart.com/buckethelm" style={{ color: '#eee' }}>BucketHelm</a>
      </div>}
      {tab == TabState.Statistics && <div style={{ opacity: 0.3, paddingTop: 20 }}>
        <a href="http://creativecommons.org/licenses/by/4.0/" style={{ color: '#eee' }}>
          <img src={cc} alt="" style={{ width: 20, verticalAlign: "bottom"}} />
        </a>
        &nbsp;
        <Trans>Sounds from</Trans>
        &nbsp;
        <a href="https://freesound.org/people/InspectorJ/" style={{ color: '#eee' }}>InspectorJ</a>
      </div>}
      <audio preload='auto' ref={dingPlayer} style={{ display: 'none' }}>
        <source src={dingSound} type="audio/mpeg" />
      </audio>
    </Container>
  );
}