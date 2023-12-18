import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Register() {

    const navigate = useNavigate()
    const [ data, setData] = useState({ email: "", password: "" })

    function handleOnchange(e) {
        const {name, value} = e.target
        setData((prev) =>{
            return {...prev,[name] : value}
        })

        console.log(data)
    }

    async function handleOnsubmit(e){
        e.preventDefault()
        try {
            const regUser = await axios.post('http://localhost:3000/user', data)
            console.log(regUser.data)
            if (regUser.data) {
                console.log('Register Succesfully')
            } else {
                console.log('Registration Failed')
            }
        } catch (error) {
            console.log('Error', error)
        }
    }
    

  return (
    <div className='flex justify-center items-center bg-gray-700 w-[full] h-screen'>
        <div className='bg-gray-500 w-[25rem] h-[25rem] flex flex-col justify-center items-center'>
            <h1 className='text-[3rem]'>Register</h1>
            <form onSubmit={handleOnsubmit} className=''>
                <div className='flex flex-col p-2'>
                    <label htmlFor="">Email</label>
                    <input type="text" className='rounded w-[15rem]' name='email' onChange={handleOnchange}/>
                </div>
                <div className='flex flex-col p-2'>
                    <label htmlFor="">Password</label>
                    <input type="text" className='rounded w-[15rem]' name='password' defaultValue={data.password} onChange={handleOnchange}/>
                </div>
                <div className='flex items-center justify-center p-3'>
                    <button className='bg-emerald-500 w-[7rem] h-[2rem] rounded'>Submit</button>
                </div>
            </form>
            <div>
                <h2 className='text-blue-800 underline' onClick={() => { navigate('/login') }}>Login</h2>
            </div>
        </div>
    </div>
  )
}

export default Register