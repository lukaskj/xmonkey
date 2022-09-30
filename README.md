# X-Monkey Scripts Lib

Library to help building scripts for x-monkey extensions (Greasemonkey, Tampermonkey, Violentmonkey, etc) using typescript.

## Usage
- Install the dependencies (`npm install`);
- Configuration script is on `script-config.js` file. It contains the `UserScript` metadata that has to be at every `UserScript` file;
- The entrypoint is the `src/index.ts` file and the UserScript must implement the `IExecutableScript` interface.
And, of course, customizations are open;
- __Do not use default exports__. Only named exports, please. (or remove the minifier on rollup configuration file);
- To build the script, run `npm run build` and the bundler will create the file `dist/index.js`. That is the only file needed to be imported on the extension;

- __Note:__  For now, CSS are only supported for Violentmonkey (maybe Tampermonkey as well, not tested on Firemonkey) as the custom rollup plugin concat the bundled css file on `dist/index.js` inside the `GM.addStyle` function. Custom rollup plugin mentioned is located at `rollup/plugins/x-monkey-import-css.js`.


### NPM/Yarn Scripts
- `yarn start:dev` -> Runs the project using `ts-node`
- `yarn build` -> builds the project using rollup
- `yarn start` -> builds the project and runs the compiled version
- `yarn test` -> tests
- `yarn test:watch` -> watch tests
- `yarn test:cov` -> run test coverage
- `yarn lint` -> linter
- `yarn format` -> run prettier to format code


Note: `npm` can be used intead of `yarn`


### TODO
[ ] Create an UI lib
 
[ ] Clean dist files. Example: since type files are note used for UserScripts, no need for them

[ ] Better project configuration (for typescript, eslint, etc)