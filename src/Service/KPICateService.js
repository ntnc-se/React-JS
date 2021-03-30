import axios from "axios";

const DATA_API_URL = 'http://localhost:9091'
const HANDLING_DATA_API_URL = `${DATA_API_URL}/api`

class KPICateService {
    getAllKPICate(room_id){
        return axios.get(`${HANDLING_DATA_API_URL}/kpicategory/${room_id}`)
    }

    getKPICateById(kpi_id){
        return axios.get(`${HANDLING_DATA_API_URL}/kpicategory_id/${kpi_id}`)
    }

    getListSpecificCateById(kpi_id){
        return axios.get(`${HANDLING_DATA_API_URL}/kpicategoryspecific_id/${kpi_id}`)
    }

    getSpecificCateById(kpi_id){
        return axios.get(`${HANDLING_DATA_API_URL}/kpicategoryspecific1_id/${kpi_id}`)
    }

    deleteCategory(kpi_id){
        return axios.delete(`${HANDLING_DATA_API_URL}/kpicategory/${kpi_id}`)
    }

    updateCategory(data){
        return axios.post(`${HANDLING_DATA_API_URL}/kpicategory/edit`, data)
    }

    insertCategory(data){
        return axios.post(`${HANDLING_DATA_API_URL}/kpicate_id/add`, data)
    }

}

export default new KPICateService()