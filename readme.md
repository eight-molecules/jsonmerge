# Merge Utility

## Installation
To install the dev environment perform `npm install` from the package root.

## Testing
To run tests execute `npm test`. Tests are written using Jasmine and are stored under the `spec` directory.

## Use (CLI)
To merge using the default shallow merge:
`node index.js pathToJsonOne pathToJsonTwo`
`node index.js shallow pathToJsonOne pathToJsonTwo`

To merge using a shallow merge and a specified merge method:
* Spread: `node index.js shallow spread pathToJsonOne pathToJsonTwo`
* Assign: `node index.js shallow assign pathToJsonOne pathToJsonTwo`

To perform a deep merge:
`node index.js deep pathToJsonOne pathToJsonTwo`

The output to the console is the resulting merged json. This may be piped into other utilities as needed.

## More comments
This utility uses promises in the execution portion to enable chained asynchronous operations. The reading of files uses asynchronous execution wrapped in a promise to allow the async/await paradigm to be used in the top level module. The actual merge algorithm runs synchronously as promises would simply resolve immediately and add a small amount of overhead.