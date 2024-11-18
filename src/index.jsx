import { render } from 'preact';

import './style.css';

export function App() {
  return <h1>Hello world</h1>;
}

render(<App />, document.getElementById('app'));
