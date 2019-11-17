// main.js
let app = new Vue({
    el: '#app',
    data: {
        lab: config.lab,
        idHal: config.idHal,
        docs: null,
        nbDocs: {
            all: 0
        }
    },
    components: {
        'author': authorCmpnt,
        'navigation': navCmpnt
    },
    mounted: function() {
        // Fetches the docs written by the author
        this.fetchDocs();
    },
    methods: {
        /*
        *   Decodes HTML entities
        */
        decodeHtml: function(html) {
            return $('<div>').html(html).text();
        },
        /*
        *   Retrieves the docs written by an author.
        *   If the parameter this.lab is not empty,
        *   the list is restricted to publications
        *   affiliated with the lab.
        */
        fetchDocs: function() {
            // HAL API: bibliographical references
            let url = 'https://api.archives-ouvertes.fr/search/';
            // Builds the query
            let query = `${this.lab}/?q=authIdHal_s:${this.idHal}&fl=halId_s,docType_s,label_s&rows=500&wt=json`;
            // Fetch API to query the HAL API
            fetch(url + query)
                .then(stream => stream.json())
                .then(data => {
                    this.docs = data.response.docs,
                    this.nbDocs.all = data.response.numFound
                })
            ;
        }
    }
})
