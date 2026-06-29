const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'src/index.js',
  'src/store/configureStore.js',
  'src/actions/index.js',
  'src/reducers/index.js',
  'src/sagas/index.js',
  'src/components/App.js',
  'src/containers/AppContainer.js'
];

requiredFiles.forEach(function (file) {
  const absolutePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(absolutePath)) {
    throw new Error('Missing required file: ' + file);
  }
});

console.log('Generated app smoke test passed.');
