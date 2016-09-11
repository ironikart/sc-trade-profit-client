/*
	@license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt
	
	Copyright (C) 2016 SabineWren
	
	GNU AFFERO GENERAL PUBLIC LICENSE Version 3, 19 November 2007
	https://www.gnu.org/licenses/agpl-3.0.html
	
	@license-end
	
	@Description: Single Source Shortest Path calculation using Dijkstra's algorithm and a replaceable comparator function
	
	TODO:
	- make the comparator function replacable
	- define sourceVertex using an input argument or POST
	- find a solution to not all jump points being defined both directions
	- implement tunnel size restrictions
*/
var path = require('path');
var fs   = require('fs');
var heap = require('heap');

var input = path.resolve(__dirname + '/../data/systems_with_tunnels.json');
    input = JSON.parse( fs.readFileSync(input) );
var distances = {};

//return true if the second tunnel is larger than the first
/*var compareSize = function(tunnel1, tunnel2){
	if( tunnel1['size'] === 'L' )return false;
	if( tunnel2['size'] === 'L' )return true;
	if( tunnel1['size'] === 'M' )return false;
	if( tunnel2['size'] === 'M' )return true;
	return false;
};*/

var compare = function(vertex1, vertex2){
	if( distances[vertex2['system']] < distances[vertex1['system']] )return 1;
	else return -1;
}

//return true if the second tunnel is safer than the first
/*var compareDanger = function(tunnel1, tunnel2){
	if( tunnel2['exit_system_danger'] < tunnel1['exit_system_danger'] )return true;
	return false;
};*/

function relaxVertex(vertexHeap, distances, visitNodes, vertexList){
	var visiting = vertexHeap.pop();
	//inspect each outgoing each at the node we're visiting
	for(edge in visiting['tunnels']){
		var targetSystem = visiting['tunnels'][edge]['exitSystem'];
		
		//if we can get to target system faster thru the visiting one, then do so
		//console.log(distances[visiting['system']]);
		if( 1 + distances[visiting['system']]['distance'] < distances[targetSystem]['distance'] ){
			distances[targetSystem]['distance'] = 1 + distances[visiting['system']]['distance'];
			distances[targetSystem]['parent'] = visiting['system'];
		}
		
		//if the target system isn't on our list of nodes to visit (or have visited) then we need add to push it on the heap
		if( typeof visitNodes[targetSystem] === 'undefined' ){
			visitNodes.push(targetSystem);
			vertexHeap.push(vertexList[targetSystem]);
		}
	}
}

/* @Description: use Dijkstra's algortim to create a Sinlge Source Shortest Path list of all other vertices
 * @Input: all vertex data, source, and comparator function to select shortest edge
 * @Output: a complete path from source to each destination and the corresponding distance
 */
function sssp(vertexList, sourceVertex, comparator, distances){
	var vertexHeap = new heap(comparator);
	var visitNodes = [];
	
	//init all path distances to infinity
	for(vertex in vertexList){
		var edge = {
			parent: "",
			exit: vertexList[vertex]['system'],
			distance: Number.MAX_VALUE
		};
		distances[edge.exit] = edge;
	}
	
	//init starting distances
	for(edge in vertexList[sourceVertex]['tunnels']){
		var targetSystem = vertexList[sourceVertex]['tunnels'][edge]['exitSystem'];
		vertexHeap.push(vertexList[targetSystem]);
		visitNodes.push(targetSystem);
		distances[targetSystem]['distance'] = 1;
		distances[targetSystem]['parent'] = sourceVertex;
	}
	
	//we can immediatly remove sourceVertex from the list because distance to self === 0
	delete vertexList[sourceVertex];
	
	//relax all edges
	while( !vertexHeap.empty() )relaxVertex(vertexHeap, distances, visitNodes, vertexList);
	return distances;
}

//create an array of vertices for us to heapify
var vertexList = [];
for(vertex in input){
	var newVertex = {
		system : input[vertex]['system'],
		danger : input[vertex]['aggregated_danger'],
		tunnels: input[vertex]['tunnels']
	};
	vertexList[newVertex.system] = newVertex;
}

var sourceVertex = input['315']['system'];
var shortestPaths = sssp(vertexList, sourceVertex, compare, distances);

console.log(shortestPaths);

