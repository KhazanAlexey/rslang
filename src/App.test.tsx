import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import App from './App'
import { setupStore } from './store/store'

const store = setupStore()
test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  )

  expect(getByText(/learn/i)).toBeInTheDocument()
})
