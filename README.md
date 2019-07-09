# @ts-delight/route-pattern-builder

A simple type-safe route pattern builder library.
A good companion for [express](https://github.com/expressjs/express), [hookrouter](https://www.npmjs.com/package/hookrouter), [route-parser](https://github.com/rcs/route-parser) etc.

## Installation

```
yarn add @ts-delight/route-pattern-builder
```

## Usage

```
import {pattern} from "@ts-delight/route-pattern-builder";

const userOnboardingRoutePattern = pattern()
    .literal('/user/onboarding/')
    .param('id')
    .slash()
    .splat('details')

userOnboardingRoutePattern.pattern // "/user/onboarding/:id/*details"

type UserOnboardParams = typeof userOnboardingRoutePattern.Type; // { id: string, details?: string }
```

Some more examples can be found in the [test suite](https://github.com/ts-delight/route-pattern-builder/blob/master/test/index.test.ts).

**Protip:** Use [babel-plugin-preval](https://github.com/kentcdodds/babel-plugin-preval) to generate the pattern at compile time.

## Contributing

Contributions are welcome in form of code-contributions, bug reports and feedback for improvement.

### Local Development

Below is a list of commands you will probably find useful.

#### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

Your library will be rebuilt if you make edits.

#### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

#### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.
