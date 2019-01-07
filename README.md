# vrt-react

> A tool for easy screenshot testing your React components.

## Installation

```sh
npm i vrt-react
```

## Usage

Create `.vrt.js` with the content:

```js
module.exports = {
    main: 'badge.js'
}
```

Save it next to your component, for example:

```
src/components/badge
├── badge.js
├── badge.css
└── .vrt.js
```

then run

```sh
$ npx vrt-react 
```

That's all! `vrt-react` built your component for you, run in a sandboxed environment, took a screenshot and saved it as ` __screenshots__/badge-snap.png`.

## License

MIT
