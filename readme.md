# Merge Utility

## Installation
To install the dev environment perform `npm install` from the package root.

## Testing
To run tests execute `npm test`. Tests are written using Jasmine and are stored under the `spec` directory.

## Use (CLI)
To merge using the default shallow merge:
- `node index.js pathToJsonOne pathToJsonTwo`
- `node index.js shallow pathToJsonOne pathToJsonTwo`

To merge using a shallow merge and a specified merge method:
* Spread: `node index.js shallow spread pathToJsonOne pathToJsonTwo`
* Assign: `node index.js shallow assign pathToJsonOne pathToJsonTwo`
* Assign: `node index.js shallow loop pathToJsonOne pathToJsonTwo`

To perform a deep merge:
- `node index.js deep pathToJsonOne pathToJsonTwo`

The output is stored to a file at `output/merged.json` and printed to the console. The printed merge result may be piped into other utilities as needed.

## Sample Files
Two sample JSONs are provided in the `spec/data` directory. Perform merges using the utility with:
- `node index.js ./spec/data/fileOne.json ./spec/data/fileTwo.json`
- `node index.js shallow ./spec/data/fileOne.json ./spec/data/fileTwo.json`
- `node index.js deep ./spec/data/fileOne.json ./spec/data/fileTwo.json`
