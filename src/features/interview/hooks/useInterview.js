
import { InterviewContext } from "../interview.context";
import { generateInterviewReport,getInterviewReportWithId,getAllReports ,generateresumepdf} from "../services/interview.api";

import { useEffect,useContext } from "react";
import { useParams } from "react-router";


export const useInterview=()=>{
    const context=useContext(InterviewContext)

    if(!context){
         throw new Error("useInterview must be used inside AuthProvider");
    }

    const {report,reports,loading,setreport,setreports,setloading}=context
  
     const generateinterviewreport=async({jobdescribe,selfdescribe,resumeFile})=>{
        setloading(true)
        let response=null;
        try {
             response=await generateInterviewReport({selfdescribe,jobdescribe,resumeFile})
            setreport(response.interviewReport)
        } catch (error) {
            console.log(error)
        }finally{
            setloading(false)
        }
        return response.interviewReport
     }

     const generatereportbyid=async(id)=>{
        setloading(true)   
             let response=null;     
        try {
             response=await getInterviewReportWithId(id)
            setreport(response.interviewReport)
        } catch (error) {
            console.log(error)
        }finally{
            setloading(false)
        }
        return response.interviewReport
        }


        const getallreports=async()=>{
            setloading(true)  
             let response=null;          
            try {
                response=await getAllReports()
                 const data = response?.interviewReports || []
                setreports(data)
            }
                catch (error) {
                console.log(error)
            }
            finally{
                setloading(false)
            }
            return response.interviewReports
            }

            // useEffect(()=>{
            //     if(reportId){
            //         generatereportbyid(reportId)
            //     }else{
            //         getallreports()
            //     }
               
            // },[reportId])

            const getresumepdf=async(reportId)=>{  
                setloading(true) 
                let response=null
                try {
                    response=await generateresumepdf(reportId)
                    const url=window.URL.createObjectURL(response)
                    const link=document.createElement('a')
            
                    link.href=url
                    link.setAttribute('download',`resume_${reportId}.pdf`)
                    document.body.appendChild(link)
                    link.click()
                } catch (error) {
                    console.log(error)
                }  finally{
                    setloading(false)
                } 
                }
  return {report,reports,loading,generateinterviewreport,generatereportbyid,getallreports,getresumepdf}
}