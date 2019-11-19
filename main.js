// main.js
let app = new Vue({
    el: '#app',
    data: {
        lab: config.lab,
        idHal: config.idHal,
        docTypes: ['ART', 'COUV', 'OUV', 'COMM', 'DOUV'],
        docs: null,
        selectedDocs: null,
        pubDates: Array(),
        nbDocs: {
            all: 0,
            art: 0,
            couv: 0,
            ouv: 0,
            comm: 0,
            douv: 0,
            other: 0
        }
    },
    components: {
        'author': authorCmpnt,
        'navigation': navCmpnt,
        'references': refCmpnt
    },
    mounted: function() {
        // Fetches the docs written by the author
        this.fetchDocs();
    },
    methods: {
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
            let query = `${this.lab}/?q=authIdHal_s:${this.idHal}&fl=halId_s,docType_s,label_s,producedDate_tdate&facet=true&facet.field=docType_s&rows=500&wt=json&sort=producedDate_tdate+desc`;
            // Fetch API to query the HAL API
            fetch(url + query)
                .then(stream => stream.json())
                .then(data => {
                    this.docs = data.response.docs;     // All the docs
                    this.selectedDocs = this.docs;      // Working copy of the docs
                    this.setPubDates();                 // All the publication dates
                    this.nbDocsByType(                  // Number of docs for each doctype
                        data.facet_counts.facet_fields.docType_s,
                        data.response.numFound
                    );
                })
            ;
        },
        /*
        *   Filters the docs by type
        *   @param {String} docType: the type of the documents
        */
        filterDocs: function(docType = '') {
            // If param is empty, displays all the docs
            if (!docType) {
                this.selectedDocs = this.docs;
            }
            // If param is one of the docTypes
            else if (this.docTypes.indexOf(docType) != -1) {
                // Displays the corresponding documents
                this.selectedDocs = this.docs.filter(function(doc) {
                    return doc.docType_s == docType;
                });
            }
            // Otherwise, displays all the docs which typeDoc is not in this.docTypes
            else {
                this.selectedDocs = this.docs.filter(function(doc) {
                    return doc.docType_s != 'ART'
                        && doc.docType_s != 'COMM'
                        && doc.docType_s != 'COUV'
                        && doc.docType_s != 'OUV'
                        && doc.docType_s != 'DOUV';
                });
            }
        },
        /*
        *   Counts the number of docs for each type of doc
        *   @param {Array} docTypes: all the possible doctypes
        *   @param {Number} nbDocs: number of documents found
        */
        nbDocsByType: function(docTypes, nbDocs) {
            // For each doctype…
            for (var i = this.docTypes.length - 1; i >= 0; i--) {
                // … captures the index of the listed doctypes in the data
                let idx = docTypes.indexOf(this.docTypes[i]);
                // The next index is the proper count
                this.nbDocs[this.docTypes[i].toLowerCase()] = docTypes[idx + 1];
            }
            // Counts the other categories of documents : all, other
            this.nbDocs.all = nbDocs;
            this.nbDocs.other = this.nbDocs.all - (this.nbDocs.art + this.nbDocs.couv + this.nbDocs.ouv + this.nbDocs.comm + this.nbDocs.douv);
        },
        /*
        *   Fills the data with the different publication dates
        */
        setPubDates: function() {
            // For each pubdate…
            for (var i = this.docs.length - 1; i >= 0; i--) {
                // … captures the year (first four numbers)
                let pubdate = this.docs[i].producedDate_tdate.match(/^[0-9]{4}/)[0];
                // Appends the result to the data
                this.pubDates.push(pubdate);
            }
        }
    }
})
