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
