import { GameMode, Settings } from "../@types/main.d";

const defaultSettings: Settings = {
  saveDir: '',
  lang: '',
  gameMode: GameMode.Both,
  magicFind: 0,
  playersNumber: 1,
}

export default defaultSettings;