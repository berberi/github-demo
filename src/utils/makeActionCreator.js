// from http://redux.js.org/docs/recipes/ReducingBoilerplate.html#generating-action-creators

export default function makeActionCreator(type, ...argNames) {
  return function(...args) {
    const action = { type };
    argNames.forEach((arg, index) => (action[arg] = args[index]));
    return action;
  };
}
