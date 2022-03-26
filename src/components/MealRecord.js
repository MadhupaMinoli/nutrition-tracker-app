import { Accordion, AccordionDetails, AccordionSummary, Divider, IconButton, Stack, Typography } from "@mui/material";
import { Fastfood, ExpandCircleDown } from '@mui/icons-material';
import FoodCard from "./FoodCard";

const MealCard = ({ mealId, mealName, mealData, rdi, isExpanded, onAddFood, onExpand }) => {
	const totalCalories = mealData.reduce((sum, meal) => {return sum + meal.calories}, 0);
	const caloryPercentage = parseInt(totalCalories * 100 / rdi);

	return (
		<Accordion expanded={isExpanded} onChange={onExpand}>
			<AccordionSummary
				expandIcon={<ExpandCircleDown />}
				aria-controls="panel1bh-content"
				id="panel1bh-header"
			>
				<Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
					{mealName}
				</Typography>
				<Typography variant="h6" sx={{ color: 'text.secondary' }}>{totalCalories} Calories</Typography>
				<Divider orientation="vertical" flexItem variant="middle" textAlign="center" sx={{ width: 10 }} />
				<Typography variant="h6" sx={{ color: 'text.secondary' }}> {caloryPercentage}%</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Stack
					direction="column"
					spacing={1}
					justifyContent="center"
					alignItems="center"
				>
					{mealData.map((foodRecord, index) => {
						return <FoodCard 
								key={index}
								name={foodRecord.name}
								calories={foodRecord.calories}
								imageURL={foodRecord.imageURL}
							/>
					})}
					<IconButton aria-label="delete" size="large" color="success" onClick={onAddFood.bind(null, mealId)}>
						<Fastfood />
					</IconButton>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
}

export default MealCard;