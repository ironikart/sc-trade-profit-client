'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.shortestPath = exports.createGraphFromEdgeNodes = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _nodeDijkstra = require('node-dijkstra');

var _nodeDijkstra2 = _interopRequireDefault(_nodeDijkstra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a new graph from an array of edges. Edges can be numeric or string.
 *
 * @param {Array}    edges  Edges in the format [[0, 1], [0, 2], [1, 2]].
 * @param {Function} costFn Customise the costs assigned to an edge.
 *
 * @return {Graph} Instantiated Graph class.
 */
function createGraphFromEdgeNodes(edges) {
    var costFn = arguments.length <= 1 || arguments[1] === undefined ? function () {
        return 1;
    } : arguments[1];

    var graph = new _nodeDijkstra2.default();
    var nodes = {};

    function pushNode(x, y) {
        if (!nodes[x]) {
            nodes[x] = {};
        }

        if (!nodes[x].hasOwnProperty(y)) {
            nodes[x][y] = costFn(x, y);
        }
    }

    edges.forEach(function (edge) {
        var _edge = _slicedToArray(edge, 2);

        var x = _edge[0];
        var y = _edge[1];

        pushNode(x, y);
        pushNode(y, x); // Undirected graph.
    });

    for (var node in nodes) {
        if (nodes.hasOwnProperty(node)) {
            graph.addNode(node, nodes[node]);
        }
    }

    return graph;
} //end createGraphFromEdgeNodes()

/**
 * Return the shortest path to an edge with ordered by least cost.
 *
 * @param {Graph}          graph  Instantiated graph with edges.
 * @param {String|Integer} source Source node.
 * @param {String|Integer} target Target node.
 *
 * @return {Object} Both path and cost.
 */
function shortestPath(graph, source, target) {
    return graph.path('' + source, '' + target, { cost: true });
} //end shortestPath()

exports.createGraphFromEdgeNodes = createGraphFromEdgeNodes;
exports.shortestPath = shortestPath;