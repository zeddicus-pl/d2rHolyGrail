import { useState } from 'react';
import { Box, Tabs, Tab, IconButton } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Container, Image, Logo, ButtonPanel } from './styles';
import { TabPanel } from './tab';
import { FileReaderResponse } from '../../@types/main';

import { holyGrailSeedData } from '../../../electron/holyGrailSeedData';

import logo from '../../../assets/logo.svg';
import twitchIcon from '../../../assets/twitch-icon.svg';

/* eslint-disable no-unused-vars */
enum TabState {
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
}

export function List({ fileReaderResponse }: ListProps) {

  const [tab, setTab] = useState(TabState.Statistics);

  if (fileReaderResponse === null) {
    return null;
  }

  const { items, stats } = fileReaderResponse;

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <ButtonPanel>
          <IconButton
            size="large"
            onClick={() => window.Main.openFolder()}
            title="Change folder to read from"
          >
            <FolderIcon />
          </IconButton>
          <IconButton
            size="large"
            onClick={() => {
              setTab(TabState.None);
              setTimeout(() => {
                window.Main.readFilesUponStart();
                setTab(TabState.Statistics);  
              }, 1);
            }}
            title="Refresh"
          >
            <RefreshIcon />
          </IconButton>
        </ButtonPanel>
        <Logo>
          <Image
            src={logo}
            alt="Holy Grail logo"
          />
          <h1>Holy Grail</h1>
          <h6>
            by&nbsp;
            <a href="#" onClick={() => window.Main.openUrl('https://www.twitch.tv/nadinwins')}>
              NadinWins<img src={twitchIcon} alt="Twitch" />
            </a>
          </h6>
        </Logo>
        {tab !== TabState.None ?
          <Tabs
            value={tab}
            onChange={(_, value) => { setTab(value); }}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Statistics" />
            <Tab label="Unique armor" />
            <Tab label="Unique weapons" />
            <Tab label="Unique others" />
            <Tab label="Sets" />
          </Tabs> 
        : null}
      </Box>
      <TabPanel value={tab} index={TabState.Statistics} player={items} stats={stats} />
      <TabPanel value={tab} index={TabState.UniqueArmor} items={holyGrailSeedData.uniques.armor} player={items} />
      <TabPanel value={tab} index={TabState.UniqueWeapons} items={holyGrailSeedData.uniques.weapons} player={items} />
      <TabPanel value={tab} index={TabState.UniqueOther} items={holyGrailSeedData.uniques.other} player={items} />
      <TabPanel value={tab} index={TabState.Sets} sets={holyGrailSeedData.sets} player={items} />
    </Container>
  );
}