namespace biocad.KEGG.brite {

    export interface jstree {
        "text": string;
        "children"?: jstree[];
    }

    export function parseTree(briteText: string | IKEGGBrite): jstree {
        let kegg_entries: IKEGGBrite = typeof briteText == "string" ? JSON.parse(briteText) : briteText;
        let tree: jstree = treeTranslator(kegg_entries);

        return tree;
    }

    function treeTranslator(kegg: IKEGGBrite): jstree {
        if (isNullOrUndefined(kegg.children)) {
            return <jstree>{
                text: kegg.name
            }
        } else {
            let nodes: jstree[] = $from(kegg.children)
                .Select(treeTranslator)
                .ToArray(false);
            let tree: jstree = <jstree>{
                text: kegg.name,
                children: nodes
            };

            return tree;
        }
    }
}