import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			robots : [],
			searchField: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => this.setState({robots : users}));
	}

	// must to do the method in this form that -this- will be the App this and not the 
	// this where the event came from ( in our case SearchBox ) 
	onSearchChange = (event) => {
		//must to do to update the state
		this.setState({ searchField: event.target.value });
	}

	render(){

		//destructur
		const { robots, searchField } = this.state;
		const filterRobots = robots.filter(robot => {
		return (robot.name.toLowerCase().includes(searchField.toLowerCase()));
		})

		// if the data still not here from the server
		if(robots.length === 0)
		{
			return <h1 >Loading</h1>
		}
		else {
			return (
				<div className='tc'>
					<h1 className='f1'>RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange} />
					<Scroll>
						<ErrorBoundry>
							<CardList robots={filterRobots} />
						</ErrorBoundry>
					</Scroll>
				</div>
			);
		}
	}
}

export default App;