> **What's Holy Grail challenge?**
> The Holy Grail challenge requires player to collect every single of the 506 unique and set items in the game.

## Download

[Windows 64-bit installer](https://github.com/zeddicus-pl/d2rHolyGrail/releases/latest/download/HolyGrail-setup.exe)

> Info: I'm not planing to spend few hundred dollars to sign this app, so forgive me the Windows warning when you run this app.

## Streamers using the app

I created this application for my favourite streamer [NadinWins](https://www.twitch.tv/nadinwins) and I made it Open Source, so other players, and other streamers, can use and modify it freely.

(look in the upper right corner, and watch out, **high volume!**)

<iframe src="https://clips.twitch.tv/embed?clip=DreamyPlacidScallionPeoplesChamp-QfdXJQ9MKHuO9owj&parent=holygrail.link" style="margin:auto; width: 640px; height: 480px; border: 0px; max-width: 100%"></iframe>

## Changelog

### v2.0.1
- Items from D2R Shared Stash are included in the count
- You can select from 4 main types of grail:
  - Normal & ethereal items count as one
  - Only normal
  - Only ehereal
  - Normal & Ethereal count separetely
- Includes Runes and Runewords count (configurable)
- Plays sound when new item is found (configurable)
- Switch control to only show missing items
- Automatic checking for updates
- Improvements in UI speed
- By default folder open dialog opens in "Saved Games" folder

### v1.7.0
- Fixed reading new save format used in PTR games
- Added magic find and number of players settings for drop calculator
- Added small numbers next to "ticks" representing how many copies of given item you have
- Fixed some PL translations
- The Silospen Drop Calculator server is now integrated into the app, so it works offline and much faster. **This only works if you have Java 9 installed in your system.** I'm working on making this Java 8 compatible too, but for now it only works with Java 9. If there is no Java, or too old, it will fallback to reading from Silospen server

### v1.6.1
- Fixed performance issues
- Added app version information in the settings screen
- Corrected PL items translations
- Item count in summary now only shows HG items
- Fixed bug that caused some old save files not the read correctly

### v1.6.0
- Added manual selection mode
- Added choosing between softcore and hardcode game modes
- Added sharing functionality

### v1.5.1
- Added Plugy support
- Added search functionality
- Few minor bugfix and PL translation fixes

Beta versions: 1.4 and below

Older versions can be found on [the releases page on GitHub](https://github.com/zeddicus-pl/d2rHolyGrail/releases)

## Screenshots

Welcome screen:

<img width="838" alt="image" src="https://user-images.githubusercontent.com/5413271/178063053-6940aa35-1a14-493f-8ba3-5d780d2a935d.png">

Statistics screen (simple Grail):

<img width="838" alt="image" src="https://user-images.githubusercontent.com/5413271/178061570-64cc1866-e51c-4405-8d89-ef801bef8f17.png">

Statistics screen (normal + eth + runes + runewords Grail):

<img width="788" alt="image" src="https://user-images.githubusercontent.com/5413271/178061757-c22cb983-ce4c-419d-a1d8-5a7006e2c1ee.png">

Item list (automatic save reading mode):

<img width="838" alt="image" src="https://user-images.githubusercontent.com/5413271/178061927-5cab7361-242f-4e4a-a140-595898963117.png">

Runeword list:

<img width="844" alt="image" src="https://user-images.githubusercontent.com/5413271/178062113-3a27b971-9940-4788-afc0-c7cfbe40957c.png">

Item list (manual selection mode)

<img width="838" alt="image" src="https://user-images.githubusercontent.com/5413271/178062198-77e3485e-96fd-47ff-a418-a6d1f69bebfe.png">

Settings:

<img width="838" alt="image" src="https://user-images.githubusercontent.com/5413271/178062250-3c055863-d1f0-4c8c-91dd-31550ed6bd3c.png">

## How to use

- Install the app
- Run it from the desktop shortcut or Start menu
- Upon start the app will ask you to show where your saved games location is.

Diablo 2 Resurrected store the saves in your home folder, in "Saved Games" folder.
Point the application to read saves from there, and it will remember this location (can be changed in settings).

The Holy Grail app will work with D2R saves, as well as classic D2 LoD saves, it also supports reading Plugy stash files (if placed in the same folder as game saves, not in subfolder)

The app will show you your Holy Grail stats, and **will continue watching for file changes**, so if you run it in the background and play the game, the stats will update automatically.

The saves files are saved to disk each time you identify an item (and when do some other actions) and each 5 minutes as well - that's when the Holy Grail app will notice the change and update the stats.

In practice this works very smooth, allowing you to see new items nearly real-time.

The app also has a HTTP feed to use in OBS (with Browser component) which can be used if you stream your Diablo 2 Resurrected gameplay.

### Licence and credits

The app uses ISC licence.

If you want to contribute your code changes, or would like to create another translation (you'll have to translate all item names etc.) then feel free to PR it on GitHub. If you are not a programmer, and would like to translate the app - contact us [on Discord](https://discord.com/channels/837488572838838292/939605281288122418)

GitHub repo: [https://github.com/zeddicus-pl/d2rHolyGrail](https://github.com/zeddicus-pl/d2rHolyGrail)

Libraries and applications I use, or get data from:
- D2S file parsing library: [https://github.com/dschu012/d2s](https://github.com/dschu012/d2s)
- Item list and UI inspiration: [https://d2-holy-grail.herokuapp.com](https://d2-holy-grail.herokuapp.com) / [https://github.com/Nasicus/d2-holy-grail](https://github.com/Nasicus/d2-holy-grail)

The app was developed together with NadinWins stream community. Big thanks to everyone involved in testing and creation of Polish translation of all the items.
