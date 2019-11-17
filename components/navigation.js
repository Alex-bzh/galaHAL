// navigation.js
let navCmpnt = {
	props: {
		nbDocs: {
			type: Object,
			required: true
		}
	},
	template: `
        <nav class="nav nav-tabs">
            <a class="nav-item nav-link active" href="#">Tous ( {{ nbDocs.all }} )</a>
        </nav>
	`
}