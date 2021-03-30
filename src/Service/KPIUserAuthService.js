import axios from "axios";

const DATA_API_URL = 'http://localhost:9091'
const HANDLING_DATA_API_URL = `${DATA_API_URL}/api`

class KPIUserAuthService {
    confirmLogin(data){
        return axios.post(`${HANDLING_DATA_API_URL}/login`, data)
    }
}

export default new KPIUserAuthService()