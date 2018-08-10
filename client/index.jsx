import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/components/App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app'));