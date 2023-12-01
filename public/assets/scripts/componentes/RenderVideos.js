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

  tempate(data) {
    console.log(data)
    const {
      author,
      description,
      ownerProfileUrl,
      thumbnail,
      title,
      video_url,
    } = data.info;

    const template = `
            <div class='thiago'>
            <img src="${thumbnail.url}" alt="imagem thumbnail">
            <div class="videos-items">
                <div class="body-item">
                    <div title='${title}'>${title}</div>
                    <div>
                        <div title='Canal : ${author.name}'>${author.name}</div>
                        <div >
                        <select id='resolucoes' class="form-select-sm" aria-label="Default select example" >                            
                            ${this.renderResolucoes(data)}
                        </select>
                        </div>
                        <div>xxxxxxx</div>
                        <div>xxxxxxx</div>
                        <div>xxxxxxx</div>
                    </div>
                    <progress class="w-100" id="file" value="32" max="100"> 32% </progress>
                    <div class="btn btn-primary botao-dl">Download</div>
                    <a href="" download class="btn btn-primary botao-dl">Download</a>
                </div>
            </div>  
            <div onclick="fechar(this)" class="close-video">X</div>
            <div>    
        `;
    this.listVideos.innerHTML += template;
  }
}