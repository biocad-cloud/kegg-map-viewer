/// <reference path="../../build/linq.d.ts"/>

$ts(function () {
    // run web app from here
    let check = $ts("#kegg");

    if (check) {
        let kegg = $ts.text("#kegg", false).split(/\s*,\s*/g);
        let kegg_viewer = new biocad.KEGG.viewer("#data", kegg);

        console.log(kegg);
        console.log(kegg_viewer.objects);
    }
});