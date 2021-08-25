import '@testing-library/jest-dom'
import jestFetchMock from 'jest-fetch-mock'

// eslint-disable-next-line @typescript-eslint/no-empty-function
Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true })

jestFetchMock.enableMocks()

process.env.MONGODB_DB = 'bottles'
