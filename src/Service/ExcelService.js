import axios from "axios";

const DATA_API_URL = 'http://localhost:9091'
const HANDLING_DATA_API_URL = `${DATA_API_URL}/api`

class ExcelService {
    uploadFile(fileData){
        return axios.post(`${HANDLING_DATA_API_URL}/upload`, fileData)
    }
}

export default new ExcelService()