import React, { Component } from 'react'

import style from './style.css'

export default class Logo extends Component {

  render() {
    return (
      <logo className={style.logo}>
        &sdot;&sdot;&sdot;
        <b className={style.var}>var</b>
        &sdot;
        <b className={style.ya}>ya</b>
        ;
        <b className={style.cursor}/>
      </logo>
    )

  }

}
