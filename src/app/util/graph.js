import Graph from 'node-dijkstra';

/**
 * Create a new graph from an array of edges. Edges can be numeric or string.
 *
 * @param {Array}    edges  Edges in the format [[0, 1], [0, 2], [1, 2]].
 * @param {Function} costFn Customise the costs assigned to an edge.
 *
 * @return {Graph} Instantiated Graph class.
 */
function createGraphFromEdgeNodes(edges, costFn = () => 1) {
    let graph = new Graph();
    let nodes = {};

    function pushNode(x, y) {
        if (!nodes[x]) {
            nodes[x] = {};
        }

        if (!nodes[x].hasOwnProperty(y)) {
            nodes[x][y] = costFn(x, y);
        }
    }

    edges.forEach((edge) => {
        let [x, y] = edge;
        pushNode(x, y);
        pushNode(y, x); // Undirected graph.
    });

    for (var node in nodes) {
        if (nodes.hasOwnProperty(node)) {
            graph.addNode(node, nodes[node]);
        }
    }

    return graph;

}//end createGraphFromEdgeNodes()

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
    return graph.path(''+source, ''+target, { cost: true});

}//end shortestPath()

export {
    createGraphFromEdgeNodes,
    shortestPath
};