import React from 'react';
import { render } from 'react-dom';

//Third Parties
import 'normalize.css/normalize.css';

// Local Components
import AppRouter from './routers/AppRouter';
import './styles/styles.scss';

render(<AppRouter />, document.getElementById('app'));
