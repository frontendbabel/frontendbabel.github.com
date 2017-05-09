import React, { Component } from 'react'

import Header from '../Header'
import Layout from '../Layout'
import Footer from '../Footer'

import style from './style.css'

export default class Page extends Component {


  render() {
    return (
      <div className={style.page}>
        <Header/>
        <Layout {...this.props}>
          { this.props.children }
        </Layout>
        <Footer {...this.props}/>
      </div>
    )

  }

}
