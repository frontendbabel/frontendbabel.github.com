({
    block: 'page',
    title: 'Article',
    favicon: '/favicon.ico',
    head: [
        { elem: 'css', url: 'index.min.css', ie: false },
        { elem: 'meta', attrs: { name: 'description', content: '' }},
        { elem: 'meta', attrs: { name: 'keywords', content: '' }}
    ],
    content:[
        {
            block: 'header',
            content: [
                {
                    block: 'logo',
                    content: 'Frontend Babel'
                },
                {
                    block: 'site-menu',
                    content: [
                        {
                            elem: 'item',
                            mods: {
                                current: true
                            },
                            content: {
                                block: 'link',
                                url: '#',
                                content: 'Index'
                            }
                        },
                        {
                            elem: 'item',
                            content: {
                                block: 'link',
                                url: '#',
                                content: 'About'
                            }
                        }
                    ]
                }
            ]
        },
        {
            block: 'content',
            content: [
                {
                    block: 'text-header'
                },
                {
                    block: 'article'
                },
                {
                    block: 'posts-list',
                    content: [
                        {
                            elem: 'item',
                            content: [
                                {
                                    block: 'link',
                                    url: '#',
                                    mix: [{ block: 'posts-list', elem: 'link'}],
                                    content: 'Hello world!'
                                },
                                'Text'
                            ]
                        },
                        {
                            elem: 'item',
                            content: [
                                {
                                    block: 'link',
                                    url: '#',
                                    mix: [{ block: 'posts-list', elem: 'link'}],
                                    content: 'Hello world!'
                                },
                                'Text'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            block: 'footer'
        },
        { elem: 'js', url: 'index.min.js' }
    ]
})
