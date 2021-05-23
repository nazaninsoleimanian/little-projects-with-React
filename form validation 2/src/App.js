import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import InsertData from './components/InsertData'
import ConfirmedData from './components/ConfirmedData'
const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/confirmedData' component={ConfirmedData} />
          <Route exact path='/' component={InsertData} />
        </Switch>
      </Router>
    </>
  )
}
export default App
