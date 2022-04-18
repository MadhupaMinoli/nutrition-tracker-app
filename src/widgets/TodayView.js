import { Modal, Paper, Stack } from "@mui/material"
import InfoCard from "../components/InfoCard";
import { useContext, useEffect, useState } from "react";
import FoodCal from "../components/FoodCal";
import UserContex from "../store/user-contex";
import MealRecord from "../components/MealRecord";
import MealRecContex from "../store/meal-records-context";

const meals = ["breakfirst", "lunch", "dinner", "snacks"];

function TodayView({date}) {
	const [expanded, setExpanded] = useState(false);
	const [meal, setMeal] = useState('');
	const userData = useContext(UserContex);
	const mealRecords = useContext(MealRecContex);
	
	const rdi = mealRecords.rdi || userData.rdi;

  const handleClose = () => setMeal('');

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const addToMeal = ({name, calories, imageURL}) => {
		console.log(`${calories} calories Meal added to ${meal}`);
		mealRecords.addFoodRecord(meal, {name, calories, imageURL});
	}

	return (<div className='today-view'>
		<Paper elevation={3} className='paper'>
			<h3>Today status</h3>

			<Stack
				direction={{ xs: 'column', sm: 'row' }}
				spacing={{ xs: 1, sm: 2, md: 4 }}
				justifyContent="center"
				alignItems="flex-start"
			>
				<InfoCard
					header={{ title: "RDI", subheader: "Recomanded Daily Intake", avatar: "/favicon.png" }}
					value={`${rdi} Calories`}
					description="The RDI (Recomanded Daily Intake) of calories calculated accourding to your body
					wegiht, height, age and gender. It will be vary with your health and other medical conditions.
					This value use to only for tracking purpose."
				/>

				<InfoCard
					header={{ title: "Current Intake", avatar: "/favicon.png" }}
					value={`${mealRecords.currentIntake} Calories`}
					description="The current intake of calories calculated accourding to your accepted meals after
					 checking it's calorie count. It is the total intake of 4 meals - Breakfast, Lunch, Dinner and
					  Snack throughout the day."
				/>

				<InfoCard
					header={{ title: "Day Summary", subheader: "Percentage of Daily Requrement", avatar: "/favicon.png" }}
					value={`${rdi && parseInt(mealRecords.currentIntake * 100 / rdi)}%`}
					description="Eat rest of the calories at end of the day. You can get more for breakfast, lunch, dinner and snacks"
				/>
			</Stack>
		</Paper>

		<Paper elevation={3} className='paper'>
			<h3>Daily Meal Records</h3>

			{meals.map((meal) => {
				if (mealRecords[meal]) {
					return <MealRecord
						key={meal}
						mealId={meal}
						mealData={mealRecords[meal]}
						isExpanded={expanded === meal}
						rdi={userData.rdi}
						onAddFood={setMeal}
						onExpand={handleChange(meal)}
						mealName={meal.toUpperCase()}
					/>
				}
			})}
		</Paper>

		<Modal
        open={!!meal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
				<div>
        	<FoodCal addToMeal={addToMeal} closeCard={handleClose}></FoodCal>
				</div>
		</Modal>
	</div>)
}

export default TodayView