import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box } from 'grommet'

import {
  getBottles,
  selectAllBottles,
  selectError,
  selectLoading,
} from './slice'

const BottlesContainer = (): JSX.Element => {
  const bottles = useSelector(selectAllBottles)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const dispatch = useDispatch()
  let body

  useEffect(() => {
    dispatch(getBottles())
  }, [])

  if (loading) {
    body = 'Loading bottles...'
  } else if (error) {
    body = error
  } else if (!bottles.length) {
    body = 'There are no bottles in your collection.'
  } else {
    body = bottles.map(({ _id, name }) => <Box key={_id}>{name}</Box>)
  }

  return (
    <Box
      data-test="test"
      flex
      flex-wrap={true}
      align="center"
      justify="center"
      pad="medium"
    >
      {body}
    </Box>
  )
}

export default BottlesContainer
