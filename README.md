# vrt-react

> A tool for easy screenshot testing your React components.

## Installation

```sh
npm i vrt-react
```

## Usage

### Basic example

Create `.vrt.js` with the content:

```js
module.exports = {
    main: 'badge.js'
}
```

This `.vrt.js` file informs `vrt-react` that it should generate screenshots for `badge.js` file. Save `.vrt.js` next to your component, for example:

```
src/components/badge
├── badge.js
├── badge.css
└── .vrt.js
```

Once you did it it's time to generate your first screenshots. Just run `vrt-react`, e.g.

```sh
$ npx vrt-react 
```

That's all! `vrt-react` built your component for you, run in a sandboxed environment, took a screenshot and saved it as ` __screenshots__/badge-snap.png`.

## License

MIT
