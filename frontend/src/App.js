import React,{Component} from 'react';
import './App.css';
import BillEntry from './BillEntry'; 
import Dataentry from './dataentry';

class App extends Component{
	render(){
		return (
			<div className="App">
			<div className="billinfo"><BillEntry/></div>
			<div className="datainfo"><Dataentry/></div>
			</div>
			);
	}
}

export default App;