import React from 'react'
import './Topbar.css'
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

import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router';
import {ChatState} from '../../Context/ChatProvider';




const TopbarStyle = () => {

    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const {user,toggleDrawer,setToggleDrawer}  = ChatState();
    const [toggleProfileDropdown,setToggleProfileDropdown]  = useState(false);

    // useEffect(() => {
    //   console.log("I am in topbar")
    //   console.log(user);
    //   // console.log(user.name);
    // }, [])

    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);



  const toggleSidedrawer = () => {
    setToggleDrawer(!toggleDrawer);
    console.log(user);
  }

  const [profileDropDown, setProfileDropDown] = useState(null);
  const open = Boolean(profileDropDown);
  
  const handleDropDown = () => {
    console.log("I am in handleDropDown");
    // console.log(user.name);
    setToggleProfileDropdown(!toggleProfileDropdown);
  };

  const handleLogout = () => {

    localStorage.removeItem("userInfo");
    // setUser(null);
    navigate("/login");
    console.log("logout completed")
  }

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
            onChange={(e) => {setSearch(e.target.value)}}  
          />
        </div>
      </div>
      {/* {user.name} */}
      <div className = "topbar-right">
        <div className="profilebtns">
            <Badge badgeContent={4} color="primary" style={{marginRight:"2rem"}}>
                <NotificationsIcon style={{fontSize:"1.8rem",color:"white",}}/>
            </Badge>
            <AccountCircle style={{fontSize:"1.8rem",color:"white",marginRight:"2rem",cursor:"pointer"}} onClick={handleDropDown}/>
            {toggleProfileDropdown && <div className="profile-dropdown">
              
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

export default TopbarStyle