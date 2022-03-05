import { useEffect, useMemo, useRef, useState } from "react"
import { holyGrailSeedData } from "../../../electron/lib/holyGrailSeedData";
import { AllSilospenItems, ItemsInSaves } from "../../@types/main.d";
import { flattenObject } from "../../utils/objects";

type Props = {
  items: ItemsInSaves,
  magicFind: Number,
  players: Number,
}

export default function DropTips({ magicFind, players, items }: Props) {
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const needsReload = useRef<boolean>(false);
  const [data, setData] = useState<AllSilospenItems>({});

  useEffect(() => {
    window.Main.on('allDropRates', (data: AllSilospenItems) => {
      if (needsReload.current) {
        needsReload.current = false;
        console.log('needs reload');
        window.Main.getAllDropRates();
      } else {
        setData(data);
        setIsLoading(false);
      }
    })
  }, []);

  useEffect(() => {
    if (!isLoading) {
      needsReload.current = false;
      window.Main.getAllDropRates();
      setIsLoading(true);
    } else {
      needsReload.current = true;
    }
  }, [magicFind, players, items]);

  const allItems: {[itemName: string]: any} = useMemo(() => {
    const flat: ItemsInSaves = {};
    flattenObject(holyGrailSeedData, flat);
    return flat;
  }, []);

  const missingItems: AllSilospenItems = useMemo(() => {
    const missing: AllSilospenItems = {};
    Object.keys(allItems)
      .filter((itemName) => !items[itemName] && data[itemName])
      .forEach((itemName) => {
        missingItems[itemName] = data[itemName];
      })
    return missing;
  }, [items]);

  /*
  const { mostItems, mostChances, topTenRarestChances } = useMemo(() => {
    // top 10 rares items chances
    const topTenRarestChances: {[boss: string]: Number} = {};
    
  }, [data, items]);
  */
  
  return <div>
    {isLoading && <span>Loading</span>}
    {!isLoading && <span></span>}
    <div>isLoading: {isLoading ? 'true' : 'false'}</div>
  </div>;
}