namespace biocad.KEGG {

    export class viewer {

        public constructor(id: string, tree: brite.jstree = brite.parseTree(biocad.keggMaps)) {
            $(id).jstree({
                'core': {
                    'data': [tree]
                }
            });
        }
    }
}