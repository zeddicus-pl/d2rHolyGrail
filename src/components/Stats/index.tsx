import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@mui/material';
import { GrailType, HolyGrailStats, SaveFileStats, Settings } from '../../@types/main.d';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { StatisticsLine } from './line';
import { Win } from './win';
import { getHolyGrailSeedData } from '../../../electron/lib/holyGrailSeedData';
import { useTranslation } from 'react-i18next';
import Circle from './circle';

type StatsProps = {
  appSettings: Settings,
  holyGrailStats: HolyGrailStats,
  stats?: SaveFileStats,
  noAnimation?: boolean,
  onlyCircle?: boolean,
}

export function Statistics({ stats, noAnimation, appSettings, holyGrailStats, onlyCircle }: StatsProps) {
  const holyGrailSeedData = getHolyGrailSeedData(appSettings)
  const { t } = useTranslation();

  const showNormal = appSettings.grailType !== GrailType.Ethereal;
  const showEthereal = appSettings.grailType === GrailType.Ethereal || appSettings.grailType === GrailType.Each;

  let counterTotal: number | false = false;
  let counterOwned: number | false = false;
  let subCounterTotal: number | false = false;
  let subCounterOwned: number | false = false;
  let counterPercent: number | false = false;
  let owned: number = 0;
  let total: number = 0;
  switch (appSettings.grailType) {
    case GrailType.Normal:
    case GrailType.Both:
      counterTotal = holyGrailStats.normal.total.exists
        + (appSettings.grailRunes ? holyGrailStats.runes.exists : 0)
        + (appSettings.grailRunewords ? holyGrailStats.runewords.exists : 0);
      counterOwned = holyGrailStats.normal.total.owned
        + (appSettings.grailRunes ? holyGrailStats.runes.owned : 0)
        + (appSettings.grailRunewords ? holyGrailStats.runewords.owned : 0);
      counterPercent = (counterOwned / counterTotal) * 100;
      counterPercent = counterPercent > 99.5 && counterPercent < 100 ? 99 : Math.round(counterPercent);
      owned = counterOwned;
      total = counterTotal;
      break;
    case GrailType.Ethereal:
      counterTotal = holyGrailStats.ethereal.total.exists
        + (appSettings.grailRunes ? holyGrailStats.runes.exists : 0)
        + (appSettings.grailRunewords ? holyGrailStats.runewords.exists : 0);
      counterOwned = holyGrailStats.ethereal.total.owned
        + (appSettings.grailRunes ? holyGrailStats.runes.owned : 0)
        + (appSettings.grailRunewords ? holyGrailStats.runewords.owned : 0);
      counterPercent = (counterOwned / counterTotal) * 100;
      counterPercent = counterPercent > 99.5 && counterPercent < 100 ? 99 : Math.round(counterPercent);    
      owned = counterOwned;
      total = counterTotal;
      break;
    case GrailType.Each:
      counterTotal = holyGrailStats.normal.total.exists
        + (appSettings.grailRunes ? holyGrailStats.runes.exists : 0)
        + (appSettings.grailRunewords ? holyGrailStats.runewords.exists : 0);
      counterOwned = holyGrailStats.normal.total.owned
        + (appSettings.grailRunes ? holyGrailStats.runes.owned : 0)
        + (appSettings.grailRunewords ? holyGrailStats.runewords.owned : 0);
      subCounterTotal = holyGrailStats.ethereal.total.exists;
      subCounterOwned = holyGrailStats.ethereal.total.owned;
      owned = counterOwned + subCounterTotal;
      total = counterTotal + subCounterTotal;
      break;
  }

  counterPercent = (owned / total) * 100;
  counterPercent = counterPercent > 99.5 && counterPercent < 100 ? 99 : Math.round(counterPercent);

  if (onlyCircle) {
    return <Circle
      animated={!noAnimation}
      owned={counterOwned}
      total={counterTotal}
      percent={counterPercent}
      subOwned={subCounterOwned}
      subTotal={subCounterTotal}
    />
  }

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
                {showNormal && <StatisticsLine title={t("Unique armor")} stats={holyGrailStats.normal.armor} />}
                {showEthereal && <StatisticsLine title={t("Ethereal unique armor")} stats={holyGrailStats.ethereal.armor} />}
                {showNormal && <StatisticsLine title={t("Unique weapons")} stats={holyGrailStats.normal.weapon} />}
                {showEthereal && <StatisticsLine title={t("Ethereal unique weapons")} stats={holyGrailStats.ethereal.weapon} />}
                {showNormal && <StatisticsLine title={t("Unique other")} stats={holyGrailStats.normal.other} />}
                {showEthereal && <StatisticsLine title={t("Ethereal unique other")} stats={holyGrailStats.ethereal.other} />}
                {showNormal && <StatisticsLine title={t("Sets")} stats={holyGrailStats.normal.sets} />}
                {showEthereal && <StatisticsLine title={t("Ethereal sets")} stats={holyGrailStats.ethereal.sets} />}
                {appSettings.grailRunes && <StatisticsLine title={t("Runes")} stats={holyGrailStats.runes} />}
                {appSettings.grailRunewords && <StatisticsLine title={t("Runewords")} stats={holyGrailStats.runewords} />}
                {showNormal && <StatisticsLine bold title={t("Total")} stats={holyGrailStats.normal.total} />}
                {showEthereal && <StatisticsLine bold title={t("Total ethereal")} stats={holyGrailStats.normal.total} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item md={4}>
          <div style={{ width: 250, height: 300, textAlign: 'center', margin: 'auto' }}>
            <Typography variant="h5" gutterBottom>{t("Progress:")}</Typography>
            <Circle
              animated={!noAnimation}
              owned={counterOwned}
              total={counterTotal}
              percent={counterPercent}
              subOwned={subCounterOwned}
              subTotal={subCounterTotal}
            />
          </div>
        </Grid>
        {stats &&
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
        {!noAnimation && total === owned && <Win/>}
      </Grid>
    </>
  );
}