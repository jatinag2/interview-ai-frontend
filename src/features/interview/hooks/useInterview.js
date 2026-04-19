

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
    
        try {
           const  response=await generateInterviewReport({selfdescribe,jobdescribe,resumeFile})
           if(!response)return null
            setreport(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            console.log(error)
            return null
        }finally{
            setloading(false)
        }
     }

     const generatereportbyid=async(id)=>{
        setloading(true)   
      
        try {
            const response=await getInterviewReportWithId(id)
            if(!response)return null
            setreport(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            console.log(error)
            return null 
        }finally{
            setloading(false)
        }
      
        }


        const getallreports=async()=>{
            setloading(true)  
              
            try {
               const response=await getAllReports()
                 const data = response?.interviewReports || []
                setreports(data)
                return data
            }
                catch (error) {
                console.log(error)
                setreports([]);
                return [];
            }
            finally{
                setloading(false)
            }
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
          
                try {
                    const response=await generateresumepdf(reportId)
                    if(!response){
                        console.log("No response received for resume PDF generation.");
                        return null;
                    }
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