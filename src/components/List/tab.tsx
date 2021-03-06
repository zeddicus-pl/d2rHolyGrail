import { Box, Typography, Grid, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Checkbox, Icon, IconButton, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Trans, useTranslation } from 'react-i18next';
import DoneIcon from '@mui/icons-material/Done';
import merge from "ts-deepmerge";

import { IUniqueArmors, IUniqueWeapons, IUniqueOther, ISetItems } from 'd2-holy-grail/client/src/common/definitions/union/IHolyGrailData';
import { IEthUniqueArmors, IEthUniqueOther, IEthUniqueWeapons } from 'd2-holy-grail/client/src/common/definitions/union/IEthGrailData';
import { AvailableRunes, GameMode, GrailType, HolyGrailStats, ItemNotes, ItemsInSaves, SaveFileStats, Settings } from '../../@types/main.d';

import runeBgImg from '../../../assets/rune.svg';

import { TabState, title } from '.';
import Popup from './popup';
import { Statistics } from '../Stats';
import { ChangeEvent, MouseEvent } from 'react';
import { countInSaves, FlatItemsCache, flattenObject, simplifyItemName } from '../../utils/objects';
import { AvailableRunesLine, CountLabel, CountLabelContainer, Rune, RuneBg, RuneIcon, RuneList, RuneName } from './styles';
import { runesMapping } from '../../../electron/lib/runesMapping';
import { runewordsMapping } from '../../../electron/lib/runewordsMapping';
import RunePopup from './runePopup';
import ManualControl from './manualControl';
import { InfoOutlined } from '@mui/icons-material';

type TabPanelProps = {
  index: number,
  value: number,
  items?: IUniqueArmors | IUniqueWeapons | IUniqueOther,
  ethItems?: IEthUniqueArmors | IEthUniqueWeapons | IEthUniqueOther,
  sets?: ISetItems,
  stats?: SaveFileStats,
  runes?: {[runeId: string]: string},
  runewords?: {[runewordId: string]: string}
  player: ItemsInSaves,
  ethPlayer: ItemsInSaves,
  search: string,
  noFileSummary?: boolean,
  noAnimation?: boolean,
  appSettings: Settings,
  holyGrailStats: HolyGrailStats,
  itemNotes?: ItemNotes,
  availableRunes?: AvailableRunes,
};

const getRuneIcon = (runeType: string): string => {
  const runeNo = parseInt(runeType.replace("r", ""));
  return "123456789ABCDEFGHIJKLMNOPQRSTUVWX".charAt(runeNo - 1);
}

const getCacheKey = (tabIndex: TabState, ethereal: boolean, grailType: GrailType): keyof FlatItemsCache | null => {
  if (ethereal) {
    switch (tabIndex) {
      case TabState.UniqueArmor:
        return 'etharmor';
      case TabState.UniqueWeapons:
        return 'ethweapon';
      case TabState.UniqueOther:
        return 'ethother';
      default:
        return null;
    }
  }
  const shouldHideNormalEthItems = grailType === GrailType.Each || grailType === GrailType.Normal;
  switch (tabIndex) {
    case TabState.UniqueArmor:
      return 'armor';
    case TabState.UniqueWeapons:
      return `weapon${shouldHideNormalEthItems ? 'E' : ''}`;
    case TabState.UniqueOther:
      return `other${shouldHideNormalEthItems ? 'E' : ''}`;
    case TabState.Runes:
      return 'runes';          
    case TabState.Runes:
      return 'runewords';          
    case TabState.Sets:
      return 'sets';
    default:
      return null;
  }
}

export function TabPanel(props: TabPanelProps) {
  const { value, index, items, ethItems, sets, runes, runewords, player, ethPlayer, stats, search,
    noFileSummary, noAnimation, appSettings, holyGrailStats, itemNotes = {}, availableRunes = {} } = props;
  const { gameMode, grailType } = appSettings;
  const { t } = useTranslation();

  let flatItems: {[k: string]: {}} = {};
  let ethFlatItems: {[k: string]: {}} = {};

  let itemList = sets || runewords || runes || merge(items || {}, ethItems || {});
  if (value === index) {
    if (itemList) {
      flatItems = flattenObject(items || {}, getCacheKey(index, false, grailType));
      ethFlatItems = flattenObject(ethItems || {}, getCacheKey(index, true, grailType));
    
      const shouldDisplayItem = (itemName: string): boolean => {
        if (appSettings.grailType === GrailType.Ethereal && !ethFlatItems[itemName]) {
          return false;
        }
        return !!flatItems[itemName] || !!ethFlatItems[itemName]
          || (!!runes && !!runes[itemName])
          || (!!runewords && !!runewords[itemName]);
      }

      const latinMap: {[key:string]: string} = { "??":"A","??":"A","???":"A","???":"A","???":"A","???":"A","???":"A","??":"A","??":"A","???":"A","???":"A","???":"A","???":"A","???":"A","??":"A","??":"A","??":"A","??":"A","???":"A","??":"A","??":"A","???":"A","??":"A","??":"A","??":"A","??":"A","??":"A","???":"A","??":"A","??":"A","???":"AA","??":"AE","??":"AE","??":"AE","???":"AO","???":"AU","???":"AV","???":"AV","???":"AY","???":"B","???":"B","??":"B","???":"B","??":"B","??":"B","??":"C","??":"C","??":"C","???":"C","??":"C","??":"C","??":"C","??":"C","??":"D","???":"D","???":"D","???":"D","???":"D","??":"D","???":"D","??":"D","??":"D","??":"D","??":"D","??":"DZ","??":"DZ","??":"E","??":"E","??":"E","??":"E","???":"E","??":"E","???":"E","???":"E","???":"E","???":"E","???":"E","???":"E","??":"E","??":"E","???":"E","??":"E","??":"E","???":"E","??":"E","??":"E","???":"E","???":"E","??":"E","??":"E","???":"E","???":"E","???":"ET","???":"F","??":"F","??":"G","??":"G","??":"G","??":"G","??":"G","??":"G","??":"G","???":"G","??":"G","???":"H","??":"H","???":"H","??":"H","???":"H","???":"H","???":"H","???":"H","??":"H","??":"I","??":"I","??":"I","??":"I","??":"I","???":"I","??":"I","???":"I","??":"I","??":"I","???":"I","??":"I","??":"I","??":"I","??":"I","??":"I","???":"I","???":"D","???":"F","???":"G","???":"R","???":"S","???":"T","???":"IS","??":"J","??":"J","???":"K","??":"K","??":"K","???":"K","???":"K","???":"K","??":"K","???":"K","???":"K","???":"K","??":"L","??":"L","??":"L","??":"L","???":"L","???":"L","???":"L","???":"L","???":"L","???":"L","??":"L","???":"L","??":"L","??":"L","??":"LJ","???":"M","???":"M","???":"M","???":"M","??":"N","??":"N","??":"N","???":"N","???":"N","???":"N","??":"N","??":"N","???":"N","??":"N","??":"N","??":"N","??":"NJ","??":"O","??":"O","??":"O","??":"O","???":"O","???":"O","???":"O","???":"O","???":"O","??":"O","??":"O","??":"O","??":"O","???":"O","??":"O","??":"O","??":"O","???":"O","??":"O","???":"O","???":"O","???":"O","???":"O","???":"O","??":"O","???":"O","???":"O","??":"O","???":"O","???":"O","??":"O","??":"O","??":"O","??":"O","??":"O","??":"O","???":"O","???":"O","??":"O","??":"OI","???":"OO","??":"E","??":"O","??":"OU","???":"P","???":"P","???":"P","??":"P","???":"P","???":"P","???":"P","???":"Q","???":"Q","??":"R","??":"R","??":"R","???":"R","???":"R","???":"R","??":"R","??":"R","???":"R","??":"R","???":"R","???":"C","??":"E","??":"S","???":"S","??":"S","???":"S","??":"S","??":"S","??":"S","???":"S","???":"S","???":"S","??":"T","??":"T","???":"T","??":"T","??":"T","???":"T","???":"T","??":"T","???":"T","??":"T","??":"T","???":"A","???":"L","??":"M","??":"V","???":"TZ","??":"U","??":"U","??":"U","??":"U","???":"U","??":"U","??":"U","??":"U","??":"U","??":"U","???":"U","???":"U","??":"U","??":"U","??":"U","???":"U","??":"U","???":"U","???":"U","???":"U","???":"U","???":"U","??":"U","??":"U","???":"U","??":"U","??":"U","??":"U","???":"U","???":"U","???":"V","???":"V","??":"V","???":"V","???":"VY","???":"W","??":"W","???":"W","???":"W","???":"W","???":"W","???":"W","???":"X","???":"X","??":"Y","??":"Y","??":"Y","???":"Y","???":"Y","???":"Y","??":"Y","???":"Y","???":"Y","??":"Y","??":"Y","???":"Y","??":"Z","??":"Z","???":"Z","???":"Z","??":"Z","???":"Z","??":"Z","???":"Z","??":"Z","??":"IJ","??":"OE","???":"A","???":"AE","??":"B","???":"B","???":"C","???":"D","???":"E","???":"F","??":"G","??":"G","??":"H","??":"I","??":"R","???":"J","???":"K","??":"L","???":"L","???":"M","??":"N","???":"O","??":"OE","???":"O","???":"OU","???":"P","??":"R","???":"N","???":"R","???":"S","???":"T","???":"E","???":"R","???":"U","???":"V","???":"W","??":"Y","???":"Z","??":"a","??":"a","???":"a","???":"a","???":"a","???":"a","???":"a","??":"a","??":"a","???":"a","???":"a","???":"a","???":"a","???":"a","??":"a","??":"a","??":"a","??":"a","???":"a","??":"a","??":"a","???":"a","??":"a","??":"a","??":"a","???":"a","???":"a","??":"a","??":"a","???":"a","???":"a","??":"a","???":"aa","??":"ae","??":"ae","??":"ae","???":"ao","???":"au","???":"av","???":"av","???":"ay","???":"b","???":"b","??":"b","???":"b","???":"b","???":"b","??":"b","??":"b","??":"o","??":"c","??":"c","??":"c","???":"c","??":"c","??":"c","??":"c","??":"c","??":"c","??":"d","???":"d","???":"d","??":"d","???":"d","???":"d","??":"d","???":"d","???":"d","???":"d","???":"d","??":"d","??":"d","??":"d","??":"i","??":"j","??":"j","??":"j","??":"dz","??":"dz","??":"e","??":"e","??":"e","??":"e","???":"e","??":"e","???":"e","???":"e","???":"e","???":"e","???":"e","???":"e","??":"e","??":"e","???":"e","??":"e","??":"e","???":"e","??":"e","??":"e","???":"e","???":"e","???":"e","??":"e","???":"e","??":"e","???":"e","???":"e","???":"et","???":"f","??":"f","???":"f","???":"f","??":"g","??":"g","??":"g","??":"g","??":"g","??":"g","??":"g","???":"g","???":"g","??":"g","???":"h","??":"h","???":"h","??":"h","???":"h","???":"h","???":"h","???":"h","??":"h","???":"h","??":"h","??":"hv","??":"i","??":"i","??":"i","??":"i","??":"i","???":"i","???":"i","??":"i","??":"i","???":"i","??":"i","??":"i","??":"i","???":"i","??":"i","??":"i","???":"i","???":"d","???":"f","???":"g","???":"r","???":"s","???":"t","???":"is","??":"j","??":"j","??":"j","??":"j","???":"k","??":"k","??":"k","???":"k","???":"k","???":"k","??":"k","???":"k","???":"k","???":"k","???":"k","??":"l","??":"l","??":"l","??":"l","??":"l","???":"l","??":"l","???":"l","???":"l","???":"l","???":"l","???":"l","??":"l","??":"l","???":"l","??":"l","??":"l","??":"lj","??":"s","???":"s","???":"s","???":"s","???":"m","???":"m","???":"m","??":"m","???":"m","???":"m","??":"n","??":"n","??":"n","???":"n","??":"n","???":"n","???":"n","??":"n","??":"n","???":"n","??":"n","???":"n","???":"n","??":"n","??":"n","??":"nj","??":"o","??":"o","??":"o","??":"o","???":"o","???":"o","???":"o","???":"o","???":"o","??":"o","??":"o","??":"o","??":"o","???":"o","??":"o","??":"o","??":"o","???":"o","??":"o","???":"o","???":"o","???":"o","???":"o","???":"o","??":"o","???":"o","???":"o","???":"o","??":"o","???":"o","???":"o","??":"o","??":"o","??":"o","??":"o","??":"o","???":"o","???":"o","??":"o","??":"oi","???":"oo","??":"e","???":"e","??":"o","???":"o","??":"ou","???":"p","???":"p","???":"p","??":"p","???":"p","???":"p","???":"p","???":"p","???":"p","???":"q","??":"q","??":"q","???":"q","??":"r","??":"r","??":"r","???":"r","???":"r","???":"r","??":"r","??":"r","???":"r","??":"r","???":"r","??":"r","???":"r","???":"r","??":"r","??":"r","???":"c","???":"c","??":"e","??":"r","??":"s","???":"s","??":"s","???":"s","??":"s","??":"s","??":"s","???":"s","???":"s","???":"s","??":"s","???":"s","???":"s","??":"s","??":"g","???":"o","???":"o","???":"u","??":"t","??":"t","???":"t","??":"t","??":"t","???":"t","???":"t","???":"t","???":"t","??":"t","???":"t","???":"t","??":"t","??":"t","??":"t","???":"th","??":"a","???":"ae","??":"e","???":"g","??":"h","??":"h","??":"h","???":"i","??":"k","???":"l","??":"m","??":"m","???":"oe","??":"r","??":"r","??":"r","???":"r","??":"t","??":"v","??":"w","??":"y","???":"tz","??":"u","??":"u","??":"u","??":"u","???":"u","??":"u","??":"u","??":"u","??":"u","??":"u","???":"u","???":"u","??":"u","??":"u","??":"u","???":"u","??":"u","???":"u","???":"u","???":"u","???":"u","???":"u","??":"u","??":"u","???":"u","??":"u","???":"u","??":"u","??":"u","???":"u","???":"u","???":"ue","???":"um","???":"v","???":"v","???":"v","??":"v","???":"v","???":"v","???":"v","???":"vy","???":"w","??":"w","???":"w","???":"w","???":"w","???":"w","???":"w","???":"w","???":"x","???":"x","???":"x","??":"y","??":"y","??":"y","???":"y","???":"y","???":"y","??":"y","???":"y","???":"y","??":"y","???":"y","??":"y","???":"y","??":"z","??":"z","???":"z","??":"z","???":"z","??":"z","???":"z","??":"z","???":"z","???":"z","???":"z","??":"z","??":"z","??":"z","???":"ff","???":"ffi","???":"ffl","???":"fi","???":"fl","??":"ij","??":"oe","???":"st","???":"a","???":"e","???":"i","???":"j","???":"o","???":"r","???":"u","???":"v","???":"x"};
      const simplifyName = (str: string) => str.toLowerCase().replace(/[^A-Za-z0-9[\] ]/g,(a) => latinMap[a] || a).replace(/[^a-z0-9   ]/gi, '');
      const searchStr = search.trim().length ? simplifyName(search) : null;
      const filterWithSearch = (object: {[key: string]: any}, search: string | null): {[key: string]: any} => {
        const out: {[key: string]: any} = {};
        Object.keys(object).forEach((key: string) => {
          if (typeof object[key] === 'object' && Object.keys(object[key]).length > 0) {
            const leaf = filterWithSearch(object[key], search);
            if (Object.keys(leaf).length) {
              out[key] = leaf;
            }
          } else {
            if (shouldDisplayItem(simplifyItemName(key)) && (!search || simplifyName(t(key)).indexOf(search) !== -1)) {
              out[key] = object[key];
            }
          }
        });
        return out;
      }
      // @ts-ignore
      itemList = filterWithSearch(itemList, searchStr);
    }
  }

  if (appSettings.onlyMissing) {
    if (itemList) {
      const filterWithOnlyMissing = (object: {[key: string]: any}): {[key: string]: any} => {
        const out: {[key: string]: any} = {};
        Object.keys(object).forEach((key: string) => {
          if (typeof object[key] === 'object' && Object.keys(object[key]).length > 0) {
            const leaf = filterWithOnlyMissing(object[key]);
            if (Object.keys(leaf).length) {
              out[key] = leaf;
            }
          } else {
            const simplified = simplifyItemName(key);
            if (((appSettings.grailType !== GrailType.Ethereal) && flatItems[simplified] && !player[simplified])
            || ((appSettings.grailType === GrailType.Each || appSettings.grailType === GrailType.Ethereal) && ethFlatItems[simplified] && !ethPlayer[simplified])
            || (runewords && !player[simplified])) {
              out[key] = object[key];
            }
          }
        });
        return out;
      }
      // @ts-ignore
      itemList = filterWithOnlyMissing(runewords || runes || itemList);
    }
  }

  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>, itemName: string) => {
    event.stopPropagation();
    event.preventDefault();
    window.Main.saveManualItem(itemName, event.target.checked ? 1 : 0);
  }
  const handleEthStatusChange = (event: ChangeEvent<HTMLInputElement>, itemName: string) => {
    event.stopPropagation();
    event.preventDefault();
    window.Main.saveManualEthItem(itemName, event.target.checked ? 1 : 0);
  }

  const handleNumberChange = (event: MouseEvent<HTMLButtonElement>, itemName: string, count: number) => {
    event.stopPropagation();
    event.preventDefault();
    window.Main.saveManualItem(itemName, count);
  }
  const handleEthNumberChange = (event: MouseEvent<HTMLButtonElement>, itemName: string, count: number) => {
    event.stopPropagation();
    event.preventDefault();
    window.Main.saveManualEthItem(itemName, count);
  }

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ height: '100%' }}
    >
      {index !== TabState.Statistics && itemList && !search && appSettings.onlyMissing && Object.keys(itemList).length === 0 && (
        <Box sx={{ p: 3, pt: 5 }}>
          <Trans>No missing items</Trans>
        </Box>
      )}
      {value === index && items && (
        <Box sx={{ p: 3, pt: 0 }}>
          {Object.keys((itemList as any)).map((type) => {
            return <div key={type+index}>
              <Typography variant="h6" gutterBottom mt={2} component="div">{t(title(type))}</Typography>
              {
                  <Grid container spacing={2}>
                  {Object.keys((itemList as any)[type]).map((dif) =>
                    <Grid item md={4} key={type+dif+index}>
                      <Typography variant="subtitle1" gutterBottom component="div">{t(title(dif))}</Typography>
                      <List
                        sx={{ width: '100%', bgcolor: 'background.paper' }}
                        aria-label="contacts"
                      >
                        {Object.keys((itemList as any)[type][dif]).map(
                          (itemFullName) => {
                            const itemName = simplifyItemName(itemFullName);
                            return <Popup
                              itemName={itemName}
                              fullItemName={t(itemFullName)}
                              itemType="UNIQUE"
                              key={index+type+dif+itemName}
                              saveFiles={player[itemName] ? player[itemName].inSaves : {}}
                              ethSaveFiles={ethPlayer[itemName] ? ethPlayer[itemName].inSaves : {}}
                              appSettings={appSettings}
                              itemNote={itemNotes[itemName]}
                            >
                              <ListItem
                                disablePadding
                                style={{color: player[itemName] || ethPlayer[itemName] ? grey[400] : grey[700]}}
                                secondaryAction={itemNotes[itemName] ? <Tooltip title={itemNotes[itemName]}>
                                  <InfoOutlined fontSize='small' color='disabled' />
                                </Tooltip> : null}
                              >
                                <ListItemButton>
                                  {gameMode !== GameMode.Manual && <>
                                    {ethPlayer[itemName] ? (
                                      <CountLabelContainer>
                                        <ListItemIcon className="ethCheckbox" style={{ minWidth: 32 }}>
                                          <DoneIcon />
                                        </ListItemIcon>
                                        {
                                          ethPlayer[itemName] &&
                                          Object.keys(ethPlayer[itemName].inSaves).length > 1 &&
                                          <CountLabel className="countLabel">x{countInSaves(ethPlayer[itemName])}</CountLabel>
                                        }
                                      </CountLabelContainer>
                                    ) : <div style={{ width: 32, display: 'inline-block' }}></div>}
                                    {player[itemName] ? (
                                      <CountLabelContainer>
                                        <ListItemIcon>
                                          <DoneIcon />
                                        </ListItemIcon>
                                        {
                                          player[itemName] &&
                                          Object.keys(player[itemName].inSaves).length > 1 &&
                                          <CountLabel className="countLabel">x{countInSaves(player[itemName])}</CountLabel>
                                        }
                                      </CountLabelContainer>
                                    ) : <div style={{ width: 56, display: 'inline-block' }}></div>}
                                  </>}
                                  {gameMode === GameMode.Manual && (
                                    <ListItemIcon>
                                      <ManualControl
                                        isPlaceholder={grailType !== GrailType.Each || !ethFlatItems[itemName]}
                                        className="ethCheckbox"
                                        items={ethPlayer}
                                        itemName={itemName}
                                        onChange={handleEthStatusChange}
                                        onNumberChange={handleEthNumberChange}
                                      />
                                      <ManualControl
                                        isPlaceholder={!flatItems[itemName]}
                                        items={player}
                                        itemName={itemName}
                                        onChange={handleStatusChange}
                                        onNumberChange={handleNumberChange}
                                      />
                                    </ListItemIcon>
                                  )}
                                  <ListItemText primary={t(itemFullName)} />
                                </ListItemButton>
                              </ListItem>
                            </Popup>
                          })}
                      </List>
                    </Grid>
                  )}
                </Grid>
              }
            </div>
          })}
        </Box>
      )}
      {value === index && sets && (
        <Box sx={{ p: 3, pt: 0 }}>
        {
            <Grid container spacing={2}>
            {Object.keys((itemList as any)).map((set) =>
              <Grid item md={4} key={index+set}>
                <Typography variant="h6" gutterBottom mt={2} component="div">{t(title(set))}</Typography>
                <List
                  sx={{ width: '100%', bgcolor: 'background.paper' }}
                  aria-label="contacts"
                >
                  {Object.keys((itemList as any)[set]).map(
                    (itemFullName) => {
                      const itemName = simplifyItemName(itemFullName);
                      return <Popup
                        itemName={itemName}
                        fullItemName={t(itemFullName)}
                        itemType="SET"
                        key={index+set+itemName}
                        saveFiles={player[itemName] ? player[itemName].inSaves : {}}
                        ethSaveFiles={ethPlayer[itemName] ? ethPlayer[itemName].inSaves : {}}
                        appSettings={appSettings}
                        itemNote={itemNotes[itemName]}
                      >
                        <ListItem
                          disablePadding
                          style={{color: player[itemName] || ethPlayer[itemName] ? grey[400] : grey[700]}}
                          secondaryAction={itemNotes[itemName] ? <Tooltip title={itemNotes[itemName]}>
                            <InfoOutlined fontSize='small' color='disabled' />
                          </Tooltip> : null}
                        >
                          <ListItemButton>
                            {gameMode !== GameMode.Manual && <>
                              {ethPlayer[itemName] ? (
                                <CountLabelContainer>
                                  <ListItemIcon className="ethCheckbox" style={{ minWidth: 32 }}>
                                    <DoneIcon />
                                  </ListItemIcon>
                                  {
                                    ethPlayer[itemName] &&
                                    Object.keys(ethPlayer[itemName].inSaves).length > 1 &&
                                    <CountLabel className="countLabel">x{countInSaves(ethPlayer[itemName])}</CountLabel>
                                  }
                                </CountLabelContainer>
                              ) : <div style={{ width: 32, display: 'inline-block' }}></div>}
                              {player[itemName] ? (
                                <CountLabelContainer>
                                  <ListItemIcon>
                                    <DoneIcon />
                                  </ListItemIcon>
                                  {
                                    player[itemName] &&
                                    Object.keys(player[itemName].inSaves).length > 1 &&
                                    <CountLabel className="countLabel">x{countInSaves(player[itemName])}</CountLabel>
                                  }
                                </CountLabelContainer>
                              ) : <div style={{ width: 56, display: 'inline-block' }}></div>}
                            </>}
                            {gameMode === GameMode.Manual && (
                              <ListItemIcon>
                                <ManualControl
                                  isPlaceholder={grailType !== GrailType.Each || !ethFlatItems[itemName]}
                                  className="ethCheckbox"
                                  items={ethPlayer}
                                  itemName={itemName}
                                  onChange={handleEthStatusChange}
                                  onNumberChange={handleEthNumberChange}
                                />
                                <ManualControl
                                  isPlaceholder={!flatItems[itemName]}
                                  items={player}
                                  itemName={itemName}
                                  onChange={handleStatusChange}
                                  onNumberChange={handleNumberChange}
                                />
                              </ListItemIcon>
                            )}
                            <ListItemText primary={t(itemFullName)} />
                          </ListItemButton>
                        </ListItem>
                      </Popup>
                    })}
                </List>
              </Grid>
            )}
          </Grid>
        }
        </Box>
      )}
      {value === index && runes && !runewords && (
        <Box sx={{ p: 3 }}>
        {
            <Grid container spacing={2}>
            {Object.keys((runes as any)).map((itemName: string) => {
              const runeId = (itemList as any)[itemName];
              if (!runeId) return;
              const rune = runesMapping[runeId];
              return <Grid item sm={4} xs={6} key={index+itemName}>
                <RunePopup
                  itemName={itemName}
                  fullItemName={rune.name}
                  itemType={runeId}
                  saveFiles={player[itemName] ? player[itemName].inSaves : {}}
                  appSettings={appSettings}
                  disabled={!player[itemName]}
                  itemNote={itemNotes[itemName]}
                >
                  <ListItem
                    disablePadding
                    style={{color: player[itemName] ? grey[400] : grey[700]}}
                    secondaryAction={itemNotes[itemName] ? <Tooltip title={itemNotes[itemName]}>
                      <InfoOutlined fontSize='small' color='disabled' />
                    </Tooltip> : null}
                  >
                    <ListItemButton>
                      {gameMode !== GameMode.Manual && player[itemName] ? (
                        <CountLabelContainer>
                          <ListItemIcon>
                            <DoneIcon />
                          </ListItemIcon>
                          {
                            player[itemName] &&
                            Object.keys(player[itemName].inSaves).length > 1 &&
                            <CountLabel className="countLabel">x{countInSaves(player[itemName])}</CountLabel>
                          }
                        </CountLabelContainer>
                      ) : <div style={{ width: 56, display: 'inline-block' }}></div>}
                      {gameMode === GameMode.Manual && (
                        <ListItemIcon>
                          <ManualControl
                            items={player}
                            itemName={itemName}
                            onChange={handleStatusChange}
                            onNumberChange={handleNumberChange}
                          />
                        </ListItemIcon>
                      )}
                      <ListItemText
                        primary={<div style={{ display: "flex" }}>
                          <Rune style={{ opacity: player[itemName] ? 1 : 0.5 }}>
                            <RuneBg src={runeBgImg} />
                            <RuneIcon>{getRuneIcon(runeId)}</RuneIcon>
                          </Rune>
                          <div>
                            <div>{rune.name}</div>
                            {(availableRunes && availableRunes[itemName] && availableRunes[itemName])
                              ? <AvailableRunesLine>{countInSaves(availableRunes[itemName])} <Trans>unused</Trans></AvailableRunesLine>
                              : null
                            }
                          </div>
                        </div>}
                      />
                    </ListItemButton>
                  </ListItem>
                </RunePopup>
              </Grid>
            }
          )}
          </Grid>
        }
        </Box>
      )}
      {value === index && runewords && (
        <Box sx={{ p: 3 }}>
        {
            <Grid container spacing={0}>
            {Object.keys((runewords as any)).map((itemName: string) => {
              const runewordId = (itemList as any)[itemName];
              if (!runewordId) return;
              const runeword = runewordsMapping[runewordId];
              return <Grid item md={4} xs={6} key={index+itemName}>
                <RunePopup
                  itemName={itemName}
                  fullItemName={t(runeword.name)}
                  itemType={'RUNEWORD'}
                  saveFiles={player[itemName] ? player[itemName].inSaves : {}}
                  appSettings={appSettings}
                  disabled={!player[itemName]}
                  itemNote={itemNotes[itemName]}
                >
                  <ListItem
                    disablePadding
                    style={{color: player[itemName] ? grey[400] : grey[700]}}
                    secondaryAction={itemNotes[itemName] ? <Tooltip title={itemNotes[itemName]}>
                      <InfoOutlined fontSize='small' color='disabled' />
                    </Tooltip> : null}
                  >
                    <ListItemButton>
                      {gameMode !== GameMode.Manual && player[itemName] ? (
                        <CountLabelContainer>
                          <ListItemIcon>
                            <DoneIcon />
                          </ListItemIcon>
                          {
                            player[itemName] &&
                            Object.keys(player[itemName].inSaves).length > 1 &&
                            <CountLabel className="countLabel">x{countInSaves(player[itemName])}</CountLabel>
                          }
                        </CountLabelContainer>
                      ) : <div style={{ width: 56, display: 'inline-block' }}></div>}
                      {gameMode === GameMode.Manual && (
                        <ListItemIcon>
                          <ManualControl
                            items={player}
                            itemName={itemName}
                            onChange={handleStatusChange}
                            onNumberChange={handleNumberChange}
                          />
                        </ListItemIcon>
                      )}
                      <ListItemText
                        primary={<h3>{t(runeword.name)}</h3>}
                        secondary={<RuneList>{runeword.runes.map(runeName => {
                          const rune = runes && runes[runeName] && runesMapping[runes[runeName]];
                          if (!rune) return;
                          return <Rune style={{ opacity: player[itemName] ? 1 : 0.5 }}>
                            <RuneBg src={runeBgImg} />
                            <RuneIcon>{getRuneIcon(runes[runeName])}</RuneIcon>
                            <RuneName>{rune.name}</RuneName>
                          </Rune>;
                        })}</RuneList>}
                      />
                    </ListItemButton>
                  </ListItem>
                </RunePopup>
              </Grid>
            }
          )}
          </Grid>
        }
        </Box>
      )}
      {value === index && !sets && !items && stats && (
        <Statistics
          stats={!noFileSummary && gameMode !== GameMode.Manual ? stats : undefined}
          noAnimation={noAnimation}
          appSettings={appSettings}
          holyGrailStats={holyGrailStats}
        />
      )}
    </div>
  );
}
