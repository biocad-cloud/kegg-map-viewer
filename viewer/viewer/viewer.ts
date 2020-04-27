namespace biocad.KEGG {

    export class viewer {

		public constructor(id: string) {
			$(id).jstree({
				'core': {
					'data': [
						{
							"text": "Root node",
							"children": [
								{ "text": "Child node 1" },
								{ "text": "Child node 2" }
							]
						}
					]
				}
			});
        }
    }
}