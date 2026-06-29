const path = require('path');
const fs = require('fs');
const os = require('os');
const childProcess = require('child_process');
const nodeAssert = require('assert');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const generatorRoot = path.join(__dirname, '..', 'generators');
const yoBin = path.join(__dirname, '..', 'node_modules', '.bin', 'yo');

function runGenerator(name, args, prompts) {
  return helpers
    .run(path.join(generatorRoot, name))
    .withArguments(args || [])
    .withPrompts(prompts || {});
}

function runGeneratorInDir(name, args, directory) {
  return helpers
    .run(path.join(generatorRoot, name))
    .inDir(directory)
    .withArguments(args || []);
}

function runGeneratorInDirWithPrompts(name, args, directory, prompts) {
  return helpers
    .run(path.join(generatorRoot, name))
    .inDir(directory)
    .withArguments(args || [])
    .withPrompts(prompts || {});
}

function assertFileInDir(directory, filePath) {
  nodeAssert.strictEqual(fs.existsSync(path.join(directory, filePath)), true, filePath);
}

function assertFileContentInDir(directory, filePath, pattern) {
  const content = fs.readFileSync(path.join(directory, filePath), 'utf8');
  nodeAssert.match(content, pattern);
}

function assertMatchCountInDir(directory, filePath, pattern, expectedCount) {
  const content = fs.readFileSync(path.join(directory, filePath), 'utf8');
  const matches = content.match(pattern) || [];
  nodeAssert.strictEqual(matches.length, expectedCount, filePath + ' match count');
}

function runYo(directory, generatorName, args) {
  childProcess.execFileSync(yoBin, [path.join(generatorRoot, generatorName)].concat(args || []), {
    cwd: directory,
    env: Object.assign({}, process.env, {
      HOME: directory,
      XDG_CONFIG_HOME: path.join(directory, '.config'),
      NPM_CONFIG_PREFIX: path.join(directory, '.npm-global'),
      YO_DISABLE_INSIGHT: '1'
    }),
    stdio: 'pipe'
  });
}

describe('chuping:app', function () {
  it('generates a Node 12.8 React Redux Saga application', function () {
    return runGenerator('app', [], { projectName: 'sample-saga-app', skipInstall: true }).then(function () {
      assert.file([
        'package.json',
        'DESIGN.md',
        'webpack.config.js',
        'babel.config.js',
        'src/index.js',
        'src/store/configureStore.js',
        'src/actions/index.js',
        'src/reducers/index.js',
        'src/sagas/index.js',
        'src/components/App.js',
        'src/containers/AppContainer.js'
      ]);

      assert.fileContent('package.json', /"node": "12\.8\.x"/);
      assert.fileContent('package.json', /"redux-saga": "1\.2\.3"/);
      assert.fileContent('src/store/configureStore.js', /createSagaMiddleware/);
      assert.fileContent('src/sagas/index.js', /all/);
    });
  });
});

describe('chuping subgenerators', function () {
  it('composes generated files into one app without duplicate root registrations', function () {
    const projectDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chuping-composed-'));

    return runGeneratorInDirWithPrompts('app', [], projectDir, { projectName: 'sample-saga-app', skipInstall: true }).then(function () {
      runYo(projectDir, 'action', ['fetchUsers']);
      runYo(projectDir, 'action', ['fetchUsers']);
      runYo(projectDir, 'reducer', ['users']);
      runYo(projectDir, 'reducer', ['users']);
      runYo(projectDir, 'saga', ['users']);
      runYo(projectDir, 'saga', ['users']);
      runYo(projectDir, 'component', ['UserList']);
      runYo(projectDir, 'container', ['UserPage']);

      assertFileInDir(projectDir, 'src/actions/fetchUsers.js');
      assertFileInDir(projectDir, 'src/reducers/users.js');
      assertFileInDir(projectDir, 'src/sagas/users.js');
      assertFileInDir(projectDir, 'src/components/UserList.js');
      assertFileInDir(projectDir, 'src/containers/UserPage.js');

      assertFileContentInDir(projectDir, 'src/actions/fetchUsers.js', /FETCH_USERS_REQUEST/);
      assertFileContentInDir(projectDir, 'src/reducers/users.js', /USERS_INITIAL_STATE/);
      assertFileContentInDir(projectDir, 'src/sagas/users.js', /takeLatest/);
      assertFileContentInDir(projectDir, 'src/components/UserList.js', /function UserList/);
      assertFileContentInDir(projectDir, 'src/containers/UserPage.js', /connect/);

      assertMatchCountInDir(projectDir, 'src/actions/index.js', /export \* from '\.\/fetchUsers';/g, 1);
      assertMatchCountInDir(projectDir, 'src/reducers/index.js', /import usersReducer from '\.\/users';/g, 1);
      assertMatchCountInDir(projectDir, 'src/reducers/index.js', /users: usersReducer,/g, 1);
      assertMatchCountInDir(projectDir, 'src/sagas/index.js', /import usersSaga from '\.\/users';/g, 1);
      assertMatchCountInDir(projectDir, 'src/sagas/index.js', /usersSaga\(\),/g, 1);
    });
  });
});
