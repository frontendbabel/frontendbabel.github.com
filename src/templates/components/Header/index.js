import React, { Component } from 'react'

import Logo from '../Logo'

import style from './style.css'

export default class Header extends Component {

  render() {
    return (
      <header className={style.header}>
        <div className={style.item}>
          <Logo/>
        </div>
        <div className={style.item}>
          <a href="/about">About</a>
          <a href="/how-to-contribute">How to contribute</a>
        </div>
        <div className={style.itemRight}/>
      </header>
    )

  }

}
