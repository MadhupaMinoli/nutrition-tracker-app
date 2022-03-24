import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import aws_exports from './aws-exports'
import Amplify from 'aws-amplify';
import { UserContexProvider } from './store/user-contex';

Amplify.configure(aws_exports);

ReactDOM.render(
  <React.StrictMode>
		<UserContexProvider>
    	<App />
		</UserContexProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
