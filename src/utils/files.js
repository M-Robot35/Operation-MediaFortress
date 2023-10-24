const fsPromisses = require("fs/promises");
const fs = require("fs");
const path = require("path");

module.exports = {
  pathRequired: async function () {
    const pathFolderFile = path.join(__dirname, "../", this.folder);
    const pathFileJson = path.join(__dirname, "../", this.folder, this.file);

    const folder = fs.existsSync(pathFolderFile);
    const file = fs.existsSync(pathFileJson);

    if (!folder) {
      await fs.mkdir(pathFolderFile, { recursive: true }, (err) => {
        if (err) {
          return console.error(err);
        }
        console.log("Directory created successfully!");
      });
    }

    if (!file) {
      const jsonData = JSON.stringify(bankAccout, null, 4);

      await fsPromisses.writeFile(pathFileJson, jsonData),
        (err) => {
          if (err) throw new Error("O Banco de Dados não foi Criado");

          console.log("O arquivo foi criado!");
        };
    }
  },

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
