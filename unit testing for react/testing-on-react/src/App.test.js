import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react'
import ReactDOM from 'react-dom'


test('renders learn react link', () => {
  // render(<App />);
  // const linkElement = screen.getByText(/Hello Universe/i);
  // expect(linkElement).toBeInTheDocument();
  const div = document.createElement('div');
  ReactDOM.render(<App/>,div);
  ReactDOM.unmountComponentAtNode(div);
});
