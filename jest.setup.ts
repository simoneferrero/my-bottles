import '@testing-library/jest-dom'
import jestFetchMock from 'jest-fetch-mock'

Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true })

jestFetchMock.enableMocks()

process.env.MONGODB_DB = 'bottles'
