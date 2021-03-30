import axios from "axios";

const DATA_API_URL = 'http://localhost:9091'
const HANDLING_DATA_API_URL = `${DATA_API_URL}/api`

class KPIValueService {
    getAllKPIValueByDate(component_type, category_id, start_date){
        return axios.get(`${HANDLING_DATA_API_URL}/kpivalue/${component_type}/${category_id}/${start_date}`)
    }

    getAllKIValue(component_type, category_id){
        return axios.get(`${HANDLING_DATA_API_URL}/kpivalue/${component_type}/${category_id}`)
    }

    deleteData(kpi_id, start_date, range_type, component_type){
        return axios.delete(`${HANDLING_DATA_API_URL}/kpivalue/${kpi_id}/${start_date}/${range_type}/${component_type}`);
    }

    getSpecificData(kpi_id, start_date, range_type, component_type){
        return axios.get(`${HANDLING_DATA_API_URL}/kpivalue/${kpi_id}/${start_date}/${range_type}/${component_type}`);
    }

    editData(data, kpi_id, component_type){
        return axios.post(`${HANDLING_DATA_API_URL}/kpivalues/edit/?kpi_id=${kpi_id}&&component_type=${component_type}`, data );
    }

    insertData(data, start_date, range_type, kpi_id, component_type){
        return axios.post(`${HANDLING_DATA_API_URL}/kpivalues/add/?start_date=${start_date}&&range_type=${range_type}&&kpi_id=${kpi_id}&&component_type=${component_type}`, data);
    }

    getNumberPage(component_type, category_id, numrecord){
        return axios.get(`${HANDLING_DATA_API_URL}/kpivalue/numpage/${component_type}/${category_id}/${numrecord}`);
    }

    getArrayToPaging(component_type, category_id, numrecord, pagecurrent){
        return axios.get(`${HANDLING_DATA_API_URL}/kpivalue/kpipaging/${component_type}/${category_id}/${numrecord}/${pagecurrent}`);
    }

}

export default new KPIValueService()