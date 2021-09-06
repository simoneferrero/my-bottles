import { useEffect } from 'react'
import { Box } from 'grommet'

import BottleCard from '../../components/BottleCard'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  getBottles,
  selectAllBottles,
  selectError,
  selectLoading,
} from './slice'

const BottlesContainer = (): JSX.Element => {
  const bottles = useAppSelector(selectAllBottles)
  const loading = useAppSelector(selectLoading)
  const error = useAppSelector(selectError)
  const dispatch = useAppDispatch()
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
    body = bottles
      .sort((a, b) => {
        const bottleNameA = a.name.toUpperCase()
        const bottleNameB = b.name.toUpperCase()

        if (bottleNameA < bottleNameB) return -1
        return 1
      })
      .map((bottle) => <BottleCard {...bottle} key={bottle._id} />)
  }

  return (
    <Box
      data-test="test"
      flex
      wrap
      direction="row"
      align="center"
      justify="center"
      pad="medium"
      overflow="scroll"
    >
      {body}
    </Box>
  )
}

export default BottlesContainer
