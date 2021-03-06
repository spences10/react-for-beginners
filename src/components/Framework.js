import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { StyledButton } from '../theme/components'

const FrameworkList = styled.li`
  margin: 1rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: 100px auto auto;
  grid-template-rows: 3;
  grid-template-areas:
    'image name price'
    'image desc desc'
    'image add  add';
  border: 1px solid ${props => props.theme.black};
  border-radius: 4px;
`
const FrameworkImage = styled.img`
  grid-area: image;
  /* float: left; */
  width: 100px;
  margin-right: 1rem;
`
const FrameworkName = styled.h3`
  margin: 0rem 0.5rem;
  padding: 0rem 0.5rem;
  align-self: center;
  grid-area: name;
  font-size: 2rem;
`
const FrameworkPrice = styled.span`
  margin: 0rem;
  padding: 0rem;
  align-self: center;
  grid-area: price;
`
const FrameworkDesc = styled.p`
  margin: 0rem 0.5rem;
  padding: 0rem 0.5rem;
  grid-area: desc;
`
const AddToOrder = styled(StyledButton)`
  margin: 0rem 0.5rem;
  padding: 0.1rem 0.5rem;
  grid-area: add;
  &:disabled {
    font-size: 2rem;
    color: ${props => props.theme.redViolet};
    background: ${props => props.theme.black};
    border-color: ${props => props.theme.redViolet};
    transform: rotate(-10deg) scale(1) translateY(-130%)
      translateX(-20%);
    cursor: not-allowed;
  }
`

class Framework extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      status: PropTypes.string,
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      price: PropTypes.number
    }),
    addToOrder: PropTypes.func
  }
  render() {
    const { details, index } = this.props
    const isAvailable = details.status === 'available'
    const buttonText = isAvailable ? 'Add to Order' : 'Depreciated'
    return (
      <FrameworkList>
        <FrameworkImage src={details.image} alt={details.name} />
        <FrameworkName>{details.name}</FrameworkName>
        <FrameworkPrice>{details.price} hrs</FrameworkPrice>
        <FrameworkDesc>{details.desc}</FrameworkDesc>
        <AddToOrder
          onClick={() => this.props.addToOrder(index)}
          disabled={!isAvailable}>
          {buttonText}
        </AddToOrder>
      </FrameworkList>
    )
  }
}

export default Framework
