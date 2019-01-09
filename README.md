# 📸 @vrt/react

> Use `@vrt/react` to take screenshots of your React components

## Motivation

Once we have unit tests of React components or any other type of tests it's also good to have screenshots of presentational components. Unit tests describes the logic of our component but they don't say anything about how it should look like. It's an anti-pattern to unit-test whether the component has received a proper className - the className can be valid but the color, font-size, margin or any other css property might be wrong causing our component to be badly coloured, displaced or just to look bad. 

GitHub, GitLab and BitBucket do have image diff tools. Once someone created a pull request with code changes it's very helpful to see how the code changes affect the look of the component. Having component's screenshot included in the pull request gives the reviewer a chance to see what's really going on with the component's look.  

## Installation

```sh
$ npm i @vrt/react -D
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

This `.vrt.js` file informs `@vrt/react` that it should generate one screenshot for `badge.js` file. We save `.vrt.js` next to our component, e.g.

```
src/components/badge
├── badge.js
└── .vrt.js
```

Once we have it it's time to generate our first screenshot. Just run `vrt`, e.g.

```sh
$ npx vrt 
```

That's all! The screenshot has been saved under `src/component/badge/__screenshots__/badge-snap.png`.

### 

## License

MIT
