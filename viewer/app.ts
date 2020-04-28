/// <reference path="../../build/linq.d.ts"/>

$ts(function () {
    // run web app from here
    let kegg = $ts.loadJSON("#kegg");
    let kegg_viewer = new biocad.KEGG.viewer("#data", kegg);
});