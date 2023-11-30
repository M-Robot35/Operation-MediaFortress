const { PassThrough } = require("stream");
const ev = require("../../services/events");
const cp = require("child_process");
const readline = require("readline");

// External modules
const ytdl = require("ytdl-core");
const ffmpeg = require("ffmpeg-static");

const downloadsProcess = async (paransDownloads, id, res, nome) => {
  const { url, qualidade, arrayParams } = paransDownloads;
  var qualityRender = { quality: qualidade };
  const sizeDownload = {
    total: 0,
  };

  const audioZero = ytdl(url, { quality: "highest" }).on(
    "progress",
    (_, downloaded, total) => {
      if (total > 0) audioZero.destroy();
    }
  );

  const videoZero = ytdl(url, qualityRender).on(
    "progress",
    (_, downloaded, total) => {
      sizeDownload.total += total;
      if (total > 0) {
        beforeCathSize();
        videoZero.destroy();
      }
    }
  );

  const beforeCathSize = () => {
    var qualityRender = { quality: qualidade };

    // Global constants
    const ref = url;
    let tracker = {};

    // Get audio and video streams
    const audio = ytdl(ref, { quality: "highest" }).on(
      "progress",
      (_, downloaded, total) => {
        tracker[`audio${id}`] = { downloaded };
      }
    );

    const video = ytdl(ref, qualityRender).on(
      "progress",
      (_, downloaded, total) => {
        const toMB = (i) => (i / 1024 / 1024).toFixed(2);
        tracker[`video${id}`] = {
          downloaded: `${toMB(downloaded)}.MB`,
          total: `${toMB(sizeDownload.total)}.MB  `,
        };
        tracker["id"] = id;

        ev.emit("bits", tracker);
      }
    );

    // Prepare the progress bar

    // Start the ffmpeg child process
    const ffmpegProcess = cp.spawn(ffmpeg, arrayParams, {
      windowsHide: true,
      stdio: [
        /* Standard: stdin, stdout, stderr */
        "inherit",
        "inherit",
        "inherit",
        /* Custom: pipe:3, pipe:4, pipe:5 */
        "pipe",
        "pipe",
        "pipe",
      ],
    });

    ffmpegProcess.on("close", () => {
      console.log("done");

      // evento para atualizar a download concluido
      ev.emit("done", { ok: " Download Concluido" });
      tracker[`video${id}`] = undefined;
      tracker[`audio${id}`] = undefined;

      // Cleanup
      /* process.stdout.write("\n\n\n\n");
      clearInterval(progressbarHandle); */
    });

    // Link streams
    // FFmpeg creates the transformer streams and we just have to insert / read data
    /*  ffmpegProcess.stdio[3].on("data", (chunk) => {
      // Start the progress bar
      if (!progressbarHandle)
        progressbarHandle = setInterval(showProgress, progressbarInterval);
      // Parse the param=value list returned by ffmpeg
      const lines = chunk.toString().trim().split("\n");
      const args = {};
      for (const l of lines) {
        const [key, value] = l.split("=");
        args[key.trim()] = value.trim();
      }
      tracker.merged = args;
    }); */

    /*  res.setHeader("Content-Disposition", `attachment; filename=é.mp4`);

    res.setHeader("Content-Type", "video/mp4"); */

    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Content-Length", sizeDownload.total);

    audio.pipe(ffmpegProcess.stdio[3]);
    video.pipe(ffmpegProcess.stdio[4]);

    const outputStream = new PassThrough();

    ffmpegProcess.stdio[5].pipe(outputStream);

    outputStream.pipe(res);
  };
};

module.exports = downloadsProcess;
