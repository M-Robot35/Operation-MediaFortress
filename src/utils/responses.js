

module.exports = {

  response_ok: (res, data, status = 200) => {
    const result = {
      error: false,
      data,
    };
    res.status(status).json(result);
  },

  response_fail: (res, data, status = 404)=>{
    const result = {
        error: true,
        data,
      };
      res.status(status).json(result);
  },

  created: (res, data, status = 201)=>{
    const result = {
        error: false,
        data,
      };
      res.status(status).json(result);
  },

  responseNoBody: (res)=>{        
    res.status(204).end()
  },
  
};
