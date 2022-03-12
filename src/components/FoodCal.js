import { Card, CardContent, Input, Typography } from "@mui/material";
import { Box } from "@mui/system";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  background: '#fff',
  border: '2px solid #000',
  boxShadow: 24,
	maxHeight: 400,
  p: 4,
};

function FoodCal() {
	return (
		<Box sx={style}>
			<Typography id="modal-modal-title" variant="h5" component="h2">
				Calculate Food Calories
			</Typography>
			<Input name="food-uploader" type="file" onChange={(ev) => {
				const [file] = ev.target.files

				if (file) {
					document.getElementById('food-image').src = URL.createObjectURL(file)
				}
			}}></Input>

			<Card>
				<CardContent>
					<img id='food-image' height={300} width={300} />
				</CardContent>
			</Card>
		</Box>
	)
}

export default FoodCal;