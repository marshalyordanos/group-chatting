
import { Close } from '@mui/icons-material';
import { Alert, Collapse, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import axios from './component/axios';
import Body from './component/Body';
import Header from './component/Header';
import { getData, setChat } from './redux/authReducer';

function App() {
  const auth = useSelector(state=>state.auth)
  // console.log(auth)
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(()=>{
    async function fetchData() {
      if(auth.token){
          const res = await axios.get("/chats") 
          dispatch(setChat(res.data.chat))
  console.log(res.data,"llll")
      
          localStorage.setItem('chat',JSON.stringify(res.data.chat))
      }
      }
      fetchData()
    dispatch(getData(JSON.parse(localStorage.getItem("authData"))))
    dispatch(setChat(JSON.parse(localStorage.getItem("chat"))))
  },[auth.token])

  const alertHandler=()=>{
  
      setOpen(!open);
  
  }
  
  return (
    <div className="App">
      {/* header */}
       <Header  clickAlert = {alertHandler} />
       <Collapse in={open}>
       <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={alertHandler}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Successfull registered!
        </Alert>
        </Collapse>

       {/*body  */}
       <Body/>
    </div>
  );
}

export default App;
