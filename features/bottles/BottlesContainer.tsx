import { useEffect } from 'react'
import { Box } from 'grommet'

import BottleCard from '../../components/BottleCard'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  getBottles,
  selectAllBottles,
  selectError,
  selectLoading,
  selectBottleFormStatus,
} from './slice'

const BottlesContainer = (): JSX.Element => {
  const bottles = useAppSelector(selectAllBottles)
  const loading = useAppSelector(selectLoading)
  const error = useAppSelector(selectError)
  const bottleFormStatus = useAppSelector(selectBottleFormStatus)
  const dispatch = useAppDispatch()
  const isBottleFormOpen = bottleFormStatus === 'open'
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
      .map((bottle) => (
        <BottleCard {...bottle} key={bottle._id} disabled={isBottleFormOpen} />
      ))
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
      overflow={{
        vertical: 'scroll',
        horizontal: 'hidden',
      }}
      style={{ position: 'relative' }}
    >
      {body}
    </Box>
  )
}

export default BottlesContainer
