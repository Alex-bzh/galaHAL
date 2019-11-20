// search.js
let searchCmpnt = {
    template:`
        <form class="form-inline">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="magnifying-glass">
                        <span class="oi oi-magnifying-glass"></span>
                    </span>
                </div>
                <input
                    class="form-control mr-sm-2"
                    type="search"
                    placeholder="Titre, contributeur"
                    aria-label="Rechercher"
                    id="search"
                    v-model="keyword"
                    @keyup="transmitKey" />
            </div>
        </form>
    `,
    data: function() {
        return {
            keyword: null
        }
    },
    methods: {
        /*
        *   Event to transmit the keyword to the component Author
        */
        transmitKey: function() {
            // An event called keyword is triggered
            this.$emit('keyword', this.keyword);
        }
    }
}