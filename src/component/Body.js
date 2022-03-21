import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setChat } from '../redux/authReducer'
import axios from './axios'
import './Body.css'

const Body = () => {
    const auth = useSelector(state=>state.auth)
    const chat = useSelector(state=>state.auth.chat)
   console.log(chat)
    const dispatch = useDispatch();

    const [input,setInput]=useState("")
    console.log(input)
    const [data,setData] =useState([])
    useEffect(()=>{
       setData(chat)
    },[chat])

    const sendHandler =async(event)=>{
        event.preventDefault();
      const res = await axios.post('/chats',{
          username:auth.data.username,
          chat:input
      })
    //    console.log(event)
        setData([{username:auth.data.username, chat:input},...data])
        setInput("")
    }

  return (
    <div className='body_sc'>
        
        {auth.token?
             <div className='body'>
             <div className='body__top'>
             <div className='body__message'>
                  
                 {
                     data.map((val)=><div key={val?.id} id={val?.username===auth?.data?.username?"":"body__other"} className={val?.username==auth?.data?.username?"body__me":""}>
                         {val?.username===auth?.data?.username?"":<p className='body__username'>{val?.username}</p>}
                         <p >{val?.chat} </p>
                         <p> {new Date(val?.createdAt).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                     </div> )
                 }
                
     
             </div>
             </div>
             <div className='body__input'>
                 <form>
                  <input value={input} onChange={(e)=>setInput(e.target.value)}  placeholder='message'/>
                  <button disabled={input==""} type='submit' onClick={(e)=>sendHandler(e)}>Send</button>
                  </form>
             </div>
             
             
                </div>:
                <div className='body__logout'>
                    <h1> Get start by Registration🔥🔥🔥🔥</h1>
                </div>
        }

    </div>
  )
}

export default Body