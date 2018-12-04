import React from 'react';
import {BrowserRouter as Router}from 'react-router-dom';
import store from './../redux/store/store.jsx'
import {Provider} from 'react-redux';

import './App.scss';
import NavHead from '../components/common/navHead.jsx';
import NavLeft from '../components/common/navLeft.jsx';
import Content from '../components/common/content.jsx';

function App() {
	return (
		<Provider store={store}>
			<div>
				<NavHead/>
				<Router>
					<div> 
						<NavLeft/>
						<Content/>
					</div>
				</Router>
			</div>
		</Provider>
	);
} 

export default App;
 