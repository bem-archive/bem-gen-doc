({
    block: 'b-page',
    title: 'b-form-button',
    head: [
        { elem: 'css', url: '_link.css', ie: false },
        { elem: 'css', url: '_link', ie: true },
        { block: 'i-jquery', elem: 'core'},
        { elem: 'js', url: '_link.js' }
    ],
    content: {
        block: 'i-lego-example',
        content: [
            {
                tag: 'p',
                content: {
                    block: 'b-form-button',
                    mods: { theme: 'grey-s', size: 's' },
                    url: 'http://ya.ru',
                    content: 'Я.Ссылка'
                }
            },
            {
                tag: 'p',
                content: {
                    block: 'b-form-button',
                    mods: { type: 'simple', theme: 'simple-grey', size: 's' },
                    url: 'http://ya.ru',
                    content: 'Я.Простая ссылка'
                }
            }
        ]
    }
})