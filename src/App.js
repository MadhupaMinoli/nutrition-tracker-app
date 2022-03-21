import './App.css';
import { UserContexProvider } from './store/user-contex';
import NavBar from './widgets/NavBar';
import TodayView from './widgets/TodayView';

function App() {
  return (
    <div className="App">
			<UserContexProvider>
				<NavBar signOutFunc={signOut}/>
				<TodayView/>
			</UserContexProvider>
    </div>
  );
}

export default App;
