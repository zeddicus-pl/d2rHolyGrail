> **What's Holy Grail challenge?**
> The Holy Grail challenge requires player to collect every single of the 506 unique and set items in the game.

## Download

[Windows 64-bit](https://github.com/zeddicus-pl/d2rHolyGrail/releases/latest/download/HolyGrail-win32-x64.zip)

[MacOS](https://github.com/zeddicus-pl/d2rHolyGrail/releases/latest/download/HolyGrail-macos.zip)

## Streamers using the app

<iframe src="https://www.twitch.tv/videos/1295838464" style="width: 500px; height: 300px; border: 0px"></iframe>
(look out, *high volume!!*)

## Screenshots

<img width="1150" alt="Screenshot 2022-02-13 at 21 01 12" src="https://user-images.githubusercontent.com/79473394/153772561-4afe7080-f7f5-41be-8a1c-3eca99b21fa7.png">

<img width="1148" alt="Screenshot 2022-02-13 at 21 02 14" src="https://user-images.githubusercontent.com/79473394/153772725-bf082174-87d4-4a41-936f-0ac6c41f868b.png">

<img width="1132" alt="Screenshot 2022-02-13 at 21 04 27" src="https://user-images.githubusercontent.com/79473394/153772677-8929f703-da6d-4b20-b16f-426a5661cb02.png">

## How to use

- Download and unpack anywhere
- Run the application
- Upon start the app will ask you to show where your saved games location is.

Diablo 2 Ressurected store the saves in your home folder, in "Saved Games" folder.
Point the application to read saves from there, and it will remember this location (can be changed in settings).

The app will show you your Holy Grail stats, and **will continue watching for file changes**, so if you run it in the background and play the game, the stats will update automatically.

The saves files are saved to disk each time you identify an item (and when do some other actions) and each 5 minutes as well - that's when the Holy Grail app will notice the change and update the stats.

In practice this works very smooth, allowing you to see new items nearly real-time.

The app also has a HTTP feed to use in OBS (with Browser component) which can be used if you stream your Diablo 2 Ressurected gameplay.

### INFO:
this app is still in testing phase, so please report any issues. It will never try to modify save files, so this is safe to use. Also, the app may ask your windows firewall about network access, because it has that HTTP feed functionality. I'll make it configurable in future so it can be turned on/off.
