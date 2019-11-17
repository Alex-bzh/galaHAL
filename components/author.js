// author.js
let authorCmpnt = {
	template: `
		<h1>{{ author }}</h1>
	`,
	mounted: function() {
        // Fetches the details of an author
        this.fetchAuthor();
	},
	data: function() {
		return {
			idHal: config.idHal,
			lab: config.lab,
        	firstName: null,
        	lastName: null,
		}
	},
    computed: {
        /*
        *   An author is composed by a first name, a last name
        *   and the lab between parenthesis.
        */
        author: function() {
            // If this.lab is empty, do not print the acronym
            let lab = (this.lab) ? ` (${this.lab})` : '';
            return `${this.firstName} ${this.lastName}${lab}`;
        }
    },
	methods: {
		/*
        *   Retrieves the first and last names of an author.
        */
        fetchAuthor: function() {
            // HAL API: author repository
            let url = 'https://api.archives-ouvertes.fr/ref/author/';
            // Builds the query
            let query = `?&q=idHal_s:${this.idHal}&fl=firstName_s,lastName_s&rows=1&wt=json`;
            // Uses Fetch APi to query the HAL API
            fetch(url + query)
                .then(stream => stream.json())
                .then(data => {
                    // Sets the firstname
                    this.firstName = data.response.docs[0].firstName_s,
                    // Sets the lastname
                    this.lastName = data.response.docs[0].lastName_s
                })
            ;
        }
	}
}