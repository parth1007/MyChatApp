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


    // ContextAPI hook
    const {user,toggleDrawer,setToggleDrawer}  = ChatState();
    
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



  return (
    <div className = "topbar">
      <div className = "topbar-left">
        <div className="drawerbtn" onClick={ toggleSidedrawer}>
          <MenuIcon style={{fontSize:"2.3rem",marginLeft:"1rem",color:"white"}}/>
        </div>
        <div className="topsearch">
          <SearchIcon style={{fontSize:"1.5rem",marginLeft:"1rem",color:"white"}}/>
          <InputBase style={{backgroundColor:"rgb(59 138 217)",color:"white",marginLeft:"1rem"}}
            
            placeholder="Search..."
          />
        </div>
      </div>
      {user?.name}
      <div className = "topbar-right">
        <div className="profilebtns">
            <Badge badgeContent={4} color="primary" style={{marginRight:"2rem"}}>
                <NotificationsIcon style={{fontSize:"1.8rem",color:"white",}}/>
            </Badge>
            <AccountCircle style={{fontSize:"1.8rem",color:"white",marginRight:"2rem",cursor:"pointer"}} onClick={handleDropDown}/>
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
                    Parth Soni
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
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