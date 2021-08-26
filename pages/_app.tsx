import Head from 'next/head'
import { Grommet, ResponsiveContext } from 'grommet'
import { Provider } from 'react-redux'

import { AppProps } from 'next/app'

import { store } from '../app/store'
import theme from '../theme'

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Grommet theme={theme} full>
        <Head>
          <title>My Bottles</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ResponsiveContext.Consumer>
          {(size) => <Component {...pageProps} size={size} />}
        </ResponsiveContext.Consumer>
      </Grommet>
    </Provider>
  )
}

export default App
