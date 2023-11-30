class Ffmpeg {
  constructor() {}

  ff_video(url, qualidade) {
    return {
      url,
      qualidade,

      arrayParams: [
        // Remove ffmpeg's console spamming
        "-loglevel",
        "8",
        "-hide_banner",
        // Redirect/Enable progress messages
        "-progress",
        "pipe:3",
        // Set inputs
        "-i",
        "pipe:3",
        "-i",
        "pipe:4",
        // Map audio & video from streams
        "-map",
        "0:a",
        "-map",
        "1:v",
        // Keep encoding
        "-c:v",
        "copy",
        // Define output container
        "-f",
        "matroska",
        "pipe:5",
      ],
    };
  }

  ff_audio() {}
}

module.exports = Ffmpeg;
