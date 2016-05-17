import * as path from 'path'
import * as models from '../../models'

export function getAppJSContent(g3Config: models.G3Config): string {
  return `import React from 'react';
import ReactDOM from 'react-dom';
import {Router, ${g3Config.history}} from 'react-router';
import config from './config';
ReactDOM.render(
<Router history={${g3Config.history}} routes={config} />,
document.getElementById('${models.Const.DOM_REACT_ROOT}')
);`
}
