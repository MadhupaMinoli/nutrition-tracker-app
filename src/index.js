import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import aws_exports from './aws-exports'
import Amplify from 'aws-amplify';
import { UserContexProvider } from './store/user-contex';
import { MealRecContextProvider } from './store/meal-records-context';

Amplify.configure(aws_exports);

ReactDOM.render(
  <React.StrictMode>
		<UserContexProvider>
			<MealRecContextProvider>
    		<App />
			</MealRecContextProvider>
		</UserContexProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
