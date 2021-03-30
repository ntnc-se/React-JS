import axios from "axios";

const DATA_API_URL = 'http://localhost:9091'
const HANDLING_DATA_API_URL = `${DATA_API_URL}/api`

class KPITimeRangeService {
    getOrCreateTimeID(start_date, range_type){
        return axios.get(`${HANDLING_DATA_API_URL}/timerange/${start_date}/${range_type}`)
    }
}

export default new KPITimeRangeService()