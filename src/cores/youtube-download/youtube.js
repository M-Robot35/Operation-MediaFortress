const  path = require('path')
const ytdl = require('ytdl-core');

class Youtube {
    // instancia da lib de downloads
    youtube;

    // constroy uma opção de configurações padrão para o aplicativo
    optionsDefault = {};

    // diretorio padrão caso o usuario não tenha definido o caminho para salvar o download
    pathDefault = path.join(__dirname, "../", "../", "downloads") 

  constructor() {
    this.youtube = ytdl
  }

  checkRequiriments(){
    // faz a checagem dos atributos e funcionalidades
    // necessarias para o programa rodar sem problemas
    // exemplo  Verificar se o  diretorio padrão existe  se não existir ele criar o diretorio
    // irá sendo implementado esses requisitos ao logo do processo de desenvolvimento
  }

  setOptions( newOptons ){
    this.optionsDefault =  newOptons
  }

  async informationVideo( url ){        
    this.youtube( url )      
}

module.exports = Youtube;
