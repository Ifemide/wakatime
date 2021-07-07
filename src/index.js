import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './pages/App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import User from './pages/User'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/leaderboard" component={App} />
        <Route path="/user/:id" component={User} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
