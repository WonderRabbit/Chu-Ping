# generator-chuping

`stylesuxx/generator-react-webpack-redux`의 구조를 참고해 만든 Yeoman generator입니다.
기본 앱 generator와 `action`, `reducer`, `saga`, `component`, `container` subgenerator를 제공하고, 생성되는 앱은 Node `12.8.x` 기준의 React + Redux + Redux Saga + Webpack 4 구성을 사용합니다.

## 사용법

```sh
npm install
npx yo ./generators/app --skip-install --project-name sample-saga-app
npx yo ./generators/action fetchUsers
npx yo ./generators/reducer users
npx yo ./generators/saga users
npx yo ./generators/component UserList
npx yo ./generators/container UserPage
```

## 개발 검증

```sh
npm test
```

생성된 앱은 네트워크 설치 없이도 구조 검증을 할 수 있습니다.

```sh
node test/fixtures/validate-generated-app.js <generated-app-root>
```

패키지로 설치하면 Yeoman namespace는 `chuping`입니다.

## 생성되는 앱 구조

- `src/actions`: Redux action constants/action creators
- `src/reducers`: root reducer와 feature reducer
- `src/sagas`: root saga와 watcher/worker saga
- `src/store`: Redux store와 Saga middleware wiring
- `src/components`: presentational component
- `src/containers`: Redux-connected container
