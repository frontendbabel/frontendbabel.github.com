import React, { Component } from 'react'

import style from './style.css'

export default class Footer extends Component {

  render() {
    return (
<div className={style.outer}>
  <footer className={style.footer}>
    <div className={style.left}>
    </div>
    <div className={style.center}>
      Some text
    </div>
    <div className={style.right}>
    </div>
  </footer>
</div>
    )

  }

}
