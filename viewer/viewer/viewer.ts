namespace biocad.KEGG {

    export class viewer {

        public constructor(id: string, tree: brite.jstree = brite.parseTree(biocad.keggMaps)) {
            $(id)
                // listen for event
                .on('changed.jstree', function (e, data) {
                    let i, j, r = [];

                    for (i = 0, j = data.selected.length; i < j; i++) {
                        r.push(data.instance.get_node(data.selected[i]).text);
                    }

                    console.log('Selected: ' + r.join(', '));
                }).jstree({
                    'core': {
                        'data': [tree]
                    }
                });
        }
    }
}