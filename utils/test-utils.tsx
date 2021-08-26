import React from 'react'
import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
} from '@testing-library/react'
import { Provider } from 'react-redux'

import { store as defaultStore, store } from '../app/store'

type Props = {
  children: React.ReactNode
}

interface AugmentedRenderOptions extends RenderOptions {
  store: typeof store
}

function render(
  ui: React.ReactElement,
  { store, ...renderOptions }: Omit<AugmentedRenderOptions, 'queries'> = {
    store: defaultStore,
  }
): RenderResult {
  function Wrapper({ children }: Props) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
