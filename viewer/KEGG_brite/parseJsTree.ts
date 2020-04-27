namespace biocad.KEGG.brite {

    export interface jstree {
        id?: string;
        icon?: string;
        state?: {
            opened?: boolean
        };
        "text": string;
        "children"?: jstree[];
    }

    export function parseTree(briteText: string | IKEGGBrite): jstree {
        let kegg_entries: IKEGGBrite = typeof briteText == "string" ? JSON.parse(briteText) : briteText;
        let tree: jstree = treeTranslator(kegg_entries);

        tree.state = { opened: true };

        return tree;
    }

    function treeTranslator(kegg: IKEGGBrite): jstree {
        if (isNullOrUndefined(kegg.children)) {
            let entry = parseIDEntry(kegg.name);

            return <jstree>{
                id: entry.id,
                text: entry.commonName,
                icon: biocad.icons.codefile
            }
        } else {
            let nodes: jstree[] = $from(kegg.children)
                .Select(treeTranslator)
                .ToArray(false);
            let tree: jstree = <jstree>{
                text: kegg.name,
                children: nodes,
                icon: biocad.icons.filefolder
            };

            return tree;
        }
    }
}