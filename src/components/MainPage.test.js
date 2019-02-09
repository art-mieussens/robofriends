import { shallow } from 'enzyme';
import React from 'react';
import MainPage from './MainPage';

let wrapperEmptyRobots;
let wrapperOneRobot;

beforeEach(() => {
  const mockPropsEmptyRobots = {
    onRequestRobots: jest.fn(),
    robots: [],
    searchField: '',
    isPending: false
  };
  wrapperEmptyRobots = shallow(<MainPage {...mockPropsEmptyRobots}/>  );

  const mockPropsOneRobot = {
    onRequestRobots: jest.fn(),
    robots: [{
      id: 3,
      name: 'John',
      email: 'john@gmail.com'
    }],
    searchField: 'john',
    isPending: false
  };
  wrapperOneRobot = shallow(<MainPage {...mockPropsOneRobot}/>  );
})

it('renders MainPage without crashing', ()=> {
  expect(wrapperEmptyRobots).toMatchSnapshot();
})

it('filters empty robots list correctly', () => {
  expect(wrapperEmptyRobots.instance().filterRobots([])).toEqual([]);
})

it('filters robots correctly', () => {
  expect(wrapperOneRobot.instance().filterRobots([])).toEqual([
    {
      id: 3,
      name: 'John',
      email: 'john@gmail.com'
    }
  ]);
})