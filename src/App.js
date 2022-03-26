import './App.css';
import UserContex from './store/user-contex';
import NavBar from './widgets/NavBar';
import TodayView from './widgets/TodayView';
import { Amplify, Auth } from 'aws-amplify';
import awsConfig from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useContext } from 'react';
import UserDetails from './widgets/UserDetails';

Amplify.configure(awsConfig);
Auth.configure(awsConfig);

function App() {
	const userData = useContext(UserContex);

  return (
		<Authenticator>
			{({ signOut, user }) => (
				<div className="App">
					{userData.isLoading ? 
						<h3>Authenticating...</h3> : (<>
						{userData.configed ? <>
							<NavBar signOutFunc={signOut}/>
							<TodayView/>
						</> : <>
							<h3>Add user details</h3>
							<UserDetails isEditing={true} />
						</>}
					</>)}
				</div>
			)}
		</Authenticator>
  );
}

export default (App);
