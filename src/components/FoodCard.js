import { styled } from '@mui/material/styles';
import { Avatar, Card, CardContent, CardHeader, Collapse, IconButton, Typography } from "@mui/material"

function FoodCard({header, value}) {
	return (
		<Card sx={{ width: '100%' }} className="card display-flex">
			<CardHeader
				avatar={<Avatar src={header.avatar} />}
				title={header.title}
				subheader={header.subheader}
			/>
			<CardContent className='display-flex'>
				<Typography variant="h6" color="text.secondary" className='flex-1'> {value} </Typography>
			</CardContent>
		</Card>
	)
}

export default FoodCard;