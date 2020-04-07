import hoist from 'hoist-non-react-statics';

export default function(...fns) {
  return (Component) => {
    return fns.reduce((Cur, fn) => hoist(fn(Cur), Cur), Component);
  }
}
