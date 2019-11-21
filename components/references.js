// references.js
let refCmpnt = {
    props: {
        docs: {
            type: Object,
            required: true
        },
        pubDates: {
            type: Array,
            required: true
        }
    },
    template: '\
        <ul class="list-unstyled ml-2">\
            <li v-for="docs in docsByYears" v-show="docs[1].length > 0">\
                <span class="h5">{{ docs[0] }}</span>\
                <ul>\
                    <li v-for="doc in docs[1]" :key="doc.halId_s" class="text-justify">\
                        <a :href="`https://hal.archives-ouvertes.fr/${doc.halId_s}`" target="_blank">{{ doc.halId_s }}</a>\
                        <span>{{ decodeHtml(doc.label_s) }}</span>\
                    </li>\
                </ul>\
            </li>\
        </ul>\
    ',
    computed: {
        /*
        *   Organizes the references by years
        */
        docsByYears: function() {
            // Creates a new object
            let references = new Object();
            // For each pubdate…
            for (var i in this.pubDates) {
                // … creates a new key (i.e references["2020"]) with an empty array
                references[this.pubDates[i]] = new Array();
            }
            // Fills the references object with the items transmitted by the prop
            for (var i in this.docs) {
                let producedYear = this.docs[i].producedDate_tdate.match(/^[0-9]{4}/)[0];
                references[producedYear].push(this.docs[i]);
            }
            this.isEmpty = false;
            // Returns the references sorted by produced year
            return this.sortDocsByDate(references);
        }
    },
    methods: {
        /*
        *   Decodes HTML entities
        */
        decodeHtml: function(html) {
            return $('<div>').html(html).text();
        },
        /*
        *   Transforms an object into an array and sort it by produced year desc
        *   @param {Object} docs: the references to sort and reversed
        */
        sortDocsByDate: function(docs) {
            // New array because an object can not be sorted
            var sortable = [];
            // For each produced year…
            for (var year in docs) {
                // … appends it and the associated documents to the sortable array
                sortable.push([year, docs[year]]);
            }
            sortable
                // Using a comparaison function to sort the years
                .sort(function(a, b) {
                    return a[1] - b[1];
                })
                // and apply a descendant sorting option
                .reverse()
            ;
            // Self explicit
            return sortable;
        }
    }
}