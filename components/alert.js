// alert.js
let alertCmpnt = {
    props: {
        message: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: false,
            default: 'info'
        }
    },
    template: `
        <div class="alert mt-3" :class="'alert-' + type" role="alert">
            {{ message }}
        </div>
    `
}