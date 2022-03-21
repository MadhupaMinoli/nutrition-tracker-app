import './App.css';
import { UserContexProvider } from './store/user-contex';
import NavBar from './widgets/NavBar';
import TodayView from './widgets/TodayView';
import { Amplify, Auth } from 'aws-amplify';
import awsConfig from './aws-exports';
import awsExports from './aws-exports';
import { withAuthenticator, AmplifySignOut, Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { PropaneSharp } from '@mui/icons-material';

Amplify.configure(awsConfig);
Auth.configure(awsConfig);

function App() {
  return (
		<Authenticator>
		{({ signOut, user }) => (
			<div className="App">
			<UserContexProvider>
				<NavBar signOutFunc={signOut}/>
				<TodayView/>
			</UserContexProvider>
			</div>
		)}
	</Authenticator>
  );
}

export default (App);
