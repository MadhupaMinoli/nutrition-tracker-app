import { Button, Card, CardContent, Input, Stack, Typography } from "@mui/material";
import { Storage } from "aws-amplify";
import { Box } from "@mui/system";
import { useState } from "react";
import { v4 as uuid} from "uuid";

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

function FoodCal({ addToMeal, closeCard }) {
	let [{calories, name}, updateNtrData] = useState({});
	const [imgSrc, setImg] = useState('');
	const [imgName, setImgName] = useState('');
	const [imgData, setImgData] = useState('');


	const uploadImage = async () => {
		const { key } = await Storage.put(imgName, imgData )
		console.log("uploaded", key);
	}

	const updateImg = (ev) => {
		const [file] = ev.target.files
		setImgData(file);
    setImgName(`${uuid()}.${file.name.split('.').pop()}`);

		if (file) {
			// document.getElementById('food-image').src = URL.createObjectURL(file)
			setImg(URL.createObjectURL(file));
		}

		// Send response and get calories update calories
		updateNtrData({name: 'Junck Food', calories: 250});
	}
	

	return (
		<Box sx={style}>
			<Typography id="modal-modal-title" variant="h5" component="h2">
				Calculate Food Calories
			</Typography>

			<Input name="food-uploader" type="file" onChange={updateImg} sx={{marginTop: 2, width: '100%'}} />

			{imgSrc && (
				<Card>
					<CardContent>
						<img id='food-image' height={300} width={300} src={imgSrc} />
						<Button variant="contained" onClick={uploadImage}> Upload Image </Button>
					</CardContent>
				</Card>
			)}
 

			{imgSrc && calories && (
				<Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
					<Stack direction="column" sx={{ flex: 1 }}>
						<Typography variant="p" >{name}</Typography>
						<Typography variant="h6" >{calories} Calories</Typography>
					</Stack>
					<Button variant="contained" color="success" onClick={addToMeal.bind(null, name, calories)}> Accept </Button>
					<Button variant="outlined" color="error" onClick={closeCard}> Reject </Button>
				</Stack>
			)}
		</Box>
	)
}

export default FoodCal;