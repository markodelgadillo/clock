import React, { Component } from 'react'
import { render } from 'react-dom'
import moment from 'moment'
import 'moment-timezone'
import styled from 'styled-components'

const Time = styled.div`
  float: left;
  position: relative;
  background: #08f;
  background: radial-gradient(#0a2e38 0%, #000, 70%);
  background-size: 100%;
  text-align: center;
  width: calc(100vh / 3);
  height: calc(100vh / 3);
`

const Value = styled.div`
  font-family: 'Orbitron', sans-serif;
  font-size: 2vw;
  color: #fff;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-shadow: -1px 3px 0 #0a0e27;
`

function times(areas) {
  const zones = []
  for (let i = 0; i < areas.length; i++) {
    const zone = {}
    zone.zone = areas[i].split('/')[1].replace('_', ' ')
    zone.time = moment()
      .tz(areas[i])
      .format('hh:mm:ssa')
    zones.push(zone)
  }
  return zones
}

class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timezones: [
        {
          zone: ['America/Los_Angeles'],
          time: moment()
            .tz('America/Los_Angeles')
            .format('hh:mm:ssa')
        }
      ]
    }
  }

  componentDidMount() {
    setInterval(() => this.tick(), 1000)
  }

  componentWillMount() {
    const timezones = () => {
      return fetch('http://localhost:8888/timezones').then(res => res.json())
    }
    const zones = timezones()
  }

  tick() {
    timezones()
      .then(times)
      .then(timezones => this.setState({ timezones }))
  }

  render() {
    return this.state.timezones.map(timezone => (
      <Time>
        <Value>
          {timezone.zone},<br /> {timezone.time}
        </Value>
      </Time>
    ))
  }
}

render(<Clock />, document.querySelector('#times'))
