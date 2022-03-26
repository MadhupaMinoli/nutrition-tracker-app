import { createContext, useState } from "react";

const apiName = "apif78eeddf"
const path = "/users"
const meals = ["breakfirst", "lunch", "dinner", "snacks"];

const mealRecordData = {
	date: '',
	rdi: 0,
	breakfirst: [],
	lunch: [],
	dinner: [],
	snacks: [],

	// Helping states
	isLoading: true,
	error: false,
}

const mealRecordExt = {
	currentIntake: 0,
	addFoodRecord: () => {},
	getMealRecord: (date) => {},
}

const MealRecContex = createContext({
	...mealRecordData,
	...mealRecordExt
});

export default MealRecContex;

export function MealRecContextProvider({children}) {
	const [mealRecState, setMealRecState] = useState(mealRecordData);

	const updateStateData = (data) => {
		setMealRecState((preData) => {
			return {...preData, ...data};
		});
	}

	const getMealRecord = (date) => {
		updateStateData({date: date, isLoading: true});


		fetch('/day-report.json')
		.then(res => {return res.json()})
		.then(setMealRecState)
		.catch(e => updateStateData({error: e}));
	}

	const addFoodRecord = (meal, {name, calories, imageURL}) => {
		setMealRecState((mealRecs) => {
			mealRecs[meal]?.push({name, calories, imageURL});
			return {...mealRecs};
		});

		//Send data
	}

	const currentIntake = meals.reduce((calories, meal) => {
		return mealRecState[meal].reduce((cal, foodRec) => {
			return cal + foodRec.calories;
		}, calories);
	}, 0);

	const mealRecordObj = {
		...mealRecState,
		currentIntake,
		getMealRecord,
		addFoodRecord
	}

	return (
		<MealRecContex.Provider value={mealRecordObj}>
			{children}
		</MealRecContex.Provider>
	);
}