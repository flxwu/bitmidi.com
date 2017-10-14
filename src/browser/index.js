const { h, render } = require('preact') /** @jsx h */
const Provider = require('preact-context-provider')

const App = require('../views/app')
const createStore = require('../store')
const config = require('../../config')
const debugHelper = require('../lib/debug-helper')

let root = document.getElementById('root')
const { store, dispatch } = createStore(update)

// Use server-initialized store values
Object.assign(store, window.storeInit)

const loc = window.location
dispatch('LOCATION_REPLACE', loc.pathname + loc.search + loc.hash)
dispatch('RUN_PENDING_DISPATCH')

update()

function update () {
  const jsx = (
    <Provider store={store} dispatch={dispatch} theme={config.theme}>
      <App />
    </Provider>
  )
  root = render(jsx, document.body, root)
}

/**
 * DEVELOPMENT
 */

// Expose important functions for dev tools debugging
Object.assign(window, { store, dispatch, update, debug: debugHelper })

// Measure page speed
console.timeEnd('render')
window.addEventListener('load', () => console.timeEnd('load'))

// Enable react dev tools (excluded in production)
require('preact/devtools')
