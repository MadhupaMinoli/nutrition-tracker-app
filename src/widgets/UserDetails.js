import { Avatar, Card, Divider, FormControlLabel, IconButton, InputAdornment, List, ListItem, ListItemText, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { Cancel, Edit, Save } from '@mui/icons-material';
import { activityLevels } from '../consts'
import UserContex from '../store/user-contex';


const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	background: '#fff',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

function UserDetails({ isEditing }) {
	const userData = useContext(UserContex);
	const [editing, setEditing] = useState(isEditing);

	// Actions
	const toggleEditing = () => { setEditing(state => !state) };

	const saveProfile = () => { 
		console.log('Current user data >> ', userData);
		userData.saveUserData();
		setEditing(false);
	};

	const changeUserData = (ev) => { 
		userData.updateUserData({ [ev.target.name]: ev.target.value });
	};


	return (
		<Card sx={style}>
			<Stack direction="row" alignItems="center" spacing={2} sx={{ marginBottom: '10px' }}>
				<Avatar src='/avatar.jpeg' alt={userData.name} sx={{ width: 30, height: 30 }}></Avatar>
				<Typography variant='h5' sx={{ flex: 1 }}> User Data </Typography>
				{editing ? (
					<>
						<IconButton aria-label="save" size="large" color="primary" onClick={saveProfile}>
							<Save fontSize="inherit" />
						</IconButton>
						{!isEditing && (
							<IconButton aria-label="cancel" size="large" color="secondary" onClick={toggleEditing}>
								<Cancel fontSize="inherit" />
							</IconButton>
						)}
					</>
				) : (
					<IconButton aria-label="edit" size="large" color="secondary" onClick={toggleEditing}>
						<Edit fontSize="inherit" />
					</IconButton>
				)}
			</Stack>

			<List>
				<Divider />
				<ListItem>
					<ListItemText>Name</ListItemText>

					{editing ? (
						<TextField
							size="small"
							id="name-input"
							name='name'
							value={userData.name}
							onChange={changeUserData}
						/>
					) : (
						<Typography>{userData.name}</Typography>
					)}
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText>Age</ListItemText>
					{editing ? (
						<TextField
							size="small"
							id="age-input"
							name='age'
							type="number"
							value={userData.age}
							onChange={changeUserData}
						/>
					) : (
						<Typography>{userData.age}</Typography>
					)}
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText>Gender</ListItemText>
					{editing ? (
						<RadioGroup
							row
							name="gender-select"
							value={userData.gender}
							onChange={changeUserData}
						>
							<FormControlLabel name='gender' value="Female" control={<Radio />} label="Female" />
							<FormControlLabel name='gender' value="Male" control={<Radio />} label="Male" />
						</RadioGroup>
					) : (
						<Typography>{userData.gender}</Typography>
					)}
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText>Weight</ListItemText>
					{editing ? (
						<TextField
							size="small"
							id="weight-input"
							name='weight'
							type="number"
							sx={{ width: '195px' }}
							InputProps={{ startAdornment: <InputAdornment position="start">kg</InputAdornment> }}
							value={userData.weight}
							onChange={changeUserData}
						/>
					) : (
						<Typography>{userData.weight}</Typography>
					)}
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText>Height</ListItemText>
					{editing ? (
						<TextField
							size="small"
							id="height-input"
							name='height'
							type="number"
							sx={{ width: '195px' }}
							InputProps={{ startAdornment: <InputAdornment position="start">cm</InputAdornment> }}
							value={userData.height}
							onChange={changeUserData}
						/>
					) : (
						<Typography>{userData.height}</Typography>
					)}
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText>Activity Level</ListItemText>
					{editing ? (
						<Select
							id="activity-select"
							name='activityLevel'
							value={userData.activityLevel}
							size="small"
							sx={{ width: '195px' }}
							defaultValue={"Lightly Active"}
							onChange={changeUserData}
						>
							{Object.keys(activityLevels).map((key) => {
								return <MenuItem key={key} value={key}>{key}</MenuItem>
							})}
						</Select>
					) : (
						<Typography>{userData.activityLevel}</Typography>
					)}
				</ListItem>
				<Divider />
			</List>
		</Card>
	);
}

export default UserDetails;