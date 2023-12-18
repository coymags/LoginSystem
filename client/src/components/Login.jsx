import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

function Login() {

    const [ loginData, setLoginData] = useState({email:"", password:""})

    const navigate = useNavigate()

    function handleOnchange(e) {
        const {name, value} = e.target
        setLoginData((prev)=> {
            return{...prev, [name] : value}
        })
    }

    async function handleOnsubmit(e) {
        e.preventDefault()
        try {
            const login = await axios.post('http://localhost:3000/login', loginData)
            console.log(loginData)
            console.log(login)
            if (login.data.length == 1) {
                const userData = localStorage.setItem('user', JSON.stringify(login.data))
                navigate('/user')
            } else {
                alert('Input invalid Email and Password')
            }
        } catch (error) {
            console.log('Error', error)
        }
    }


  return (
    <>
        <div className='flex justify-center items-center bg-gray-700 w-[full] h-screen'>
            <div className='bg-gray-500 w-[25rem] h-[25rem] flex flex-col justify-center items-center'>
                <h1 className='text-[3rem]'>Login</h1>
                <form onSubmit={handleOnsubmit} className=''>
                    <div className='flex flex-col p-2'>
                        <label htmlFor="">Email</label>
                        <input type="text" name="email" onChange={handleOnchange} className='rounded w-[15rem]' required/>
                    </div>
                    <div className='flex flex-col p-2'>
                        <label htmlFor="">Password</label>
                        <input type="password" name="password" onChange={handleOnchange} className='rounded w-[15rem]' required/>
                    </div>
                    <div className='flex items-center justify-center p-3'>
                        <button className='bg-emerald-500 w-[7rem] h-[2rem] rounded'>Login</button>
                    </div>
                </form>
                <div>
                    <h2 className="text-blue-900 underline" onClick={() => { navigate('/register') }}>Not a member yet? Register here</h2>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login