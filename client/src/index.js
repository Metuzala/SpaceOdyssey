import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { gsap } from 'gsap';

gsap.from('.m-1', {
	y: '-80%',
	x: '140vw',
	duration: 1,
	repeat: -2,
	repeatDelay: 8
});

gsap.from('.m-2', {
	y: '-50%',
	x: '200vw',
	duration: 1,
	repeat: -3,
	delay: 1,
	repeatDelay: 5
});

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
