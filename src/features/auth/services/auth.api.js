import axios from 'axios'



const api=axios.create({                    //crete instace as it use in repeted call
    baseURL:"http://localhost:3000",
    withCredentials:true
})
export async function register({username,email,password}) {
    try {
        const res=await api.post('/api/auth/register',
            {
            username,email,password
        }
    )

    return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function login({email,password}) {
    try {
        const res=await axios.post("http://localhost:3000/api/auth/login",{
            email,password
        },{
            withCredentials:true
        })
        return res.data
    } catch (error) {
        console.log("Login error:", error.response?.data || error.message);
    throw error;
    }
}

export async function logout() {
    try {
        const res= await api.get("/api/auth/logout")
        return res.data
    } catch (error) {
        console.log(err)
    }
}

export async function getme() {
    try {
        const res=await api.get('/api/auth/getme')
        return res.data
    } catch (error) {
        console.log(error)
    }
}