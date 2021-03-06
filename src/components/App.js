import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import base from '../base'
import sampleFrameworks from '../sample-frameworks'
import { GlobalStyle, media } from '../theme/globalStyle'
import Framework from './Framework'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'

const FrameworkOfTheDay = styled.div`
  /* min-height: 100vh; */
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  grid-template-areas: 'h h h h o o o o i i i i';
  background: ${props => props.theme.white};
  /* background: papayawhip; */

  ${media.giant`
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto;
    grid-template-areas: 
      'h h h h o o o o i i i i';
    /* background: goldenrod; */
  `};
  ${media.desktop`
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-template-areas: 
      'h h h h o o o o'
      'i i i i . . . .';
    /* background: dodgerblue; */
  `};
  ${media.tablet`
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-template-areas: 
      'h h h h'
      'o o o o'
      'i i i i';
    /* background: mediumseagreen; */
  `};
  ${media.phone`
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-template-areas: 
      'h h h h'
      'o o o o'
      'i i i i';
      /* background: palevioletred; */
  `};
`

const Menu = styled.div`
  grid-area: h;
`

const ListOfFrameworks = styled.ul`
  margin: 0rem;
  padding: 0rem;
  /* display: grid;
  grid-template-columns: 1;
  grid-template-rows: auto; */
`

class App extends React.Component {
  state = {
    frameworks: {},
    order: {}
  }

  static propTypes = {
    match: PropTypes.object
  }

  componentWillMount() {}

  componentDidMount() {
    const { params } = this.props.match

    const localStorageRef = localStorage.getItem(params.storeId)
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }

    this.ref = base.syncState(`${params.storeId}/frameworks`, {
      context: this,
      state: 'frameworks'
    })
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    )
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(
      'framework-of-the-day',
      JSON.stringify(nextState.order)
    )
  }

  // used set and update state
  addFramework = framework => {
    // spread current state into a var
    const frameworks = { ...this.state.frameworks }
    const timestamp = Date.now()
    frameworks[`framework-${timestamp}`] = framework
    // set state with new data frameworks: frameworks or just frameworks
    this.setState({ frameworks })
  }

  updateFramework = (key, updatedFramework) => {
    const frameworks = { ...this.state.frameworks }
    frameworks[key] = updatedFramework
    this.setState({ frameworks })
  }

  removeFramework = key => {
    // copy state
    const frameworks = { ...this.state.frameworks }
    // delete w/ null
    frameworks[key] = null
    // update state
    this.setState({ frameworks })
  }

  loadSamples = () => {
    this.setState({
      frameworks: sampleFrameworks
    })
  }

  addToOrder = key => {
    // copy state into var
    const order = { ...this.state.order }
    // update the order or add new
    order[key] = order[key] + 1 || 1
    // update state
    this.setState({ order })
  }

  removeFromOrder = key => {
    const order = { ...this.state.order }
    delete order[key]
    this.setState({ order })
  }

  render() {
    return (
      <FrameworkOfTheDay>
        <GlobalStyle />
        <Menu>
          <Header tagline={'Fresh JS Framework Market'} />
          <ListOfFrameworks>
            {Object.keys(this.state.frameworks).map(key => (
              <Framework
                key={key}
                index={key}
                details={this.state.frameworks[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ListOfFrameworks>
        </Menu>
        <Order
          frameworks={this.state.frameworks}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFramework={this.addFramework}
          loadSamples={this.loadSamples}
          frameworks={this.state.frameworks}
          updateFramework={this.updateFramework}
          removeFramework={this.removeFramework}
          storeId={this.props.match.params.storeId}
        />
      </FrameworkOfTheDay>
    )
  }
}

export default App
