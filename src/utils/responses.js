
module.exports = {
  /**
     * @param { response } res response vindo do body
     * @param { string } data  resultado da requisição
     * @param { int } [status=200]  status da requisição, padrão 200
     * 
     */
  response_ok: (res, data, status = 200) => {
    const result = {
      error: false,
      data,
    };
    res.status(status).json(result);
  },

  /**
     * @param { response } res response vindo do body
     * @param { string } data  resultado da requisição
     * @param { int } status  status da requisição, padrão 404
     * 
     */
  response_fail: (res, data, status = 404)=>{
    const result = {
        error: true,
        data,
      };
      res.status(status).json(result);
  },

  /**
     * @param { response } res response vindo do body
     * @param { string } data  resultado da requisição
     * @param { int } status  status da requisição, padrão 201
     * 
     */
  created: (res, data, status = 201)=>{
    const result = {
        error: false,
        data,
      };
      res.status(status).json(result);
  },

  /**
     * @param { response } res response vindo do body
     * sem retorno para o usuario [ 204 ]  não e necesario passar o status
     */
  responseNoBody: (res)=>{        
    res.status(204).end()
  },  
};
