//const dataBase = require("../data/Database/bd")
//const config = require('../config/config')
//const bcryptjs = require('bcrypt');

//const  jwt = require('jsonwebtoken');

//const db = new dataBase(config.connect_postgres.database)


const help = {
    verifyEmailSenha: async ( body )=>{
        const {email, senha } = body
        const x  = await db.setQuery(`SELECT id, nome, email, senha FROM usuarios WHERE email = $1`, [email])
        
        const user = x.data[0]   

        if(!user) return console.log('[ verifyEmailSenha ] não encontrou o usuario')
         
        return user
    },

    /**
     * usado para cadastrar o usuario e cadastrar uma senha segura
     * 
     * @param { array } stringPass  senha de cadastro do usuario 
     * 
     * @returns Retorna uma Hash da senha do usuario
     */
    bcriptHash : async( stringPass ) =>{
        return await bcryptjs.hash( stringPass, config.bcript_config.sault )
    },

    /**
     * @param { object } hash   hash da senha do usuario do banco de dados para comparar as
     * @param { string } senha  senha enviada pelo usuario que está querendo se logar na aplicação
     * 
     * @returns TRUE caso o Hash esteja correto e FALSE caso de erro
     */
    bcriptCompare : async ( senha, hash ) => {
        return await bcryptjs.compare(senha, hash)
    },
    
    /**
     * @param { object } params - objeto que será de indentificação única úsuario
     * 
     * @returns Retorna o Token JWT 
     */
    tokenGenerate : async ( params ) => {
        return await jwt.sign({
            nome: params['nome'],
            id: params['id']
        }, process.env.SECRET_KEY , { expiresIn: '8h' });
    },

    /**
     * Faz a validação do token junto com a chave secreta 
     * no arquivo .env
     */
    tokenValidate : async ( token ) => {
        return jwt.verify(token, process.env.SECRET_KEY );        
    },

    /**
     * @param { string } nome  array com os campos obrigatorios 
     * 
     * @returns Retorna o a palavra em formato Capitalize [Thiago Teles ]
     */
    captalize : ( nome )=>{
        let nomeCaptalizado = ''
        
        nome.split(' ').forEach(myNome  => {
            
            if( myNome.length < 3) return nomeCaptalizado+=` ${myNome}`                
            
            const modify = myNome[0].toUpperCase() + myNome.slice(1).toLocaleLowerCase()
            nomeCaptalizado+=` ${modify}`
            
        });
        return nomeCaptalizado.trim()        
    },

    /**     * 
     * @returns  data e hora atual Formato : [ yyyy-MM-dd HH:mm:ss ]
     */
    dateTimeCurrenci : function(){
        return format(new Date(), "yyyy-MM-dd HH:mm:ss");
    },
    
        
    /**
     * @param { object } bodyVerification   objeto que deverá ser verificado se existe os requisitos
     * @param { array } camposObrigatorios  array com os campos obrigatorios 
     * 
     * @returns retorna um objeto com error TRUE e data com os campos
     *  que estão faltando,  caso contrario FALSE se todos os
     *  requisitos estiverem atendidos
     */
    camposObrigatorios : ( bodyVerification,  camposObrigatorios ) => {
        const required = [...camposObrigatorios]
        let falta = []
        const usuario = bodyVerification

        required.filter( ( requir ) => {
            const bodyData = Object.keys(usuario)

            const existe = bodyData.includes(requir)
            
            if(!existe) falta.push( requir )   

            return existe
        })  
        
        if(falta.length != 0){
            return { error: true, data : falta}
        }
        return { error: false, data : []}   
    },

    /**
     * @param { object } object_check O objeto a ser validado
     * @param { string } key  KEY que será validada
     * @param { array } opcoes  um ARRAY com as opções que são permitidas no campo
     * 
     * @returns 
     */
    enums_check: (object_check, key, opcoes ) => { 
        const arrayKey = Object.keys( object_check ) 
        
        if( arrayKey.includes( key ) ){
           return (opcoes.includes(object_check[ key ]))?
                    {error: false, data: `` }:
                     {error: true, data: `${key}  Aceita somente = [ ${ opcoes.join(', ') } ]` } 
        }
        return {error: true, data: ['NOT FOUND'] }
    },

    limpaCaracteresWindows :( texto)=>{
        return texto.replace(/[\\/:*?"<>|]/g, "_");

    }
  
}

module.exports = help 