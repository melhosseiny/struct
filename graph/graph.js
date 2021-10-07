import { Stack } from '../stack/stack.js';
import { Queue } from '../queue/queue.js';

function vertex(spec) {
  let { label } = spec;
  let visited = false;

  let get_label = () => label;

  let was_visited = () => visited;
  let mark_visited = () => { visited = true; }
  let reset_visited = () => { visited = false; }

  return Object.freeze({
    get_label,
    was_visited,
    mark_visited,
    reset_visited
  });
}

const MAX_VERTS = 20;

export function graph(spec = { vertex_list: [], adj_mat: [], n_verts: 0 }) {
  let { vertex_list, adj_mat, n_verts } = spec;

  // fill adjacency matrix with zeros
  for (let i = 0; i < MAX_VERTS; i++) {
    adj_mat.push(Array(MAX_VERTS).fill(0));
  }

  let add_vertex = (label) => {
    vertex_list[n_verts] = vertex({ label });
    return n_verts++;
  }

  let add_edge = (start, end) => {
    adj_mat[start][end] = 1;
    adj_mat[end][start] = 1;
  }

  let display_vertex = (v) => {
    console.log(vertex_list[v].get_label());
  }

  let display_vertex_list = () => {
    console.log(vertex_list.map(v => v.get_label()).join(' '));
  }

  let display_adj_mat = () => {
    for (let i = 0; i < n_verts; i++) {
      console.log(adj_mat[i].slice(0, n_verts).join(' '));
    }
  }

  let get_adj_unvisited_vertex = v => {
    for (let j = 0; j < n_verts; j++) {
      if (adj_mat[v][j] === 1 && !vertex_list[j].was_visited()) {
        return j;
      }
    }
    return -1;
  }

  let reset_flags = () => {
    vertex_list.forEach(v => v.reset_visited());
  }

  let dfs = () => {
    const s = Stack({ a: [], nElems: MAX_VERTS });

    // visit vertex 0 and push it onto the stack
    vertex_list[0].mark_visited();
    display_vertex(0);
    s.push(0);

    while (!s.isEmpty()) {
      // get an unvisited vertex adjacent to stack top
      let v = get_adj_unvisited_vertex(s.peek());

      if (v === -1) {
        s.pop(); // pop the stack if you can't find one
      } else {
        // visit the vertex and push it onto the stack
        vertex_list[v].mark_visited();
        display_vertex(v);
        s.push(v);
      }
    }

    reset_flags();
  }

  let bfs = function() {
    const q = Queue({ a: [], nElems: MAX_VERTS });
    let v2 = 0;

    vertex_list[0].mark_visited();
    display_vertex(0);
    q.insert(0);

    while (!q.isEmpty()) {
      let v = get_adj_unvisited_vertex(v2);

      if (v === -1) {
        v2 = q.remove();
      } else {
        vertex_list[v].mark_visited();
        display_vertex(v);
        q.insert(v);
      }
    }

    reset_flags();
  }

  return Object.freeze({
    add_vertex,
    add_edge,
    display_vertex,
    display_vertex_list,
    display_adj_mat,
    dfs,
    bfs
  });
}

const main = () => {
  const gr = graph();

  const a = gr.add_vertex('a');
  const b = gr.add_vertex('b');
  const c = gr.add_vertex('c');
  const d = gr.add_vertex('d');
  const e = gr.add_vertex('e');
  const f = gr.add_vertex('f');
  const g = gr.add_vertex('g');
  const h = gr.add_vertex('h');
  const i = gr.add_vertex('i');

  gr.add_edge(a, b);
  gr.add_edge(b, f);
  gr.add_edge(f, h);
  gr.add_edge(a, c);
  gr.add_edge(a, d);
  gr.add_edge(d, g);
  gr.add_edge(g, i);
  gr.add_edge(a, e);

  console.log("performing dfs");
  gr.dfs();
  console.log("performing bfs");
  gr.bfs();

  gr.display_vertex_list();
  gr.display_adj_mat();
}

// main();
