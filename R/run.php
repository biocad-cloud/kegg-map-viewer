<?php

$mapId = $_GET["map"];
$id    = base64_decode($_GET["objects"]);

# render script for a single kegg pathway map
#
# demo CLI calls:
# 
# R# ./renderMap_CLI.R --objects R08214,K12234,C00168,C01001,K01007 --map map00680 --colors "red;blue;cyan;rgb(8,153,241);green" --export "./report/kegg/"
#
$render = __DIR__ . "/renderMap_CLI.R";
$render = "R# \"$render\" --objects $id --map $mapId --colors blue --silent";

# output html page result
header('Content-Type: text/html;charset=utf-8');
echo exec($render);