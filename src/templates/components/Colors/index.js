import React, { Component } from 'react'

import style from './style.css'

export default class Colors extends Component {

  render() {

    var colorElements = Object.keys(style).map( i => {
      const key = `color_${i}`
      return <div className={style[i]} key={key}/>
    })


    return (
      <div>
        {colorElements}
      </div>
    )

  }

}
