import { useMemo } from 'react';
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@mui/material';
import { ItemsInSaves } from '../../@types/main';
import { holyGrailSeedData } from 'd2-holy-grail/client/src/common/seeds/HolyGrailSeedData';
import { IUniqueArmors, IUniqueWeapons, IUniqueOther, ISetItems, IHolyGrailData } from 'd2-holy-grail/client/src/common/definitions/union/IHolyGrailData';

import { StatisticsLine, Stats } from './line';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Win } from './win';
import { ProgressProvider } from './animation';

type StatsProps = {
  items: ItemsInSaves,
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

export function Statistics({ items }: StatsProps) {
  const armorStats = useMemo(() => computeStats(items, holyGrailSeedData.uniques.armor), [items]);
  const weaponsStats = useMemo(() => computeStats(items, holyGrailSeedData.uniques.weapons), [items]);
  const otherStats = useMemo(() => computeStats(items, holyGrailSeedData.uniques.other), [items]);
  const setsStats = useMemo(() => computeStats(items, holyGrailSeedData.sets), [items]);
  const totalStats = useMemo(() => computeStats(items, holyGrailSeedData), [items]);

  console.log(armorStats, weaponsStats, otherStats, setsStats, totalStats);

  return (
    <Grid container spacing={2} style={{ height: '100%', alignItems: 'center', justifyContent: "center" }}>
      <Grid item xs={8}>
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
      <Grid item xs={4}>
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
      <>
        { totalStats.exists === totalStats.owned && <Win/> }
      </>
    </Grid>
  );
}