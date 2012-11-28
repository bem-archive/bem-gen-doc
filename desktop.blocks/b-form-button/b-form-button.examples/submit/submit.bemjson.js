({
    block: 'b-page',
    title: 'b-form-button',
    head: [
        { elem: 'css', url: '_submit.css', ie: false },
        { elem: 'css', url: '_submit', ie: true },
        { block: 'i-jquery', elem: 'core'},
        { elem: 'js', url: '_submit.js' }
    ],
    content: {
        block: 'i-lego-example',
        content: {
            tag: 'form',
            attrs: { action: 'bbb' },
            content: {
                block: 'b-form-button',
                mods: { theme: 'grey-s', size: 's' },
                type: 'submit',
                content: 'Я.Submit'
            }
        }
    }
})