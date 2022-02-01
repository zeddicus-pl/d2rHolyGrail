import { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { Container } from './styles'
import { TabPanel } from './tab';
import { FileReaderResponse } from '../../@types/main';
import { holyGrailSeedData } from '../../../electron/holyGrailSeedData';

/* eslint-disable no-unused-vars */
enum TabState {
  Statistics,
  UniqueArmor,
  UniqueWeapons,
  UniqueOther,
  Sets
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
        <Tabs value={tab} onChange={(_, value) => { setTab(value); }} aria-label="basic tabs example">
          <Tab label="Statistics" />
          <Tab label="Unique armor" />
          <Tab label="Unique weapons" />
          <Tab label="Unique others" />
          <Tab label="Sets" />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={TabState.Statistics} player={items} stats={stats} />
      <TabPanel value={tab} index={TabState.UniqueArmor} items={holyGrailSeedData.uniques.armor} player={items} />
      <TabPanel value={tab} index={TabState.UniqueWeapons} items={holyGrailSeedData.uniques.weapons} player={items} />
      <TabPanel value={tab} index={TabState.UniqueOther} items={holyGrailSeedData.uniques.other} player={items} />
      <TabPanel value={tab} index={TabState.Sets} sets={holyGrailSeedData.sets} player={items} />
    </Container>
  );
}