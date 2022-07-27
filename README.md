# ILI PLatform - client side
This website help you can create quizzes pack and host a quiz gameshow on Facebook/Youtube livestream. Moveover, any livestream viewer can comment to answer and this website will auto detect and give score for them (update rank realtime on livestream dashboard).
<br>
Link web: https://ili-client.herokuapp.com/
<br>
Link demo: 


https://user-images.githubusercontent.com/43669007/181209868-497a5cc1-7f38-46e0-96fc-9776015ebcfb.mp4

## Quiz types
You can host gameshows with quizzes on 4 types: 
1. Multiple-choice: 
![question_multiple_end](https://user-images.githubusercontent.com/43669007/181211590-288b0844-3d88-4aa4-bf06-745f42f5436e.png)
2. True/false:
![question_tf_end](https://user-images.githubusercontent.com/43669007/181211649-661db64c-09af-4a3b-917e-2d29220379db.png)
3. Guess keyword:
![question_pic_word_end](https://user-images.githubusercontent.com/43669007/181211691-599c6d3d-207b-4ddc-924a-5baf9f33a16d.png)
4. Guess hidden words on table:
![question_word_table](https://user-images.githubusercontent.com/43669007/181211751-17f6edea-a3ba-4fa8-9275-4fb575b87d6c.png)

### Viewer can comment to answer follow pre-defined formats. And platform can score them and update their ranks on livestream realtime:
![leader_board](https://user-images.githubusercontent.com/43669007/181212135-99b86b3b-a5f3-41ef-9971-651989c73460.png)


## Install
> 1. Clone git.

> 2. Run`npm i` to install packages.

> 3. Run `npm start` to start app.

> Note: 
>> 1. ILI use SDK of Youtube and FB to handle create/edit/stream on livestream. Those require creating application on Google/FB Dev Console and fill credentials into source code. So, if you prefer using your own apps to default apps, pls config:
>>> - `client_id` for Google app in `gapi.auth2.init()` in `public/index.html`
>>> - `appId` for FB app in `FB.init()` in `public/index.html`
>>> - `API_KEY` for Google app in `src/context/platform/helper/youtube.js`
>> 2. ILI use Firebase storage for resources... So, if you prefer others firebase storages to default config, pls change config in `src/firebase/config.js`
