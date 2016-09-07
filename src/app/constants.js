let fs = require('fs');

let matrix = JSON.parse(fs.readFileSync(__dirname + '/../../data/ship_matrix_parsed.json', 'utf8'));
let systems = JSON.parse(fs.readFileSync(__dirname + '/../../data/systems_parsed.json', 'utf8'));
let points = JSON.parse(fs.readFileSync(__dirname + '/../../data/points_parsed.json', 'utf8'));
let pointsGraph = JSON.parse(fs.readFileSync(__dirname + '/../../data/systems_graph.json', 'utf8'));

export {
    matrix,
    systems,
    points,
    pointsGraph
};