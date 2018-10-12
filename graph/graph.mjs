import {Stack} from '../stack/stack';
import {Queue} from '../queue/queue';

function Vertex(spec) {
  let {label} = spec;
  let visited = false;

  let getLabel = function() {
    return label;
  }

  let wasVisited = function() { return visited; }
  let markVisited = function() { visited = true; }
  let resetVisited = function() { visited = false; }

  return Object.freeze({
    getLabel,
    wasVisited,
    markVisited,
    resetVisited
  });
}

const MAX_VERTS = 20;

export function Graph(spec = {vertexList: [], adjMat: [], nVerts: 0, stack: Stack({a: [], nElems: MAX_VERTS}), queue: Queue({a: [], nElems: MAX_VERTS})}) {
  let {vertexList, adjMat, nVerts, stack, queue} = spec;

  // set adjacency matrix to 0
  for (let i = 0; i < MAX_VERTS; i++) {
    adjMat.push(Array(MAX_VERTS).fill(0));
  }

  let addVertex = function(label) {
    vertexList[nVerts] = Vertex({label: label});
    return nVerts++;
  }

  let addEdge = function(start, end) {
    adjMat[start][end] = 1;
    adjMat[end][start] = 1;
  }

  let displayVertex = function(v) {
    console.log(vertexList[v].getLabel());
  }

  let displayVertexList = function() {
    console.log(vertexList.map(function(v) {
      return v.getLabel();
    }));
  }

  let displayAdjMat = function() {
    console.log(adjMat);
  }

  let getAdjUnvisitedVertex = function(v) {
    for (let j = 0; j < nVerts; j++) {
      if (adjMat[v][j] === 1 && !vertexList[j].wasVisited()) {
        return j;
      }
    }
    return -1;
  }

  let resetFlags = function() {
    vertexList.forEach(function(v) {
      v.resetVisited();
    })
  }

  let dfs = function() {
    vertexList[0].markVisited();
    displayVertex(0);
    stack.push(0);

    while (!stack.isEmpty()) {
      let v = getAdjUnvisitedVertex(stack.peek());
      if (v === -1) {
        stack.pop();
      } else {
        vertexList[v].markVisited();
        displayVertex(v);
        stack.push(v);
      }
    }

    resetFlags();
  }

  let bfs = function() {
    vertexList[0].markVisited()
    displayVertex(0);
    queue.insert(0);
    let v2 = 0;

    while (!queue.isEmpty()) {
      let v = getAdjUnvisitedVertex(v2);
      if (v === -1) {
        v2 = queue.remove();
      } else {
        vertexList[v].markVisited();
        displayVertex(v);
        queue.insert(v);
      }
    }
  }

  return Object.freeze({
    addVertex,
    addEdge,
    displayVertex,
    displayVertexList,
    displayAdjMat,
    dfs,
    bfs
  });
}

let graph = Graph();

let a = graph.addVertex('a');
let b = graph.addVertex('b');
let c = graph.addVertex('c');
let d = graph.addVertex('d');
let e = graph.addVertex('e');
let f = graph.addVertex('f');
let g = graph.addVertex('g');
let h = graph.addVertex('h');
let i = graph.addVertex('i');

graph.addEdge(a,b);
graph.addEdge(b,f);
graph.addEdge(f,h);
graph.addEdge(a,c);
graph.addEdge(a,d);
graph.addEdge(d,g);
graph.addEdge(g,i);
graph.addEdge(a,e);

console.log("performing dfs");
graph.dfs();
console.log("performing bfs");
graph.bfs();

graph.displayVertexList();
graph.displayAdjMat();
