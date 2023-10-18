import { ChangeEvent, LegacyRef, useMemo, useRef, useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { Container, Image, Logo, ButtonPanel, MissingOnlySwitch } from './styles';
import { TabPanel } from './tab';
import SettingsPanel from '../Settings'
import { Trans, useTranslation } from 'react-i18next';
import { FileReaderResponse, GrailType, ItemNotes, Settings } from '../../@types/main.d';
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
  itemNotes: ItemNotes,
}

export function List({ fileReaderResponse, appSettings, itemNotes }: ListProps) {
  const [tab, setTab] = useState(TabState.Statistics);
  const [search, setSearch] = useState<string>('');
  const { t } = useTranslation();

  if (fileReaderResponse === null) {
    return null;
  }
  
  const dingPlayer: LegacyRef<HTMLAudioElement> = useRef<HTMLAudioElement>(null);
  const playSound = () => {
    if (!appSettings.enableSounds) {
      return;
    }
    dingPlayer.current?.load();
    dingPlayer.current?.play();
  };

  const { items, ethItems, stats, availableRunes } = fileReaderResponse;

  const holyGrailSeedData = useMemo(
    () => getHolyGrailSeedData(appSettings, false),
    [
      appSettings.grailRunes,
      appSettings.grailRunewords,
      appSettings.grailType,
    ]
  );
  const ethGrailSeedData = useMemo(
    () => getHolyGrailSeedData(appSettings, true),
    []
  );

  const holyGrailStats = useMemo(
    () => computeStats(items, ethItems, holyGrailSeedData, ethGrailSeedData, appSettings, playSound),
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
            itemNotes={itemNotes}
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
            {appSettings.grailType !== GrailType.Ethereal &&
              [
                <Tab label={t("Sets")} key="sets" />,
                appSettings.grailRunes && <Tab label={t("Runes")}  key="runes" />,
                appSettings.grailRunewords && <Tab label={t("Runewords")}  key="runewords" />,
              ]
            }
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
      {(search.length || tab === TabState.Statistics) && <TabPanel
        value={search.length ? TabState.None : tab}
        index={TabState.Statistics}
        player={items}
        ethPlayer={ethItems}
        stats={stats}
        search=""
        appSettings={appSettings}
        holyGrailStats={holyGrailStats}
      />}
      {(search.length || tab === TabState.UniqueArmor) && <TabPanel
        value={search.length ? TabState.UniqueArmor : tab}
        index={TabState.UniqueArmor}
        ethItems={ethGrailSeedData.uniques.armor}
        items={holyGrailSeedData.uniques.armor}
        player={items}
        ethPlayer={ethItems}
        search={search}
        appSettings={appSettings}
        holyGrailStats={holyGrailStats}
        itemNotes={itemNotes}
      />}
      {(search.length || tab === TabState.UniqueWeapons) && <TabPanel
        value={search.length ? TabState.UniqueWeapons : tab}
        index={TabState.UniqueWeapons}
        ethItems={ethGrailSeedData.uniques.weapons}
        items={holyGrailSeedData.uniques.weapons}
        player={items}
        ethPlayer={ethItems}
        search={search}
        appSettings={appSettings}
        holyGrailStats={holyGrailStats}
        itemNotes={itemNotes}
      />}
      {(search.length || tab === TabState.UniqueOther) && <TabPanel
        value={search.length ? TabState.UniqueOther : tab}
        index={TabState.UniqueOther}
        ethItems={ethGrailSeedData.uniques.other}
        items={holyGrailSeedData.uniques.other}
        player={items}
        ethPlayer={ethItems}
        search={search}
        appSettings={appSettings}
        holyGrailStats={holyGrailStats}
        itemNotes={itemNotes}
      />}
      {appSettings.grailType !== GrailType.Ethereal &&
        <>
          {(search.length || tab === TabState.Sets) && <TabPanel
            value={search.length ? TabState.Sets : tab}
            index={TabState.Sets}
            sets={holyGrailSeedData.sets}
            player={items}
            ethPlayer={{}}
            search={search}
            appSettings={appSettings}
            holyGrailStats={holyGrailStats}
            itemNotes={itemNotes}
          />}
          {(search.length || tab === TabState.Runes) && <TabPanel
            value={search.length ? TabState.Runes : tab}
            index={TabState.Runes}
            runes={holyGrailSeedData.runes}
            player={items}
            ethPlayer={{}}
            search={search}
            appSettings={appSettings}
            holyGrailStats={holyGrailStats}
            itemNotes={itemNotes}
            availableRunes={availableRunes}
          />}
          {(search.length || tab === TabState.Runewords) && <TabPanel
            value={search.length ? TabState.Runewords : tab}
            index={TabState.Runewords}
            runewords={holyGrailSeedData.runewords}
            runes={holyGrailSeedData.runes}
            player={items}
            ethPlayer={{}}
            search={search}
            appSettings={appSettings}
            holyGrailStats={holyGrailStats}
            itemNotes={itemNotes}
          />}
        </>
      }
      {(tab == TabState.Runes || tab == TabState.Runewords) && <div style={{ opacity: 0.3, paddingTop: 20 }}>
        <a href="http://creativecommons.org/licenses/by/3.0/" style={{ color: '#eee' }}>
          <img src={cc} alt="" style={{ width: 20, verticalAlign: "bottom"}} />
        </a>
        &nbsp;
        <Trans>Rune icons from</Trans>
        &nbsp;
        <a href="https://www.deviantart.com/buckethelm" style={{ color: '#eee' }}>BucketHelm</a>
      </div>}
      <audio preload='auto' ref={dingPlayer} style={{ display: 'none' }}>
        <source src={dingSound} type="audio/mpeg" />
      </audio>
    </Container>
  );
}