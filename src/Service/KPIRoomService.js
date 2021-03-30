import axios from "axios";

const DATA_API_URL = 'http://localhost:9091'
const HANDLING_DATA_API_URL = `${DATA_API_URL}/api`

class KPIRoomService {
    getAllRooms(){
        return axios.get(`${HANDLING_DATA_API_URL}/rooms`)
    }
}

export default new KPIRoomService()