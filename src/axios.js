import axios from 'axios'

const axio = axios.create({
    baseURL:'http://127.0.0.1:5001/clone-147f6/us-central1/api'
})
export default axio