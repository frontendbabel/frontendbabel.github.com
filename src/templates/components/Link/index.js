import React, { Component } from 'react'

import style from './style.css'

export default class Link extends Component {

  render() {

    const { href } = this.props
    return (
      <a href={href} className={style.link}>
        {this.props.children}
      </a>
    )

  }

}
