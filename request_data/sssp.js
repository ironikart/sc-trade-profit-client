/*
	@license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt
	
	Copyright (C) 2016 SabineWren
	
	GNU AFFERO GENERAL PUBLIC LICENSE Version 3, 19 November 2007
	https://www.gnu.org/licenses/agpl-3.0.html
	
	@license-end
	
	@Description: Single Source Shortest Path calculation using Dijkstra's algorithm and a replaceable comparator function
	
	TODO:
	- find a solution to not all jump points being defined both directions
*/

//check if using the visited vertex helps, depending on what weight we're optimizing
//Pure Function
function tryNewEdge(weightVisiting, weightTarget, weightType){
	var weightParent = weightVisiting['parent'];
	if(weightType === 'jumps') return (1 + weightVisiting['distance'] < weightTarget['distance']);
	if(weightType === 'danger')return (weightParent['danger'] + weightVisiting['danger'] < weightTarget['danger']);
}

function relaxVertex(vertexHeap, weights, visitNodes, vertexList, weightType, minSize){
	var visiting = vertexHeap.pop();
	//inspect each outgoing each at the node we're visiting
	for(edge in visiting['tunnels']){
		if( minSize === 'medium' && visiting['tunnels'][edge]['size'] === 'S' )continue;
		if( minSize === 'large'  && visiting['tunnels'][edge]['size'] === 'S' )continue;
		if( minSize === 'large'  && visiting['tunnels'][edge]['size'] === 'M' )continue;
	
		var targetSystem = visiting['tunnels'][edge]['exitSystem'];
		
		//if we can get to target system faster thru the visiting one, then do so
		if( tryNewEdge(weights[visiting['system']], weights[targetSystem], weightType) ){
			weights[targetSystem]['distance'] = 1 + weights[visiting['system']]['distance'];
			weights[targetSystem]['parent'] = visiting['system'];
			weights[targetSystem]['danger'] = visiting['danger'] + visiting['tunnels'][edge]['exit_system_danger'];
			weights[targetSystem]['size']   = visiting['tunnels'][edge]['size'];
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
function sssp(sourceVertexName, weightType, minSize){
	var path = require('path');
	var fs   = require('fs');
	var heap = require('heap');

	var input = path.resolve(__dirname + '/../data/systems_with_tunnels.json');
	    input = JSON.parse( fs.readFileSync(input) );
	
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
	delete(input);

	//return true if using the intermediary vertex yields a lower weight path
	//Pure Functions
	if(weightType === 'jumps')var compare = function(vertex1, vertex2){
		if( weights[vertex2['system']]['distance'] < weights[vertex1['system']]['distance'] )return 1;
		else return -1;
	}
	if(weightType === 'danger')var compare = function(vertex1, vertex2){
		if( weights[vertex2['system']]['danger'] < weights[vertex1['system']]['danger'] )return 1;
		else return -1;
	};
	
	var weights = {};
	var vertexHeap = new heap(compare);
	var visitNodes = [];
	
	//init all path weights to infinity
	for(vertex in vertexList){
		var edge = {
			parent: "",
			exit: vertexList[vertex]['system'],
			//distance: Number.MAX_VALUE,
			//danger: Number.MAX_VALUE
			distance: 500,
			danger: 500
		};
		weights[edge.exit] = edge;
	}
	
	//init starting weights
	vertexHeap.push(vertexList[sourceVertexName]);
	visitNodes.push(sourceVertexName);
	weights[sourceVertexName]['distance'] = 0;
	weights[sourceVertexName]['parent']   = sourceVertexName;
	weights[sourceVertexName]['danger']   = vertexList[sourceVertexName]['danger'];
	weights[sourceVertexName]['size']     = 'N';
	
	//relax all edges
	while( !vertexHeap.empty() )relaxVertex(vertexHeap, weights, visitNodes, vertexList, weightType, minSize);
	return weights;
}

/* allowed tunnel weights: jumps, danger
 * allowed tunnel sizes: small, medium, large
 */
//defaults:
var sourceVertexName = '314';
var weightType = 'jumps';
var minSize = 'small';
if(typeof process.argv[2] !== 'undefined')weightType = process.argv[2];
if(typeof process.argv[3] !== 'undefined')minSize    = process.argv[3];
if(typeof process.argv[4] !== 'undefined')sourceVertexName = process.argv[4];
console.log( sssp(sourceVertexName, weightType, minSize) );
console.log('sourceVertexName = ' + sourceVertexName);
console.log('weightType = ' + weightType);
console.log('minSize = ' + minSize);

