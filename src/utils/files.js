const fsPromisses = require("fs/promises");
const fs = require("fs");
const path = require("path");

module.exports = {  
  /**
   * Verifica se diretorio existe, caso ele exista, será deletado
     * @param { string } path_file  resultado da requisição
     * 
     */
  path_remove: async (path_file) => {
    const pathFolderFile = path.join(path_file);
    
    const folder = fs.existsSync(pathFolderFile);
    console.log(folder)
    if( folder ){
        fs.rm(path_file, { 
            recursive: true, 
            }, ()=>{
            console.log("Folder Deleted!")
        })
    }
  },
};
