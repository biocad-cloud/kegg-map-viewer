namespace biocad.KEGG {

    export class mapSelector {

        private container: IHTMLElement;

        public constructor(divId: string, public brite = biocad.keggMaps) {
            this.container = $ts(divId);
            this.createCategory();
        }

        private createCategory() {
            let i = 1;
            let mapEntry: NamedValue<string>;
            let selects: string[] = [];
            let firstCategory: HTMLInputElement;
            let firstMapSelector: HTMLElement;

            for (let category of this.brite.children) {
                let container = $ts("<div>");
                let selectCategory = $ts("<input>", { type: "radio", name: "category", value: `select_${i++}` });
                let opts = $ts("<select>", { id: $input(selectCategory).value, style: "display: none;" });

                if (!firstCategory) firstCategory = <any>selectCategory;
                if (!firstMapSelector) firstMapSelector = <any>opts;

                selects.push(opts.id);

                container.appendElement(selectCategory);
                container.appendElement($ts("<div>").display(category.name));
                container.appendElement(opts);

                for (let mapClass of category.children) {
                    let subclass = $ts("<optgroup>", { label: mapClass.name });

                    for (let map of mapClass.children) {
                        mapEntry = Strings.GetTagValue(map.name);
                        subclass.appendElement($ts("<option>", { id: mapEntry.name }).display(mapEntry.value));
                    }

                    opts.appendElement(subclass);
                }

                this.container.appendElement(container);

                selectCategory.onchange = function () {
                    for (let categoryId of selects) {
                        $ts(`#${categoryId}`).hide();
                    }

                    $ts(`#${$ts.value("!category")}`).show();
                }
            }

            firstCategory.checked = true;
            firstMapSelector.style.display = "block";
        }
    }
}