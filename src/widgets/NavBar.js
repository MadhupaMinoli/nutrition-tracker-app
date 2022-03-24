import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Avatar, Button, Modal, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import UserContex from '../store/user-contex';
import UserDetails from './UserDetails';

function NavBar({signOutFunc}) {
	const [value, setValue] = useState(Date.now());
	const [open, setOpen] = useState(false);
	const userData = useContext(UserContex);

	const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

	const handleSignOut = () => {
		signOutFunc();
		userData.setUserData({});
		// window.location.reload();
	};


	return (
		<div className='nav-bar'>
			<span>Calorie Counter</span>

			<Avatar src='/avatar.jpeg' alt="Remy Sharp" sx={{ width: 40, height: 40 }} onClick={handleOpen}></Avatar>

			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DatePicker
					value={value}
					onChange={(newValue) => {
						console.log(newValue)
						setValue(newValue);
					}}
					renderInput={(params) => <TextField {...params} />}
				/>
			</LocalizationProvider>
			<Typography variant='div' sx={{flex: 1}}/>
			<Button variant="outlined" color="info" onClick={handleSignOut}> <span>Sign Out</span> </Button>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<div>
					<UserDetails isEditing={false} />
				</div>
			</Modal>
		</div>
	)
}

export default NavBar;