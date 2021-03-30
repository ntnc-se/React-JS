import axios from "axios";

const DATA_API_URL = 'http://localhost:9091'
const HANDLING_DATA_API_URL = `${DATA_API_URL}/api`

class KPIComponentService {
    getAllKPI_Name(){
        return axios.get(`${HANDLING_DATA_API_URL}/kpi_ids`)
    }

    getKPIComponentId(kpi_id, component_type){
        return axios.get(`${HANDLING_DATA_API_URL}/kpi_component_id/${kpi_id}/${component_type}`)
    }
}

export default new KPIComponentService()