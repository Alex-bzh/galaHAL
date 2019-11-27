// author.js
let authorCmpnt = {
    template: `
        <nav class="navbar navbar-light">
            <a class="navbar-brand" :href="halUrl" target="_blank">{{ author }}</a>
            <search @keyword="queryDocs"></search>
        </nav>
    `,
    components: {
        'search': searchCmpnt
    },
    mounted: function() {
        // Fetches the details of an author
        this.fetchAuthor();
    },
    data: function() {
        return {
            idHal: config.idHal,
            lab: config.lab,
            firstName: null,
            lastName: null
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
        },
        /*
        *   Short function to return the public URL to one repository on HAL
        */
        halUrl: function() {
            // The public URL
            let url = `https://hal.archives-ouvertes.fr/search/index/?`;
            // The query is based on the idHAL of an author
            let queryAuth = `qa[authIdHal_s][]=${this.idHal}`;
            // And optionnaly also on a collection
            let queryLab = (this.lab) ? `&qa[collCode_s][]=${this.lab}` : '';
            // The computed URL
            return url + queryAuth + queryLab;
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
        },
        /*
        *   Transmits the keyword to the main component
        */
        queryDocs: function(keyword) {
            // An event called query-docs will look for the documents
            this.$emit('query-docs', keyword);
        }
    }
}