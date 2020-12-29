import util from 'util';

export function node(spec) {
  let { data } = spec;
  let [left_child, right_child] = [undefined, undefined];
  let color = 'r';

  let get_data = () => data;
  let get_left_child = () => left_child;
  let get_right_child = () => right_child;
  let get_color = () => color;

  let set_left_child = node => { left_child = node; }
  let set_right_child = node => { right_child = node; }
  let toggle_color = new_color => { color = color === 'r' ? 'b' : 'r'; }

  let display = () => {
    process.stdout.write(util.format('%j/%s', data, color));
  }

  return Object.freeze({
    get_data,
    get_left_child,
    get_right_child,
    get_color,
    set_left_child,
    set_right_child,
    toggle_color,
    display
  })
}
