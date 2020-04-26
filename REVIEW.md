# Erela.js

## Information

    - NPM Package: https://www.npmjs.com/package/erela.js
    - Documentation: https://projects.warhammer.codes/erelajs/
    - Github Repository: https://github.com/WarHammer414/erela.js

## My Review

I don't know where to start. First off, my CPU usage was at 40ish percent, with lavalink running. I then start to play music with erela.js. My family told me that something was taking up the bandwitdh of the internet, and I could hear buffering in the music (this didnt happen with other players.) Therefore, this is an bandwitdh and CPU hog.

Secondly, the event `trackEnd` (done [here](https://github.com/Sxmurai/lavalink-client-testing/blob/erela.js/structures/Client.js)). It never emitted, which I found weird. Then, with the player it is a pain in the ass with error handling. I had to define `player` with a check to make it an empty object so it would not error.

### I rate this a 5.5/10. Hopefully v2 of erela.js will be better.