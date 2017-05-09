import React, { Component } from 'react'

import Link from '../Link'

import style from './style.css'

export default class Menu extends Component {

  render() {

    const { lang, texts } = this.props
    const pages = this.props.metadata.collections[`pages_${lang}`]

    const items = pages.map((page, i) => {
      const key = `Menu_${i}`
      return (
        <li className={style.item} key={key}>
          <Link href={page.paths.dhref}>{page.title}</Link>
        </li>
      )
    })

    return (
      <ul className={style.menu}>
        <h3 className={style.title}>
          {texts.menuTitle}
        </h3>
        {items}
      </ul>
    )

  }

}
