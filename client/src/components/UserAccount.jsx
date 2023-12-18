import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function UserAccount() {

  const [data, setData] = useState([]) //Data comming from localStorage

  const navigate = useNavigate() // navigation variable

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('user'))
    setData(localData)
  }, [])

  function handleLogout() {
    localStorage.removeItem('user')
    navigate('/login')
  }


  return (
    <div className='flex flex-col items-center justify-center gap-3'>
        <h1>You are in user account profile dashboard</h1>
        <div className='flex justify-center items-center w-full h-[2rem]'>
          {
            data.map((d, index) => {
              return(
                <div key={index}>
                  <button className='w-[15rem] h-[2rem] bg-gray-400'>{d.email}</button>
                </div>
              )
            })
          }
        </div>
        <button onClick={handleLogout} className='w-[5rem] h-[2rem] bg-emerald-400 rounded'>LOGOUT</button>
    </div>
  )
}

export default UserAccount