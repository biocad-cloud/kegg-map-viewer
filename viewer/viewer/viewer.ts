namespace biocad.KEGG {

    export class viewer {

        /**
         * base64 encoded
        */
        private objects: string;
        private mapDisplay: string;

        public constructor(id: string, objects: string[], tree: brite.jstree = brite.parseTree(biocad.keggMaps)) {
            let tree_container: string = Strings.LTrim(`${id}-kegg-viewer`, "#");

            this.mapDisplay = Strings.LTrim(`${id}-map-viewer`, "#");
            this.objects = Base64.encode(objects.join(","));

            $ts(id).appendElement($ts("<div>", { id: tree_container, class: "tree" }));
            $ts(id).appendElement($ts("<iframe>", {
                id: this.mapDisplay,
                width: "1024px",
                height: "840px",
                "max-width": "1024px",
                frameborder: "no",
                border: "0",
                marginwidth: "0",
                marginheight: "0",
                scrolling: "no",
                allowtransparency: "yes"
            }));

            $("#" + tree_container)
                // listen for event
                .on('changed.jstree', (e, data) => this.showMap(e, data))
                .jstree({
                    'core': {
                        'data': [tree]
                    }
                });
        }

        private showMap(e, data) {
            let id: string = null;

            for (let i = 0, j = data.selected.length; i < j; i++) {
                id = data.instance.get_node(data.selected[i]).id;

                if (Strings.isIntegerPattern(id)) {
                    break;
                }
            }

            if (!Strings.Empty(id, true)) {
                (<HTMLIFrameElement>$ts(this.mapDisplay).any).src = `run?map=${id}&objects=${this.objects}`;
            }
        }
    }
}