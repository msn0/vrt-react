module.exports = {
    main: 'button',
    presets: [
        {
            name: 'primary',
            props: {
                type: 'primary',
                text: 'click me'
            }
        },
        {
            name: 'secondary',
            props: {
                type: 'secondary',
                text: 'click me'
            }
        },
        {
            name: 'success',
            props: {
                type: 'success',
                text: 'click me'
            }
        },
        {
            name: 'danger',
            props: {
                type: 'danger',
                text: 'click me'
            }
        },
        {
            name: 'button with badge',
            props: {
                type: 'badge',
                text: 'click me'
            }
        },
        {
            name: 'no type',
            props: {
                text: 'click me'
            }
        }
    ]
};
