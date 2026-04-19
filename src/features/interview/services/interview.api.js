import axios from "axios";

const api=axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    withCredentials:true
})

export async function generateInterviewReport({selfdescribe,jobdescribe,resumeFile}) {

    const formdata=new FormData()
      formdata.append('jobdescribe',jobdescribe)
      formdata.append('selfdescribe',selfdescribe)
      formdata.append('file',resumeFile)
    try {
        const response=await api.post('/api/interview',formdata)
        return response.data
    } catch (error) {
        console.log(error,error.response?.data)
        return null;
    }
}

export async function getInterviewReportWithId(id) {
    try {
        const response=await api.get(`/api/interview/report/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function getAllReports() {
    try {
        const response=await api.get(`/api/interview`)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function generateresumepdf(reportId) {
    try {
        const response=await api.get(`/api/interview/resume/pdf/${reportId}`,{
            responseType:'blob'
        })
        return response.data;
    } catch (error) {
        console.log(error)      
    }
}