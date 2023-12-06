import server from '../../../config.js'
export default class RenderVideos {
  constructor(seletor) {
    this.listVideos = document.getElementById(seletor);
  }

  static execute(seletor, dados) {
    const render = new RenderVideos(seletor);
    render.tempate(dados);
    return render;
  }

  renderResolucoes({ qualidades }) {
    return qualidades.map((quality) => {
      const { itag, qualityLabel } = quality;

      return `
            <option value="${itag}" >
                ${qualityLabel} 
            </option>                  `;
    });
  }

  elementVerify( id ){
    return document.getElementById(id)? true : false
  }

  tempate(data) {
    const {
      author,
      description,
      ownerProfileUrl,
      thumbnail,
      title,
      video_url,
      videoId
    } = data.info; 
    
    const id_unico_video = videoId

    if (this.elementVerify(id_unico_video)) return
    
    const template = `
            <div class='thiago'>
            <img src="${thumbnail.url}" alt="imagem thumbnail">
            <div class="videos-items">
                <div class="body-item" id="component">
                    <div id="titulo" title='${title}'>${title}</div>
                    <div>
                        <div id="channel" title='Canal: ${author.name}'>${author.name}</div>
                        <div >
                        <select id='tag' class="form-select-sm" aria-label="Default select example" >                            
                            ${this.renderResolucoes(data)}
                        </select>
                        </div>
                        <div id='bits-porcent'>00%</div>
                        <div id="bits-download">--MB/--MB</div>
                        <div style="display: none;">xxxxxxx</div>
                    </div>
                    <progress id='${id_unico_video}' class="w-100" id="file" value="1" max="100"> 32% </progress>
                    <button id='btn-dl' onclick="fazerDownload(this)" data-url="${video_url}@${id_unico_video}" class="btn btn-primary botao-dl">Download</button>
                    <a style="display: none;" download="${title}.mp4" href="${server.urlServer}/download?url=${video_url}&$$$&socket=${idClient}@${id_unico_video}"></a>

                </div>
            </div>  
            <div onclick="fechar(this)" class="close-video">X</div>
            <div>    
        `;
    this.listVideos.innerHTML += template;
  }
}