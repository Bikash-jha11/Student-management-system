import axios from 'axios'

export const getDataApi = (path:any) => {
    const res = axios.get(`http://localhost:3000/${path}`,{
          withCredentials: true
    })
    return res;
}


export const postDataApi = async(path:any,data:any) => {
    const res = await axios.post(`http://localhost:3000/${path}`,data)
    return res;
}

