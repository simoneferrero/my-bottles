import '@testing-library/jest-dom'
import jestFetchMock from 'jest-fetch-mock'
import { TextEncoder, TextDecoder } from 'util'

Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true })

jestFetchMock.enableMocks()

process.env.MONGODB_DB = 'bottles'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
