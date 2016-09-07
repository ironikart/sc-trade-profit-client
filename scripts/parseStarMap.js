/**
 * Read raw star map data:
 * https://robertsspaceindustries.com/starmap
 *
 * Parses the data into a usable graph with relevant information.
 */

var path = require('path');
var assign = require('object.assign');
var fs = require('fs');
var map = require(path.resolve(__dirname, '../data/star_map_raw.json'));

var graphDest = path.resolve(__dirname, '../data/systems_graph.json');
var systemDest = path.resolve(__dirname, '../data/systems_parsed.json');
var jumpPointDest = path.resolve(__dirname, '../data/points_parsed.json');

var graph = [];
var systems = {};
var points = {};
var seen = {};

for (var systemIndex in map.data.systems.resultset) {
    var system = map.data.systems.resultset[systemIndex];
    systems[parseFloat(system.id)] = {
        name:   system.name,
        danger: parseFloat(system.aggregated_danger)
    };
}

for (var tunnel in map.data.tunnels.resultset) {
    var point = map.data.tunnels.resultset[tunnel];
    points[parseFloat(point.entry.id)] = {
        code:     point.entry.code,
        systemId: parseFloat(point.entry.star_system_id)
    };
    points[parseFloat(point.exit.id)] = {
        code:     point.exit.code,
        systemId: parseFloat(point.exit.star_system_id)
    };
    var seenCheck = point.entry.star_system_id+'->'+point.exit.star_system_id;
    if (seen.hasOwnProperty(seenCheck) === false) {
        graph.push([parseFloat(point.entry.star_system_id), parseFloat(point.exit.star_system_id)]);
        seen[seenCheck] = true;
    }
}

var pointsToExport = [];
for (var id in points) {
    pointsToExport.push(assign({id: id}, points[id]));
}

console.log('Writing graph %s', graphDest);
fs.writeFileSync(graphDest, JSON.stringify(graph));

console.log('Writing systems %s', systemDest);
fs.writeFileSync(systemDest, JSON.stringify(systems));

console.log('Writing points %s', jumpPointDest);
fs.writeFileSync(jumpPointDest, JSON.stringify(pointsToExport));