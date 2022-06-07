# Installation guide for ILI client:
Pls check demo before: https://ili-client.herokuapp.com/
> 1. Clone git.

> 2. Run`npm i` to install packages.

> 3. Run `npm start` to start app.

> Note: 
>> 1. ILI use SDK of Youtube and FB to handle create/edit/stream on livestream. Those require creating application on Google/FB Dev Console and fill credentials into source code. So, if you prefer using your own apps to default apps, pls config:
>>> - `client_id` for Google app in `gapi.auth2.init()` in `public/index.html`
>>> - `appId` for FB app in `FB.init()` in `public/index.html`
>>> - `API_KEY` for Google app in `src/context/platform/helper/youtube.js`
>> 2. ILI use Firebase storage for resources... So, if you prefer others firebase storages to default config, pls change config in `src/firebase/config.js`