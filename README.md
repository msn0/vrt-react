# 📸 vrt-react

> Use `vrt-react` to take screenshots of your React components

## Installation

```sh
npm i vrt-react -D
```

## Usage

### Basic example

Let's assume most simple case - we have a very simple `badge.js` component which doesn't take any props and doesn't have dependencies (except React), e.g.

```jsx
import React from 'react;

export default function Badge () {
    return (
        <div>
            Lorem ipsum dolor sit amet
        </div>
    );
}
```

To capture a screenshot of it we need to create `.vrt.js` with a content:

```js
module.exports = {
    main: 'badge.js'
}
```

This `.vrt.js` file informs `vrt-react` that it should generate screenshots for `badge.js` file. We save `.vrt.js` next to our component, e.g.

```
src/components/badge
├── badge.js
└── .vrt.js
```

Once we have it it's time to generate our first screenshots. Just run `vrt-react`, e.g.

```sh
$ npx vrt-react 
```

That's all! The screenshot has been saved under `src/component/badge/__screenshots__/badge-snap.png`.

### 

## License

MIT
