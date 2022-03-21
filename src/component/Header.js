import { Alert, Avatar, Button, Modal, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from './axios';
import './Header.css'
import {getData, setChat} from '../redux/authReducer'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    
  };

const Header = (props) => {
    const dispatch = useDispatch(); 
    const auth = useSelector(state=>state.auth)
   

    const [open, setOpen] = React.useState(false);
    const [openLogin, setOpenLogin] = React.useState(false);
    const [remail, setRemail] = React.useState("");
    const [rusername, setRusername] = React.useState("q");
    const [rpassword, setRpassword] = React.useState("");
    const [rpasswordConfirm, setRpasswordConfirm] = React.useState("");
    const [lpassword, setLpassword] = React.useState("");
    const [lemail, setLemail] = React.useState("");
    
    // console.log(auth)
    // console.log(typeof auth.err)



  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);
  const handleSubmit = async ()=>{
      const data = {
          username:rusername,
          email:remail,
          password:rpassword,
          passwordConfirm:rpasswordConfirm
      }
      const res = await axios.post("/users/signup",data)
    //   console.log(res.data)
      if(res.data.token){
        localStorage.setItem('authData',JSON.stringify(res.data))
        handleClose()
      }
      dispatch(getData(res.data))
      setRemail("")
      setRpassword("")
      setRpasswordConfirm("")
      setRusername("")
      
  }
  const handleLogin = async ()=>{
    const data = {
        email:lemail,
        password:lpassword,
    }
    const res = await axios.post("/users/login",data)
    if(res.data.token){
        localStorage.setItem('authData',JSON.stringify(res.data))
        const res1 = await axios.get("/chats") 
          dispatch(setChat(res1.data.chat))
          console.log(res1.data,"llll")
      
          localStorage.setItem('chat',JSON.stringify(res1.data.chat))
        
        handleCloseLogin()
      }
    dispatch(getData(res.data))

    setLemail("")
    setLpassword("")
    
}
const handleLogout =  ()=>{
    
        localStorage.removeItem('authData')
        localStorage.removeItem('chat')

      
    dispatch(getData(null))
    
}
  return (
    <div className='header'>
        {auth.token?
             <div className='header__avater__div'>
             <Avatar className='header__avater'>{auth.data.username[0]}</Avatar> 
             <p>{auth.data.username}</p>
             </div>:
             <div className='header__avater__div'>
             <Avatar className='header__avater'>N</Avatar> 
             <p>No One Login</p>
         </div>
        }
        <h2>Logo</h2>
        {auth.token?<Button  onClick={handleLogout} variant="contained">Logout</Button>:
                    <Button  onClick={handleOpenLogin} variant="contained">Signin</Button>
        }
        <Modal
            
            open={openLogin}
            onClose={handleCloseLogin}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Login
                </Typography>
               
                {typeof auth.err=="string"?<Alert severity='error'>{typeof auth.err=='string'?auth.err:""}</Alert>:""}
                <TextField value={lemail} onChange={(e)=>setLemail(e.target.value)} className='headel__input' id="outlined-basic" label="email" variant="outlined" />

                <TextField value={lpassword} onChange={(e)=>setLpassword(e.target.value)} className='headel__input' type={"password"} id="outlined-basic" label="password" variant="outlined" />
               <Button onClick={()=>{
                   handleLogin()
               }} variant="contained">Login</Button> 
                
                
            </Box>
        </Modal>
          {auth.token?"":<Button  onClick={handleOpen} variant="contained">Register</Button> }        
        <Modal
            
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Register
                </Typography>
                {auth.message?.startsWith("User")?<Alert severity='error'>Please provide all information and make sure the password confirmed</Alert>:""}
                {auth.message?.startsWith("E11000")?<Alert severity='error'>Username or Email already exists!</Alert>:""}

              
                <TextField value={rusername} onChange={(e)=>setRusername(e.target.value)} className='headel__input' id="outlined-basic" label="username" variant="outlined" />
                <TextField value={remail} onChange={(e)=>setRemail(e.target.value)} className='headel__input' id="outlined-basic" label="email" variant="outlined" />

                <TextField value={rpassword} onChange={(e)=>setRpassword(e.target.value)} className='headel__input' type={"password"} id="outlined-adornment-password" label="password" variant="outlined" />
                <TextField value={rpasswordConfirm} onChange={(e)=>setRpasswordConfirm(e.target.value)} className='headel__input' type={"password"} id="outlined-basic" label="passwordConfirm" variant="outlined" />
               <Button onClick={()=>{
                   handleSubmit()
                   props.clickAlert()
                   
               }} variant="contained">submit</Button> 
                
                
            </Box>
        </Modal>
    </div>
  )
}

export default Header