const ytdl = require("ytdl-core");
const ffmpeg = require("ffmpeg-static");
const cp = require("child_process");

module.exports = {
  downloads: async (req, res) => {
    const { url, qualidade, name } = req.query;

    const audioStream = ytdl(url, {
      quality: "highestaudio",
      filter: (format) => format.hasAudio && !format.hasVideo,
    });

    const videoStream = ytdl(url, {
      quality: qualidade,
      filter: (format) => format.hasVideo && !format.hasAudio,
    });

    res.header("Content-Disposition", `attachment;  filename=${name}.mkv`);

    // Start the ffmpeg child process
    const ffmpegProcess = cp.spawn(
      ffmpeg,
      [
        // Remove ffmpeg's console spamming
        "-loglevel",
        "0",
        "-hide_banner",
        "-i",
        "pipe:4",
        "-i",
        "pipe:5",
        "-reconnect",
        "1",
        "-reconnect_streamed",
        "1",
        "-reconnect_delay_max",
        "4",
        // Rescale the video
        "-vf",
        "scale=1980:1080",
        // Choose some fancy codes
        "-c:v",
        "libx265",
        "-x265-params",
        "log-level=0",
        "-c:a",
        "flac",
        // Define output container
        "-f",
        "matroska",
        "pipe:6",
      ],
      {
        windowsHide: true,
        stdio: [
          /* Standard: stdin, stdout, stderr */
          "inherit",
          "inherit",
          "inherit",
          /* Custom: pipe:4, pipe:5, pipe:6 */
          "pipe",
          "pipe",
          "pipe",
        ],
      }
    );

    audioStream.pipe(ffmpegProcess.stdio[4]);
    videoStream.pipe(ffmpegProcess.stdio[5]);
    ffmpegProcess.stdio[6].pipe(res);
  },
};
