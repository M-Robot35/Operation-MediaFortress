const  path = require('path')
const fs = require('fs')
const ytdl = require('ytdl-core');

class Youtube {
    // url do video
    url;  
    // instancia da lib de downloads
    youtube;

    // constroy uma opção de configurações padrão para o aplicativo
    optionsDefault = {};

    // diretorio padrão caso o usuario não tenha definido o caminho para salvar o download
    pathDefault = path.join(__dirname, "../", "../", "downloads") 

  constructor( url ,options) {
    this.url = url
    this.youtube = ytdl
    this.optionsDefault =  options?? this.opcoesDefault()
    this.checkRequiriments()
  }

  opcoesDefault(){
    // construir uma opção padrão 
    this.optionsDefault = {

    }
  }

  setOptions( newOptons ){
    this.optionsDefault =  newOptons
  }

  async checkRequiriments(){
    //===========================================================
    // garante que haja uma URL
    //===========================================================
    if( !this.url) throw TypeError('Necessario enviar uma URL DO YOUTUBE')
    
    //===========================================================
    // Cria pasta Downloads caso não ouver :
    //===========================================================
    const folder = fs.existsSync( this.pathDefault )    
    if( !folder ){
        await fs.mkdir(this.pathDefault,
            { recursive: true }, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('Directory created successfully!');
        });
    }  

    // faz a checagem dos atributos e funcionalidades
    // necessarias para o programa rodar sem problemas
    // exemplo  Verificar se o  diretorio padrão existe  se não existir ele criar o diretorio
    // irá sendo implementado esses requisitos ao logo do processo de desenvolvimento
  }


  async informationVideo( options ){
    
    if( options ) this.setOptions( options )
    
    const info =  await this.youtube.getBasicInfo( this.url , this.optionsDefault)
    const {
        title,
        videoId,
        video_url,
        description,
        author, 
        ownerProfileUrl, 
        ownerChannelName, 
        thumbnail,
        likes,
    
    } = info['videoDetails']

    return {
        videoId,
        video_url,
        title,
        description,
        author, 
        ownerProfileUrl, 
        ownerChannelName, 
        thumbnail,
        likes,
    }    
  } 
}

module.exports = Youtube;
