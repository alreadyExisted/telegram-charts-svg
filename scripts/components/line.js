import { createElement, setAttributes } from '../utils.js'

const defaultOpts = {
  color: '#666',
  data: {
    x: [],
    y: [],
    domain: [0, 0]
  }
}

export class Line {
  constructor(element, opts = {}) {
    const { color, data } = {
      ...defaultOpts,
      ...opts
    }
    this._data = data
    this._element = element
    this._group = createElement('g')
    this._path = createElement('path')

    setAttributes(this._group, {
      class: 'tchart-cartesian-line'
    })

    setAttributes(this._path, {
      fill: 'none',
      stroke: color,
      strokeWidth: '2px'
    })
    
    this._group.appendChild(this._path)
    element.appendChild(this._group)
  }

  draw() {
    const { height } = this._element.getBoundingClientRect()

    setAttributes(this._group, {
      transform: `matrix(1 0 0 -1 0 ${height})`
    })

    setAttributes(this._path, {
      d: this._createPath()
    })
  }

  _createPath() {
    const { x, y, domain: [_, yMax] } = this._data
    const { width, height } = this._element.getBoundingClientRect()
    const xPerc = width / x.length
    const yPerc = height / yMax
    let d = ''

    x.forEach((_, index) => d += index === 0
      ? `M0,${yPerc * y[index]}`
      : `L${xPerc * index},${yPerc * y[index]}`
    )

    return d
  }
}