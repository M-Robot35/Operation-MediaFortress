const Youtube = require("./youtube")

class Downloads extends Youtube{
    constructor(url){
        super(url)
    }

    async downloadUnicoVideo( options ){
        if( options ) this.setOptions( options )
        
        await this.youtube( url , this.optionsDefault)         
    }
  
    async downloadMultiplosVideos( options ){
        if( options ) this.setOptions( options )
        
        this.youtube( url , this.optionsDefault)   
    }

    async downloadMultiplosAudios( options ){
        if( options ) this.setOptions( options )
        
        this.youtube( url , this.optionsDefault)   
    }
}

const teste = new Downloads("https://www.youtube.com/watch?v=ElFHwatEvOM")

teste.informationVideo()
.then(res => res)
//.then(res => console.log(res))