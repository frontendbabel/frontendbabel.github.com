import React, { Component } from 'react'

import style from './style.css'

export default class Comments extends Component {

  render() {
    const { title, link, texts } = this.props
    const tumblr = !!this.props.tumblr
    const old = !!this.props.old

    const header = link ? (
      <h2 className={style.header}>
        <a href={link} className={style.link}>
          {title}
        </a>
      </h2>
    ) : (
      <h1 className={style.header}>{title}</h1>
    )

    const insertScriptOld = (ifTumblr) => {
      const disqusId = ifTumblr ? 'varyadaily' : 'varya'
      return {
        '__html': `
                      /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
                      var disqus_shortname = '${disqusId}'; // required: replace example with your forum shortname

                      /* * * DON'T EDIT BELOW THIS LINE * * */
                      (function() {
                          var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                          dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
                          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                      })();
                  `
      }
    }
    const insertScript = () => {
        let identifier = this.props.paths.dir.split('/')
        if (identifier[0] == 'en' || identifier[0] == 'ru') {
          identifier.shift()
        }
        identifier.push('index')
        identifier.push(this.props.lang)
        identifier = identifier.join('-')
        return {
          '__html': `
    (function(){
        window.disqus_shortname = 'varya';
        window.disqus_developer = '1';
        window.disqus_url = 'http://varya.me//${this.props.paths.dir}';
        window.disqus_identifier = '${identifier}';
        window.disqus_title = '${title}';
        if ( window.DISQUS ) {
            return DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.identifier = window.disqus_identifier;
                    this.page.url = window.disqus_url;
                    this.page.title = window.disqus_title;
                }
            });
        }
        else {
          var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
          dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        }
    })();
`
        }
    }

    let Disqus;

    if (old || tumblr) {
      Disqus = (
        <div>
          <div id="disqus_thread"></div>
          <script dangerouslySetInnerHTML={insertScriptOld(tumblr)}/>
        </div>
      )
    } else {
      Disqus = (
        <div>
          <div id="disqus_thread"></div>
          <script dangerouslySetInnerHTML={insertScript()}/>
        </div>
      )
    }


    return (
      <div className={style.comments}>
        <div className={style.body}>
          <h4 className={style.header}>{ texts.commentsTitle }</h4>
        </div>
        <div className={style.island}>
          { Disqus }
        </div>
      </div>
    )

  }

}
