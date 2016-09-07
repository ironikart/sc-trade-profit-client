// Modified from source: http://stackoverflow.com/questions/32527026/shortest-path-in-javascript

function Graph() {
    var neighbors = this.neighbors = {}; // Key = vertex, value = array of neighbors.

    this.addEdge = function (u, v) {
        if (neighbors[u] === undefined) { // Add the edge u -> v.
            neighbors[u] = [];
        }
        neighbors[u].push(v);
        if (neighbors[v] === undefined) { // Also add the edge v -> u so as
            neighbors[v] = []; // to implement an undirected graph.
        } // For a directed graph, delete
        neighbors[v].push(u); // these four lines.
    };

    return this;
}

// Breadth-first sort of a graph.
function bfs(graph, source) {
    var sorted = [];
    var queue = [{
            vertex: source,
            count: 0
        }],
        visited = {
            source: true
        },
        tail = 0;
    while (tail < queue.length) {
        var u = queue[tail].vertex,
            count = queue[tail++].count; // Pop a vertex off the queue.

        sorted.push({
            source: source,
            target: u,
            steps:  count
        });

        graph.neighbors[u].forEach(function (v) {
            if (!visited[v]) {
                visited[v] = true;
                queue.push({
                    vertex: v,
                    count: count + 1
                });
            }
        });
    }

    return sorted;
}

function shortestPath(graph, source, target) {
    if (source === target) {
        return [];
    }
    var queue = [source],
        visited = {
            source: true
        },
        predecessor = {},
        tail = 0;
    while (tail < queue.length) {
        var u = queue[tail++], // Pop a vertex off the queue.
            neighbors = graph.neighbors[u];

        if (Array.isArray(neighbors) === true) {
            for (var i = 0; i < neighbors.length; ++i) {
                var v = neighbors[i];
                if (visited[v]) {
                    continue;
                }
                visited[v] = true;
                if (v === target) { // Check if the path is complete.
                    var path = [v]; // If so, backtrack through the path.
                    while (u !== source) {
                        u = predecessor[u];
                        path.push(u);
                    }
                    path.reverse();
                    return path;
                }
                predecessor[v] = u;
                queue.push(v);
            }
        }
    }

    return [];
    //console.log('there is no path from ' + source + ' to ' + target);
}

export {
    Graph,
    bfs,
    shortestPath
};