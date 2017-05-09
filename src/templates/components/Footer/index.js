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
      <a href="http://varya.me">&copy;&nbsp;{ (new Date).getFullYear() }Varya Stepanova</a>
      { ' ' }
      <a href="https://twitter.com/varya_en" title="@varya_en">
        <img alt="Twitter" className="ico" src="http://favicon.yandex.net/favicon/twitter.com" title="Twitter"/>
        { ' ' }
        Follow me on Twitter!
      </a>
    </div>
    <div className={style.right}>
    </div>
  </footer>
</div>
    )

  }

}
