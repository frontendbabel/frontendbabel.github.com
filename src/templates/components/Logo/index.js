import React, { Component } from 'react'

import style from './style.css'

export default class Logo extends Component {

  render() {
    return (
      <a className={style.logo} href="/">
        <i className={style.symb}>›</i>
        <i className={style.fr}>Frontend</i> <i className={style.bl}>Babel</i>
      </a>
    )

  }

}
