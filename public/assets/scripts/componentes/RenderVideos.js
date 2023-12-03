import { idSocket } from "../websocket.js";
//import Vue from "./components.js";
import server from "../../../config.js";

export default class RenderVideos {
  constructor() {
    this.listVideos = document.querySelector(".container-videos");
  }

  static execute(dados) {
    console.log(dados);

    const render = new RenderVideos();
    render.tempate(dados);

    return render;
  }

  tempate(data) {
    const {
      author,
      description,
      ownerProfileUrl,
      thumbnail,
      title,
      video_url,
    } = data.info;
    console.log("oi", data.qualidades[0].qualityLabel);

    const qualidades = data.qualidades.map((item) => {
      return ` <option   value=${item.itag}>
            ${item.qualityLabel}
           </option> `;
    });

    const template = `
            <div class='componenteVideo thiago'>
            <img src="${thumbnail.url}" alt="imagem thumbnail">
            <div class="videos-items">
                <div class="body-item">
                    <div title='${title}'>${title}</div>
                    <div>
                        <div title='Canal : ${author.name}'>${author.name}</div>
                        <div class="d-flex">
                        <span class="fw-bold text-center p-2 rounded">QUALIDADE : </span>                           
                        <div class="">
                            <select class="form-select-sm"  aria-label="Default select example"  value=${data.qualidades[0].qualityLabel} id="qualidade">   
                              ${qualidades}                         
                            </select>
                        </div>
                    </div>                 
                    
                     <div class="d-flex gap-1">
                <button onclick="" class="btn-primary  text-center p-2 rounded" >Cancel</button>
                <button id="dl_active" data-url=${video_url}   class="btn-primary  text-center p-2 rounded download ">
                    <span  class="download url"  id="write_download">Download</span>
                    <div class="d-flex text-center align-items-center gap-2">
                        <span id="loading" style="display: none;" class="spinner-border spinner-border-sm " aria-hidden="true"></span>
                        <span id="load_write" style="display: none;" role="status">Loading...</span>
                    </div>
                </button>                        
               
            </div>
                   
                </div>
            </div>  
            <div>    
        `;

    this.listVideos.innerHTML += template;
    // const download = document.querySelectorAll(".elias");

    const componenteVideo = document.querySelectorAll(".componenteVideo");

    /*    componenteVideo.map((element) => {
      const url = element.getAttribute("data-url");
      console.log(url);
    }); */
    let itag;

    componenteVideo.forEach((elementosVideo) => {
      elementosVideo.addEventListener("click", (umElementoVideo) => {
        itag = umElementoVideo.currentTarget.querySelector("select").value;
        const download =
          umElementoVideo.currentTarget.querySelector(".download");
        const url = download.getAttribute("data-url");

        if (umElementoVideo.target.classList.contains("download")) {
          // Lógica para lidar com o clique no elemento desejado

          console.log(url);
          const getLocalStorage = localStorage.getItem(`${idSocket}`);

          const link_get = `${server.urlServer}/download?url=${url}&qualidade=${itag}&id=${getLocalStorage} `;
          const a = document.createElement("a");
          a.href = link_get;
          a.download = title + ".mp4";
          a.click();
          a.remove();
        }
      });

      return;
      download.forEach((elementDownload) => {
        elementDownload.addEventListener("click", (event) => {});
      });
    });
  }
}
