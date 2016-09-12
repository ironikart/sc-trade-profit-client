/*
	@license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt
	
	Copyright (C) 2016 SabineWren
	
	GNU AFFERO GENERAL PUBLIC LICENSE Version 3, 19 November 2007
	https://www.gnu.org/licenses/agpl-3.0.html
	
	@license-end
	
	@Description: Single Source Shortest Path calculation using Dijkstra's algorithm and a replaceable comparator function
*/

//decide if the visiting vertex helps, depending on what weight we're optimizing
//Pure Function
function tryNewEdge(visitingVertex, targetVertex, weightType){
	if(weightType === 'jumps') return (1 + visitingVertex['weightDistance'] < targetVertex['weightDistance']);
	if(weightType === 'danger')return (targetVertex['danger'] + visitingVertex['weightDanger'] < targetVertext['weightDanger']);
}

function relaxVertex(vertexHeap, visitNodes, vertexList, weightType, minSize){
	var visitingVertex = vertexHeap.pop();
	var visitingName   = visitingVertex['system'];
	//inspect each outgoing each at the node we're visiting
	for(edge in visitingVertex['tunnels']){
		if( minSize === 'medium' && visitingVertex['tunnels'][edge]['size'] === 'S' )continue;
		if( minSize === 'large'  && visitingVertex['tunnels'][edge]['size'] === 'S' )continue;
		if( minSize === 'large'  && visitingVertex['tunnels'][edge]['size'] === 'M' )continue;
	
		var targetSystemName = visitingVertex['tunnels'][edge]['exit'];
		
		//if we can get to target system faster thru the visiting one, then do so
		if( tryNewEdge(visitingVertex, vertexList[targetSystemName], weightType) ){
			vertexList[targetSystemName]['weightDistance'] = 1 + visitingVertex['weightDistance'];
			vertexList[targetSystemName]['parent']   = visitingName;
			vertexList[targetSystemName]['weightDanger'] = visitingVertex['weightDanger'] + visitingVertex['tunnels'][edge]['xDanger'];
			vertexList[targetSystemName]['size'] = visitingVertex['tunnels'][edge]['size'];
		}
		
		//if the target system isn't on our list of nodes to visit (or have visited) then we need add to push it on the heap
		if( typeof visitNodes[targetSystemName] === 'undefined' ){
			visitNodes[targetSystemName] = true;
			vertexHeap.push(vertexList[targetSystemName]);
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

	var input = path.resolve(__dirname + '/../data/vertices.json');
	    input = JSON.parse( fs.readFileSync(input) );
	
	//create an array of vertices for us to heapify
	var vertexList = [];
	for(vertex in input){
		//init all vertices and their path weights
		var newVertex = {
			system : input[vertex]['system'],
			danger : input[vertex]['danger'],
			tunnels: input[vertex]['tunnels'],
			parent : sourceVertexName,
			weightDistance: Number.MAX_VALUE,
			weightDanger  : Number.MAX_VALUE
		};
		vertexList[newVertex.system] = newVertex;
	}
	//delete(input);

	//check if an intermediary path improves total weight
	//Pure Functions
	if(weightType === 'jumps')var compare = function(vertex1, vertex2){
		if( vertex2['weightDistance'] < vertex1['weightDistance'] )return  1;
		if( vertex2['weightDistance'] > vertex1['weightDistance'] )return -1;
		else return 0;
	}
	if(weightType === 'danger')var compare = function(vertex1, vertex2){
		if( vertex2['weightDanger'] < vertex1['weightDanger'] )return  1;
		if( vertex2['weightDanger'] > vertex1['weightDanger'] )return -1;
		else return 0;
	};
	
	var vertexHeap = new heap(compare);
	var visitNodes = [];
	
	//init starting weights
	vertexHeap.push(vertexList[sourceVertexName]);
	visitNodes.push(sourceVertexName);
	vertexList[sourceVertexName]['weightDistance'] = 0;
	vertexList[sourceVertexName]['weightParent']   = sourceVertexName;
	vertexList[sourceVertexName]['weightDanger']   = vertexList[sourceVertexName]['danger'];
	vertexList[sourceVertexName]['size']           = 'N';
	
	//relax all edges
	while( !vertexHeap.empty() )relaxVertex(vertexHeap, visitNodes, vertexList, weightType, minSize);
	return vertexList;
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

var resultMatrix = sssp(sourceVertexName, weightType, minSize);
for(result in resultMatrix){
	var system   = resultMatrix[result].system;
	var distance = resultMatrix[result].weightDistance.toString();
	var danger   = resultMatrix[result].weightDanger.toString();
	console.log('system: ' + system + ' distance: ' + distance + ' danger: ' + danger);
}

console.log('weightType = ' + weightType);
console.log('minSize = ' + minSize);
console.log('sourceVertexName = ' + sourceVertexName);

