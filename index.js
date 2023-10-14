const fs = require('fs');
const ytdl = require('ytdl-core');
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above

// const songName = ytdl.getBasicInfo('https://www.youtube.com/watch?v=H2hGrsExuyc&pp=ygUEZ3p1cw%3D%3D').then(info =>{
//     return console.log(info.videoDetails.title);
// })


// ytdl('https://www.youtube.com/watch?v=H2hGrsExuyc&pp=ygUEZ3p1cw%3D%3D', {filter:'audioonly'})
//     .pipe(fs.createWriteStream(`${songName}.${mediaType}`));