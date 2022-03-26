import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material"

function FoodCard({name, calories, imageURL}) {
	return (
		<Card sx={{ width: '100%' }} className="card display-flex">
			<CardHeader
				avatar={<Avatar src={imageURL} />}
				title={name}
				className='flex-1'
			/>
			<CardContent>
				<Typography variant="h6" color="text.secondary"> {calories} Calories </Typography>
			</CardContent>
		</Card>
	)
}

export default FoodCard;