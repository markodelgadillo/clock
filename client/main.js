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
  font-size: 1.5vw;
  color: #fff;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-shadow: -1px 3px 0 #0a0e27;
`
const timezones = () => {
  return fetch('http://localhost:8888/timezones').then(res => res.json())
}
const zones = timezones()

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
    setInterval(() => this.tick(), 500)
  }

  tick() {
    timezones()
      .then(times)
      .then(timezones => this.setState({ timezones }))
  }

  render() {
    return this.state.timezones.map(timezone => (
      <Time key={timezone.zone}>
        <Value>
          {timezone.zone},<br /> {timezone.time}
        </Value>
      </Time>
    ))
  }
}

render(<Clock />, document.querySelector('#times'))
/*
// old code

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

function render(time) {
  const $time = document.createElement('div')
  const $value = document.createElement('div')
  $time.classList.add('time')
  $value.classList.add('value')
  $time.appendChild($value)
  $value.textContent = `${time.zone} ${time.time}`
  return $time
}

const timezones = () => {
  return fetch('/timezones').then(res => res.json())
}

const zones = timezones()

const doWork = () => {
  zones
    .then(data => times(data))
    .then(data => data.map(render))
    .then(data => {
      document.querySelector('#times').innerHTML = ''
      data.forEach(element => {
        document.querySelector('#times').appendChild(element)
      })
    })
}

setInterval(doWork, 16)

*/
