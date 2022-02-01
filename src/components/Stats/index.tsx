import { useMemo, useEffect, useState } from 'react';
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@mui/material';
import { ItemsInSaves, SaveFileStats } from '../../@types/main';
import { IUniqueArmors, IUniqueWeapons, IUniqueOther, ISetItems, IHolyGrailData } from 'd2-holy-grail/client/src/common/definitions/union/IHolyGrailData';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { StatisticsLine, Stats } from './line';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Win } from './win';
import { ProgressProvider } from './animation';
import { holyGrailSeedData } from '../../../electron/holyGrailSeedData';

type StatsProps = {
  items: ItemsInSaves,
  stats: SaveFileStats,
}

const flattenObject = (object: any, flat: any) => {
  Object.keys(object).forEach((key: any) => {
    if (typeof object[key] === 'object' && Object.keys(object[key]).length > 0) {
      flattenObject(object[key], flat);
    } else {
      flat[key] = {};
    }
  });
}

const countItems = (object: any, items: ItemsInSaves): { exists: number, owned: number } => {
  let exists = 0;
  let owned = 0;
  Object.keys(object).forEach((key: any) => {
    exists = exists + 1;
    if (items[key]) {
      owned = owned + 1;
    }
  });
  return { exists, owned };
}

const computeStats = (
  items: ItemsInSaves,
  template: IUniqueArmors | IUniqueWeapons | IUniqueOther | ISetItems | IHolyGrailData
): Stats => {
  const flat = {};
  flattenObject(template, flat);
  const { exists, owned } = countItems(flat, items);
  return {
    exists,
    owned,
    remaining: exists - owned,
    percent: Math.round((owned / exists) * 100),
  }
}

export function Statistics({ items, stats }: StatsProps) {
  const armorStats = useMemo(() => computeStats(items, holyGrailSeedData.uniques.armor), [items]);
  const weaponsStats = useMemo(() => computeStats(items, holyGrailSeedData.uniques.weapons), [items]);
  const otherStats = useMemo(() => computeStats(items, holyGrailSeedData.uniques.other), [items]);
  const setsStats = useMemo(() => computeStats(items, holyGrailSeedData.sets), [items]);
  const totalStats = useMemo(() => computeStats(items, holyGrailSeedData), [items]);

  const [ saveFileStats, setSaveFileStats ] = useState<SaveFileStats>({})
  useEffect(() => {
    window.Main.on('saveFileRead', (filename: string, itemsCount: number) => {
      saveFileStats[filename] = itemsCount;
      setSaveFileStats(saveFileStats);
    });
  }, []);

  return (
    <>
      <Grid container spacing={2} style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Grid item md={6}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="center">Exists</TableCell>
                  <TableCell align="center">Owned</TableCell>
                  <TableCell align="center">Remaining</TableCell>
                  <TableCell align="center">% Completed</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StatisticsLine title="Unique Armor" stats={armorStats} />
                <StatisticsLine title="Unique Weapons" stats={weaponsStats} />
                <StatisticsLine title="Unique Other" stats={otherStats} />
                <StatisticsLine title="Sets" stats={setsStats} />
                <StatisticsLine bold title="Total" stats={totalStats} />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item md={4}>
          <div style={{ width: 250, height: 300, textAlign: 'center', margin: 'auto' }}>
            <Typography variant="h5" gutterBottom>Progress:</Typography>
            <ProgressProvider valueStart={0} valueEnd={totalStats.owned}>
              { (value: number) => <CircularProgressbar
                value={value}
                maxValue={totalStats.exists}
                text={`${totalStats.percent}%`}
                styles={buildStyles({
                  pathColor: '#6E55AE',
                  textColor: '#ddd',
                  trailColor: '#333',
                })}
              />}
            </ProgressProvider>
          </div>
        </Grid>
        <Grid container style={{ marginTop: 25, alignItems: 'center', justifyContent: 'center' }}>
          <Grid item xs={4}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Save files summary</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Filename</TableCell>
                          <TableCell>Unique items</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.keys(stats).map(filename => (
                          <TableRow>
                            <TableCell>{filename}</TableCell>
                            <TableCell>{
                              stats[filename] === null
                                ? <span style={{color: 'red'}}>Error</span>
                                : stats[filename
                            ]}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
        <>
          { totalStats.exists === totalStats.owned && <Win/> }
        </>
      </Grid>
    </>
  );
}