import { useState, useEffect, useMemo } from 'react';
import { io } from "socket.io-client";
import { FileReaderResponse, Settings } from '../@types/main.d';
import { useTranslation } from 'react-i18next';
import { Grid, createTheme } from '@mui/material';
import { getHolyGrailSeedData } from '../../electron/lib/holyGrailSeedData';
import { ThemeProvider } from '@mui/system';
import { GlobalStyle } from '../styles/GlobalStyle';
import { computeStats } from '../utils/objects';

import { Header, Container } from './styles';
import 'react-circular-progressbar/dist/styles.css';
import { Statistics } from '../components/Stats';

export default function StreamApp() {
  const [settings, setSettings] = useState<Settings>({} as Settings);
  const [data, setData] = useState<FileReaderResponse>({ items: {}, ethItems: {}, stats: {}, availableRunes: {} });
  const totalStats = useMemo(
    () => computeStats(data.items, data.ethItems, getHolyGrailSeedData(settings, false), getHolyGrailSeedData(settings, true), settings),
    [data, settings]
  );
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const socket = io();
    socket.on("updatedSettings", function (settings: Settings) {
      i18n.changeLanguage(settings.lang);
      setSettings(settings);
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
        <Grid item xs={12}>
          <Header>{t('Holy Grail')}</Header>
        </Grid>
        <Grid item xs={8} style={{ position: 'relative' }}>
          <Statistics appSettings={settings} holyGrailStats={totalStats} onlyCircle />
        </Grid>
      </Container>
    </ThemeProvider>
  </>;
}