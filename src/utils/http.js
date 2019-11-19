import axios from 'axios'

const get = ({url,params})=>{
  return axios({url,params})
        .then((result)=>{
          return result.data
        })
        .catch((err)=>{
          return err.message
        })
}
const post = ({url,data})=>{
  return axios({
        url,
        data,
        method:"POST"
      })
        .then((result)=>{
          return result.data
        })
        .catch((err)=>{
          return err.message
        })
}

export {
  get,
  post
}