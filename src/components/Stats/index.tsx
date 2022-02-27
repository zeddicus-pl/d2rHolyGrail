import { useMemo, useEffect, useState } from 'react';
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@mui/material';
import { ItemsInSaves, SaveFileStats } from '../../@types/main';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { StatisticsLine } from './line';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Win } from './win';
import { ProgressProvider } from './animation';
import { holyGrailSeedData } from '../../../electron/lib/holyGrailSeedData';
import { useTranslation } from 'react-i18next';
import { computeStats } from '../../utils/objects';

type StatsProps = {
  items: ItemsInSaves,
  stats: SaveFileStats,
  noFileSummary?: boolean,
  noCelebration?: boolean,
}

export function Statistics({ items, stats, noFileSummary, noCelebration }: StatsProps) {
  const armorStats = useMemo(() => computeStats(items, holyGrailSeedData.uniques.armor), [items]);
  const weaponsStats = useMemo(() => computeStats(items, holyGrailSeedData.uniques.weapons), [items]);
  const otherStats = useMemo(() => computeStats(items, holyGrailSeedData.uniques.other), [items]);
  const setsStats = useMemo(() => computeStats(items, holyGrailSeedData.sets), [items]);
  const totalStats = useMemo(() => computeStats(items, holyGrailSeedData), [items]);
  const { t } = useTranslation();

  const [ saveFileStats, setSaveFileStats ] = useState<SaveFileStats>({})
  useEffect(() => {
    window.Main.on('saveFileRead', (filename: string, itemsCount: number) => {
      saveFileStats[filename] = itemsCount;
      setSaveFileStats(saveFileStats);
    });
  }, []);

  return (
    <>
      <Grid container spacing={2} style={{ marginTop: 50, alignItems: 'center', justifyContent: 'center'}}>
        <Grid item md={6}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="center">{t('Exists')}</TableCell>
                  <TableCell align="center">{t('Owned')}</TableCell>
                  <TableCell align="center">{t('Remaining')}</TableCell>
                  <TableCell align="center">{t('% Completed')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StatisticsLine title={t("Unique armor")} stats={armorStats} />
                <StatisticsLine title={t("Unique weapons")} stats={weaponsStats} />
                <StatisticsLine title={t("Unique other")} stats={otherStats} />
                <StatisticsLine title={t("Sets")} stats={setsStats} />
                <StatisticsLine bold title={t("Total")} stats={totalStats} />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item md={4}>
          <div style={{ width: 250, height: 300, textAlign: 'center', margin: 'auto' }}>
            <Typography variant="h5" gutterBottom>{t("Progress:")}</Typography>
            {!noFileSummary && <ProgressProvider valueStart={0} valueEnd={totalStats.owned}>
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
            </ProgressProvider>}
            {noFileSummary && <CircularProgressbar
                value={totalStats.owned}
                maxValue={totalStats.exists}
                text={`${totalStats.percent}%`}
                styles={buildStyles({
                  pathColor: '#6E55AE',
                  textColor: '#ddd',
                  trailColor: '#333',
                })}
              />}
          </div>
        </Grid>
        {!noFileSummary &&
          <>
            <Grid container style={{ marginTop: 50, alignItems: 'center', justifyContent: 'center' }}>
              <Grid item xs={4}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{t("Save files summary")}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>{t("Filename")}</TableCell>
                            <TableCell>{t("Items read")}</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.keys(stats).map(filename => (
                            <TableRow key={filename}>
                              <TableCell>{filename}</TableCell>
                              <TableCell>{
                                stats[filename] === null
                                  ? <span style={{color: 'red'}}>{t("Error")}</span>
                                  : stats[filename]
                              }</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </>
        }
        {!noCelebration && totalStats.exists === totalStats.owned && <Win/>}
      </Grid>
    </>
  );
}