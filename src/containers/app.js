import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBox from '../components/searchBox';
import Scroll from '../components/scroll';
import CardList from '../components/cardList';
import ErrorBoundary from '../components/errorBoundary';
import './app.css'
import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
   return {
       onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
       onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends Component {

    componentDidMount() {
        this.props.onRequestRobots();
    }

    render() {
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter( robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });

        return isPending ?
            <h1>Loading</h1> :
            (
                <div className='tc'>
                    <h1 className='f2'>RoboFriends</h1>
                    <SearchBox searchChange={ onSearchChange }/>
                    <Scroll>
                        <ErrorBoundary >
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);