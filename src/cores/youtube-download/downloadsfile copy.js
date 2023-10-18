const path = require("path");
const Youtube = require("./youtube")
const fs = require('fs');


class Downloads extends Youtube{
    constructor(url){
        super(url)
    }

    async downloadUnicoVideo( options ){
        if( options ) this.setOptions( options )

        const { title } = await this.informationVideo()        

        await this.youtube( this.url ).pipe( fs.createWriteStream( path.join( this.pathDefault, `${title}.mp4`)) )       
    }
  
    async downloadMultiplosVideos( options ){
        if( options ) this.setOptions( options )
        
        this.youtube( url , this.optionsDefault) 
    }

    async downloadMultiplosAudios( options ){
        if( options ) this.setOptions( options )
        
        this.youtube( url , this.optionsDefault)    
    }

    
    /**
   * Função apenas para testes dos methodos
   *    * 
   * @param {any} newOptons
   */
    async testeDownload( options ){        
        if( options ) this.setOptions( options )        
        
        const { title } = await this.informationVideo()        

        const x = await this.youtube( this.url )
        .pipe( fs.createWriteStream( path.join( this.pathDefault, `${title}.mp4`)) )
        
        x.on('finish', ( ev )=>{
            console.log('Download Finalizado')
        })

        x.on('open', ( ev )=>{
            console.log('Download Inicializado')
        })

        this.eventYoutube.emit('download', title)
    }
}

//  Testes

const urlTest = "https://www.youtube.com/watch?v=PhAsdlmY0o8"

const teste = new Downloads( urlTest )

teste.testeDownload()
.then(res => res)
//.then(res => console.log(res))