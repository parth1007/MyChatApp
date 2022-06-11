// React Imports

import React from 'react';
import {useState,useEffect,useRef} from 'react';
import {useNavigate} from 'react-router';
import {ChatState} from '../../Context/ChatProvider';
import './Topbar.css';


// Material ui imports

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@material-ui/core/Badge';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';





const TopbarStyle = () => {

    // UseState Declarations
    
    const [toggleProfileDropdown,setToggleProfileDropdown]  = useState(false);
    // const [profileDropDown, setProfileDropDown] = useState(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [toggleNotification, setToggleNotification] = useState(false);


    // ContextAPI hook
    const {user,toggleDrawer,setToggleDrawer,setSelectedChat,notification, setNotification}  = ChatState();
    
    // const open = Boolean(profileDropDown);
    const navigate = useNavigate();


    // useEffect Declaration




    // For auto closing of profile dropdown on clicking outside the box

    let dropDownRef = useRef();
    useEffect(() => {
        if(toggleProfileDropdown === true) {
            let handler = (event) => {
              console.log("Hello");
              console.log(event.target);
              console.log(dropDownRef.current);
              console.log(user?.profilePic)
              if(!dropDownRef.current.contains(event.target)){
                setToggleProfileDropdown(false);
              }
            };

            document.addEventListener("mousedown",handler);
          
            return () => {
              document.removeEventListener("mousedown",handler);
            }
        }
    })


    // Function Declarations

  const toggleSidedrawer = () => {
    setToggleDrawer(!toggleDrawer);
    console.log("SideDrawer opened");
  }

  
  const handleDropDown = () => {
    setToggleProfileDropdown(!toggleProfileDropdown);
  };


  const handleLogout = () => {

    localStorage.removeItem("userInfo");
    navigate("/login");
    console.log("Logged out Successfully!")
  }


  
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);


    // For auto closing of SideDrawer on clicking outside the box

    let notifDropdown = useRef();
    useEffect(() => {
  
      if(toggleNotification === true) {
          let handler = (event) => {
            if(!notifDropdown.current.contains(event.target)){
              setToggleNotification(false);
            }
          };
          document.addEventListener("mousedown",handler);
  
          return () => {
            document.removeEventListener("mousedown",handler);
          }
      }
    })
  


  return (
    <div className = "topbar">
      <div className = "topbar-left">
        <div className="drawerbtn" onClick={ toggleSidedrawer}>
          <MenuIcon style={{fontSize:"2.3rem",marginLeft:"1rem",color:"black"}}/>
        </div>
        <div className="topsearch" onClick={ toggleSidedrawer}>
          <SearchIcon style={{fontSize:"1.5rem",marginLeft:"1rem",color:"black"}}/>
          <InputBase style={{backgroundColor:"#ffffff",color:"black",marginLeft:"0.5rem"}}
            
            placeholder="Search..."
          />
        </div>
      </div>
      <div className = "topbar-right">
        <div className="profilebtns">

          <div className="notification-div" ref={notifDropdown}>
            <Badge badgeContent={notification.length} color="primary" onClick={()=>{setToggleNotification(!toggleNotification)}}>
                <NotificationsIcon style={{fontSize:"1.8rem",color:"black"}}/>
            </Badge>
            { toggleNotification && 
              <div className="notification-list">
                {!notification?.length && "No new messages"}
                {notification?.map((item,index) => (
                  <div key={index} className="notif-item" onClick={()=>{
                    setSelectedChat(item.chat);
                    setNotification(notification.filter((n) => n !== item));
                    setToggleNotification(!toggleNotification)
                  }
                      
                      }>
                    {item?.chat?.isGroupChat?`New message in ${item?.chat?.chatName}`:
                    `New message from ${item?.chat?.users[0]?._id ===user?._id ? item?.chat?.users[1].name : item?.chat?.users[0].name 
                    }`};

                    
                  </div>
                ))}
              </div>
            }
            </div>
          
          
            <AccountCircle style={{fontSize:"1.8rem",color:"black",marginRight:"2rem",cursor:"pointer"}} onClick={handleDropDown}/>
            {toggleProfileDropdown && <div className="profile-dropdown" ref={dropDownRef}>
              
              <div className="pdrop-item" onClick={handleOpenModal}>My Profile</div>
              <div className="pdrop-item" onClick={handleLogout}>Logout</div>
            </div>}

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={openModal}
              onClose={handleCloseModal}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openModal}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                  }}>
                  <Typography id="transition-modal-title" variant="h6" component="h2">
                    {user?.name}
                  </Typography>
                  <img src={user?.profilePic} alt="profile pic" />
                  {user?.profilePic}
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    {user?.email}
                  </Typography>
                </Box>
              </Fade>
            </Modal>


        </div>
      </div>
    </div>
  )
}

export default TopbarStyle;