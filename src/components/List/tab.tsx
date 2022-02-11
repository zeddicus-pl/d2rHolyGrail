import { Box, Typography, Grid, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { grey } from '@mui/material/colors';
import { useTranslation } from 'react-i18next';

import { IUniqueArmors, IUniqueWeapons, IUniqueOther, ISetItems } from 'd2-holy-grail/client/src/common/definitions/union/IHolyGrailData';
import { ItemsInSaves, SaveFileStats } from '../../@types/main';

import { title } from '.';
import Popup from './popup';
import { Statistics, simplifyItemName } from '../Stats';

type TabPanelProps = {
  index: number,
  value: number,
  items?: IUniqueArmors | IUniqueWeapons | IUniqueOther,
  sets?: ISetItems,
  stats?: SaveFileStats,
  player: ItemsInSaves
};


export function TabPanel(props: TabPanelProps) {
  const { value, index, items, sets, player, stats } = props;
  const { t } = useTranslation();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ height: '100%' }}
    >
      {value === index && items && (
        <Box sx={{ p: 3, pt: 0 }}>
          {Object.keys(items).map((type) => {
            return <div key={type}>
              <Typography variant="h6" gutterBottom mt={2} component="div">{t(title(type))}</Typography>
              {
                  <Grid container spacing={2}>
                  {Object.keys((items as any)[type]).map((dif) =>
                    <Grid item md={4} key={dif}>
                      <Typography variant="subtitle1" gutterBottom component="div">{t(title(dif))}</Typography>
                      <List
                        sx={{ width: '100%', bgcolor: 'background.paper' }}
                        aria-label="contacts"
                      >
                        {Object.keys((items as any)[type][dif]).map(
                          (itemFullName) => {
                            const itemName = simplifyItemName(itemFullName);
                            return <Popup
                              itemName={itemName}
                              fullItemName={t(itemFullName)}
                              itemType="UNIQUE"
                              key={itemName}
                              saveFiles={player[itemName] ? player[itemName].saveName : []}
                            >
                              <ListItem disablePadding style={{color: player[itemName] ? grey[400] : grey[700]}}>
                                <ListItemButton>
                                  {player[itemName] && (
                                    <ListItemIcon>
                                      <DoneIcon />
                                    </ListItemIcon>
                                  )}
                                  <ListItemText inset={!player[itemName]} primary={t(itemFullName)} />
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
            {Object.keys((sets as any)).map((set) =>
              <Grid item md={4} key={set}>
                <Typography variant="h6" gutterBottom mt={2} component="div">{t(title(set))}</Typography>
                <List
                  sx={{ width: '100%', bgcolor: 'background.paper' }}
                  aria-label="contacts"
                >
                  {Object.keys((sets as any)[set]).map(
                    (itemFullName) => {
                      const itemName = simplifyItemName(itemFullName);
                      return <Popup
                        itemName={itemName}
                        fullItemName={t(itemFullName)}
                        itemType="SET"
                        key={itemName}
                        saveFiles={player[itemName] ? player[itemName].saveName : []}
                      >
                        <ListItem disablePadding key={itemName} style={{color: player[itemName] ? grey[400] : grey[700]}}>
                          <ListItemButton>
                            {player[itemName] && (
                              <ListItemIcon>
                                <DoneIcon />
                              </ListItemIcon>
                            )}
                            <ListItemText inset={!player[itemName]} primary={t(itemFullName)} />
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
      {value === index && !sets && !items && stats && (
        <Statistics items={player} stats={stats} />
      )}
    </div>
  );
}
