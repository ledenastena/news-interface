import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import { MemoryRouter } from 'react-router-dom'
import rootReducer from '../src/redux/root.reducer'
import rootSaga from '../src/redux/root.saga'

function buildStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  )

  sagaMiddleware.run(rootSaga)
  return store
}

function render(
  ui,
  { initialState, store = buildStore(initialState), ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    )
  }

  Wrapper.defaultProps = {
    children: null,
  }

  Wrapper.propTypes = {
    children: PropTypes.node,
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { render }
