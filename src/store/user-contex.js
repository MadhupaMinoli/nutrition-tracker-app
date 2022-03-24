import { Auth, API } from "aws-amplify";
import { createContext, useEffect, useState } from "react";
import { activityLevels } from "../consts";

const apiName = "apif78eeddf"
const path = "/users"

const userData = {
	name: "",
	age: 0,
	gender: "",
	height: 0,
	weight: 0,
	activityLevel: "",
	configed: false,
	isLoading: true
}

const calculatedUserData = {
	bmr: 0,
	rdi: 0,

	saveUserData: () => {},
	updateUserData: () => {},
	getUserData: () => {},
	setUserData: () => {},
}

function calculateBMR({gender, weight, height, age}) {
	if (gender === 'Male') {
		return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
	} else {
		return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
	}
}

function calculateRDI(BMR, activityLevel) {
	return parseInt(BMR *  activityLevels[activityLevel]);
}

const UserContex = createContext({...userData, ...calculatedUserData});

export function UserContexProvider(props) {
	const [userDataState, setUserData] = useState(userData);

	const getUserData = () => {
		console.log("Retriving user data");

		Auth.currentUserInfo().then(info => {
			API.get(apiName, `${path}/${info.id}`).then(data => {
				console.log("User data: ", data);

				data.isLoading = false;
				updateUserData(data);
			}).catch(e => {
				console.error("User fetching error: ", e);
			});
		});
	}

	const saveUserData = () => {
		updateUserData({configed: true})

		Auth.currentUserInfo().then(info => {
			API.post(apiName, `${path}`, {
				body: {id: info.id, ...userDataState, configed: true}
			}).then(data => {
				console.log("User data updated: ", data);
			}).catch(e => {
				console.error("User data updating error: ", e);
			});
		});
	}

	const updateUserData = (userData) => {
		setUserData((oUserData) => {
			return {...oUserData, ...userData};
		});
	}


	useEffect(() => {
		getUserData();
	}, [props]);


	const bmr = calculateBMR(userDataState);
	const context = {
		...userDataState,
		bmr,
		rdi: calculateRDI(bmr, userDataState.activityLevel),

		updateUserData,
		getUserData,
		saveUserData,
		setUserData,
	}

	return (
		<UserContex.Provider value={context}>
			{props.children}
		</UserContex.Provider>
	);
}

export default UserContex;

//Men: BMR = 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) – (5.677 x age in years)
//Women: BMR = 447.593 + (9.247 x weight in kg) + (3.098 x height in cm) – (4.330 x age in years)
// RDI = BMR * activity level 