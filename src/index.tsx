import * as React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

const config = require('./config')

render(
  <Router history={browserHistory} routes={config} />,
  document.getElementById('root')
)
