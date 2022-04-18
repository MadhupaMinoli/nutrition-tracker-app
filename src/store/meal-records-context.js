import { createContext, useState } from "react";
import { Auth, API } from "aws-amplify";

const apiName = "apif78eeddf"
const path = "/mealRecords"
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

		Auth.currentUserInfo().then(info => {
			API.get(apiName, `${path}/object/${info.id}/${date}`).then(data => {
				console.log("Meal record data: ", data);

				if (Object.keys(data).length) {
					setMealRecState(data);
				} else {
					updateStateData({isLoading: false})
				}
			}).catch(e => {
				console.error("Meal Record fetching error: ", e);
			});
		}).catch(console.error);

		// fetch('/day-report.json')
		// .then(res => {return res.json()})
		// .then(setMealRecState)
		// .catch(e => updateStateData({error: e}));
	}

	const addFoodRecord = (meal, {name, calories, imageURL}) => {
		setMealRecState((mealRecs) => {
			mealRecs[meal]?.push({name, calories, imageURL});
			return {...mealRecs};
		});

		//Send data
		Auth.currentUserInfo().then(info => {
			API.post(apiName, `${path}`, {
				body: {id: info.id, ...mealRecState}
			}).then(data => {
				console.log("Meal record updated: ", data);
			}).catch(e => {
				console.error("Meal record setting error: ", e);
			});
		}).catch(console.error);
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