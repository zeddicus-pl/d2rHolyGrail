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
  
  const grandOwned = holyGrailStats.normal.total.owned + holyGrailStats.ethereal.total.owned
    + (appSettings.grailRunes ? holyGrailStats.runes.owned : 0)
    + (appSettings.grailRunewords ? holyGrailStats.runewords.owned : 0);
  const grandExists = holyGrailStats.normal.total.exists + holyGrailStats.ethereal.total.exists
    + (appSettings.grailRunes ? holyGrailStats.runes.exists : 0)
    + (appSettings.grailRunewords ? holyGrailStats.runewords.exists : 0);
  const grandRemaining = grandExists - grandOwned;
  const grandPercent = (grandOwned / grandExists) * 100;
  const grandTotal = {
    exists: grandExists,
    owned: grandOwned,
    remaining: grandRemaining,
    percent: grandPercent > 99.5 && grandPercent < 100 ? 99 : Math.round(grandPercent),
  }

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
      owned = counterOwned + subCounterOwned;
      total = counterTotal + subCounterTotal;
      counterPercent = (owned / total) * 100;
      counterPercent = counterPercent > 99.5 && counterPercent < 100 ? 99 : Math.round(counterPercent);    
      break;
  }

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
                {showNormal && <StatisticsLine title={t("Unique weapons")} stats={holyGrailStats.normal.weapon} />}
                {showNormal && <StatisticsLine title={t("Unique other")} stats={holyGrailStats.normal.other} />}
                {showNormal && <StatisticsLine title={t("Sets")} stats={holyGrailStats.normal.sets} />}
                {showEthereal && <StatisticsLine title={t("Ethereal unique armor")} stats={holyGrailStats.ethereal.armor} />}
                {showEthereal && <StatisticsLine title={t("Ethereal unique weapons")} stats={holyGrailStats.ethereal.weapon} />}
                {showEthereal && <StatisticsLine title={t("Ethereal unique other")} stats={holyGrailStats.ethereal.other} />}
                {showEthereal && <StatisticsLine title={t("Ethereal sets")} stats={holyGrailStats.ethereal.sets} />}
                {appSettings.grailRunes && <StatisticsLine title={t("Runes")} bold stats={holyGrailStats.runes} />}
                {appSettings.grailRunewords && <StatisticsLine title={t("Runewords")} bold stats={holyGrailStats.runewords} />}
                {showNormal && appSettings.grailType !== GrailType.Each && <StatisticsLine bolder title={t("Total")} stats={grandTotal} />}
                {showNormal && appSettings.grailType === GrailType.Each && <StatisticsLine bold title={t("Total normal")} stats={holyGrailStats.normal.total} />}
                {showEthereal && appSettings.grailType === GrailType.Each && <StatisticsLine bold title={t("Total ethereal")} stats={holyGrailStats.ethereal.total} />}
                {showEthereal && appSettings.grailType !== GrailType.Each && <StatisticsLine bolder title={t("Total")} stats={grandTotal} />}
                {appSettings.grailType === GrailType.Each && <StatisticsLine bolder title={t("Total")} stats={grandTotal} />}
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