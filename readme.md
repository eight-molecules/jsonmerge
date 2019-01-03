# Merge Utility

## Installation
To install the dev environment perform `npm install` from the package root.

## Testing
To run tests execute `npm test`. Tests are written using Jasmine and are stored under the `spec` directory.

## Use (CLI)
To merge an option using the defaults:
`node index.js pathToJsonOne pathToJsonTwo pathToJsonThree ...`

There are two options to merge, shallow and deep. The default is a shallow merge. The merge method can be specified with the `-m` flag:
* Shallow: `node index.js -m shallow pathToJsonOne pathToJsonTwo pathToJsonThree ...`
* Deep: `node index.js -m deep pathToJsonOne pathToJsonTwo pathToJsonThree ...`

The shallow merge has multiple merge types available behind the `-t` flag:
* Spread: `node index.js -m shallow -t spread pathToJsonOne pathToJsonTwo`
* Assign: `node index.js -m shallow -t assign pathToJsonOne pathToJsonTwo`
* Loop: `node index.js -m shallow -t loop pathToJsonOne pathToJsonTwo`

You can specify an output file using the `-o` flag:
`node index.js -o ./output/merged.json pathToJsonOne pathToJsonTwo pathToJsonThree ...`

## Sample Files
Three sample JSONs are provided in the `spec/data` directory. Perform merges using the utility with:
- `node index.js ./spec/data/fileOne.json ./spec/data/fileTwo.json ./spec/data/fileThree.json`
- `node index.js -m shallow ./spec/data/fileOne.json ./spec/data/fileTwo.json ./spec/data/fileThree.json`
- `node index.js -m deep ./spec/data/fileOne.json ./spec/data/fileTwo.json ./spec/data/fileThree.json`
