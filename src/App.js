import React, {useEffect, useState} from 'react'
import './App.css';
import Header from "./header/Header";
import MainContent from "./maincontent/MainContent";
import {BrowserRouter as Router} from 'react-router-dom'
import Recipe from "./maincontent/Recipe";
import {Route, Switch} from 'react-router-dom'
import State from "./store/DataStore";


const App = () => {
    const [init, setInit] = useState(false)

    useEffect(() => State.getData(() => {
        setInit(true)
    }))

    if (init) {
        return (
            <Router>
                <div>
                    <Header/>
                    <Switch>
                        <Route path='/' exact component={MainContent}/>
                        <Route path='/:id' exact component={Recipe}/>
                    </Switch>
                </div>
            </Router>
        )
    } else {
        return (<div/>)
    }
}

export default App;
