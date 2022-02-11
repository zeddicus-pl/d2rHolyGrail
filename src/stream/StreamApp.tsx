import { useState, useEffect, useMemo } from 'react';
import { io } from "socket.io-client";
import { FileReaderResponse, Settings } from '../@types/main';
import { useTranslation } from 'react-i18next';
import { Grid, createTheme } from '@mui/material';
import { holyGrailSeedData } from '../../electron/holyGrailSeedData';
import { computeStats } from '../components/Stats';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { ProgressProvider } from '../components/Stats/animation';
import { ThemeProvider } from '@mui/system';
import { GlobalStyle } from '../styles/GlobalStyle';
import { Header, Container } from './styles';

export default function StreamApp() {
  const [data, setData] = useState<FileReaderResponse | null>(null);
  const totalStats = useMemo(() => data ? computeStats(data.items, holyGrailSeedData) : {exists: 0, owned: 0, percent: 0}, [data]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const socket = io();
    socket.on("updatedSettings", function (settings: Settings) {
      i18n.changeLanguage(settings.lang);
    });
    socket.on("openFolder", function (data: FileReaderResponse) {
      setData(data);
    });
  }, []);

  if (data === null) {
    return null;
  }

  return <>
    <GlobalStyle />
    <ThemeProvider theme={createTheme({palette: { mode: 'dark' }})}>
      <Container>
        <Grid xs={12}>
          <Header>{t('Holy Grail')}</Header>
        </Grid>
        <Grid xs={8} style={{ position: 'relative' }}>
          <ProgressProvider valueStart={0} valueEnd={totalStats.owned}>
            { (value: number) => <CircularProgressbarWithChildren
              value={totalStats.owned}
              maxValue={totalStats.exists}
              styles={buildStyles({
                pathColor: '#6E55AE',
                textColor: '#ddd',
                trailColor: '#333',
              })}
            >
              <div style={{ fontSize: '18vw' }}>{totalStats.percent}%</div>
              <div style={{ fontSize: '9vw' }}>{totalStats.owned} / {totalStats.exists}</div>
            </CircularProgressbarWithChildren>}
          </ProgressProvider>
        </Grid>
      </Container>
    </ThemeProvider>
  </>;
}