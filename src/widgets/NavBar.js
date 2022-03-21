import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Avatar, Button, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import UserDetails from './UserDetails';

function NavBar({signOutFunc}) {
	const [value, setValue] = useState(Date.now());
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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
			<Button variant="outlined" color="info" onClick={signOutFunc}> Sign Out </Button>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<UserDetails isEditing={false} />
			</Modal>
		</div>
	)
}

export default NavBar;