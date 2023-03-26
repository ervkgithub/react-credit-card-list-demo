import React from 'react';
import './App.css';
import 'h8k-components';
import { DebitCard } from './components/debit-card/DebitCard';
const title = "Cards List";

const App = () => {
    return (
        <div className="App">
			<h8k-navbar header={title}></h8k-navbar>
			<DebitCard />
        </div>
    );
}

export default App;
