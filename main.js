// main.js
/*
*   galaHAL configuration
*   Two keys:
*       - lab: acronym of a lab
*       - idHal: a unique idHal
*/
const config = {
    lab: 'LLF',
    idHal: 'alexandre-roulois'
}
// App galaHAL
let app = new Vue({
    el: '#app',
    data: {
        lab: config.lab,
        idHal: config.idHal,
        firstName: null,
        lastName: null,
        docs: null
    },
    mounted: function() {
        // Fetches the details of an author
        this.fetchAuthor();
        // Fetches the docs written by the author
        this.fetchDocs();
    },
    components: {},
    computed: {
        /*
        *   An author is composed by a first name, a last name
        *   and the lab between parenthesis.
        */
        author: function() {
            return this.firstName + ' ' + this.lastName + ' (' + this.lab + ')';
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
            let query = '?&q=idHal_s:' + this.idHal + '&fl=firstName_s,lastName_s&rows=1&wt=json';
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
        *   Retrieves the docs written by an author
        */
        fetchDocs: function() {
            // HAL API: bibliographical references
            let url = 'https://api.archives-ouvertes.fr/search/';
            // Builds the query
            let query = this.lab + '/?q=authIdHal_s:' + this.idHal + '&rows=500&wt=json';
            // Fetch API to query the HAL API
            fetch(url + query)
                .then(stream => stream.json())
                .then(data => this.docs = data.response.docs)
            ;
        },
        /*
        *   Decodes HTML entities
        */
        decodeHtml: function(html) {
            return $('<div>').html(html).text();
        }
    }
})
