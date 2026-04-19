import { AuthContext } from "../auth.context.jsx";
import { useContext } from "react";
import { register,login,logout } from "../services/auth.api";

export const useAuth=()=>{
    const context=useContext(AuthContext)
    if (!context) {
  throw new Error("useAuth must be used inside AuthProvider");
}
    console.log('context',context)
const {user,setuser,loading,setloading}=context

const handleregister=async ({username,email,password})=>{
    setloading(true)
    try {
        const data=await register({username,email,password})
    setuser(data.user)
    } catch (error) {
        console.log(error)
    }finally{
        setloading(false)
    }
  
}

const handlelogin=async ({email,password})=>{
   setloading(true)
    try {
        const data=await login({email,password})
    setuser(data.user)

    } catch (error) {
        console.log(error)
    }finally{
        setloading(false)
    }
}
const handlelogout=async ()=>{
    setloading(true)
    try {
        const data=await logout()
    setuser(null)
    } catch (error) {
        console.log(error)
    }finally{
        setloading(false)
    }
}
return {user,loading,handlelogin,handleregister,handlelogout}
}