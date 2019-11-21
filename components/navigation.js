// navigation.js
let navCmpnt = {
    props: {
        nbDocs: {
            type: Object,
            required: true
        }
    },
    template: `
        <nav class="nav nav-tabs my-2" id="docTypesTab" role="tablist">
            <a class="nav-item nav-link active" role="tab" id="all-tab" href="#all"
                v-show="nbDocs.all"
                @click="filterTypeDoc()">
                Tous ({{ nbDocs.all }})
            </a>
            <a class="nav-item nav-link" role="tab" id="art-tab" href="#art"
                v-show="nbDocs.art"
                @click="filterTypeDoc('ART')">
                Articles ({{ nbDocs.art }})
            </a>
            <a class="nav-item nav-link" role="tab" id="couv-tab" href="#couv"
                v-show="nbDocs.couv"
                @click="filterTypeDoc('COUV')">
                Chapitres d’ouvrages ({{ nbDocs.couv }})
            </a>
            <a class="nav-item nav-link" role="tab" id="ouv-tab" href="#ouv"
                v-show="nbDocs.ouv"
                @click="filterTypeDoc('OUV')">
                Ouvrages ({{ nbDocs.ouv }})
            </a>
            <a class="nav-item nav-link" role="tab" id="comm-tab" href="#comm"
                v-show="nbDocs.comm"
                @click="filterTypeDoc('COMM')">
                Communications ({{ nbDocs.comm }})
            </a>
            <a class="nav-item nav-link" role="tab" id="douv-tab" href="#douv"
                v-show="nbDocs.douv"
                @click="filterTypeDoc('DOUV')">
                Direction d’ouvrages ({{ nbDocs.douv }})
            </a>
            <a class="nav-item nav-link" role="tab" id="other-tab" href="#other"
                v-show="nbDocs.other"
                @click="filterTypeDoc('AUTRES')">
                Autres ({{ nbDocs.other }})
            </a>
        </nav>
    `,
    mounted: function() {
        // Enables tabbable tabs
        $('#docTypesTab a').on('click', function (e) {
            e.preventDefault();
            $(this).tab('show');
        });
    },
    methods: {
        /*
        *   Emits an event called filter-type-doc
        *   @param {String} docType: the filter is the type of the document
        */
        filterTypeDoc: function(docType) {
            this.$emit('filter-type-doc', docType);
        }
    }
}