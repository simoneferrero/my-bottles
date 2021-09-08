import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
} from 'grommet'
import { Edit } from 'grommet-icons'

import { useAppDispatch } from '../../app/hooks'
import { setBottleFormOpen } from '../../features/bottles/slice'

import { Bottle } from '../../types/Bottle'
import BOTTLE_CATEGORIES from '../../constants/bottleCategories'

const BottleCard = ({
  category,
  name,
  type,
  volume,
  year,
  _id,
  quantity,
}: Bottle): JSX.Element => {
  const dispatch = useAppDispatch()
  const selectedCategory = BOTTLE_CATEGORIES.find(
    (bottleCategory) => category === bottleCategory.value
  )
  const selectedType = selectedCategory?.types?.find(
    (bottleType) => type === bottleType.value
  )
  const displayName = `${name}${year ? ` (${year})` : ''}`
  const displayCategory = `${selectedCategory.label}${
    selectedType ? `: ${selectedType.label}` : ''
  }`
  const displayQuantity = `Quantity: ${quantity}`

  return (
    <Card
      height="medium"
      width="medium"
      background={{
        image: 'url(https://www.the-wine.club/admin/logo/bottle.png)',
        position: 'center',
        size: 'contain',
      }}
      margin="medium"
      data-testid={_id}
    >
      <CardHeader
        pad="small"
        justify="between"
        background={{
          color: 'light-1',
          opacity: 0.8,
        }}
      >
        <Box>
          <Heading level="4" margin="none">
            {displayName}
          </Heading>
        </Box>
        <Box>
          <Heading level="5" margin="none" textAlign="end">
            {displayCategory}
          </Heading>
          <Text size="x-small" textAlign="end">{`ABV: ${volume}%`}</Text>
        </Box>
      </CardHeader>
      <CardBody />
      <CardFooter pad="small" background="light-2" justify="between">
        <Box>{displayQuantity}</Box>
        {/* TODO: Add action to open edit menu */}
        <Button
          a11yTitle={`Edit ${displayName}`}
          icon={<Edit />}
          onClick={() => dispatch(setBottleFormOpen(_id))}
        />
      </CardFooter>
    </Card>
  )
}

export default BottleCard
