const Youtube = require("./youtube")

class Downloads extends Youtube{
    constructor(){
        super()
    }

    async downloadUnicoVideo( url, options ={} ){
        if( options ) this.setOptions( options )
        
        this.youtube( url , this.optionsDefault) 

    }
  
    async downloadMultiplosVideos( url, options ={} ){
        if( options ) this.setOptions( options )
        
        this.youtube( url , this.optionsDefault) 
  
    }

    async downloadMultiplosAudios( url, options ={} ){
        if( options ) this.setOptions( options )
        
        this.youtube( url , this.optionsDefault) 
  
    }
}