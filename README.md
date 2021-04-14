# for-request

A request tool based on fetch

---

## Installation

```
// npm
npm install --save for-request

// yarn
yarn add for-request
```

## Example

```ts
request<{ id: string; name: string }[]>('/list', { page: 1, limit: 10 })
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    console.error(error);
  });
```

or

```ts
try {
  const res = await request<{ id: string; name: string }[]>('/list', {
    page: 1,
    limit: 10,
  });
  console.log(res);
} catch (e) {
  console.error(e);
}
```

## API

`request(url, [params, [options]]) // default GET method`

`request.config`

`request.get(url, [params, [options]])`

`request.post(url, [params, [options]])`

`request.put(url, [params, [options]])`

`request.delete(url, [params, [options]])`

## Config

request global config

| method     | description                                   | type               |
| ---------- | --------------------------------------------- | ------------------ |
| setOptions | set global request options                    | RequestOptionsInit |
| before     | set the callback method before request        | TBeforeHook        |
| after      | set the callback method after request         | TAfterHook         |
| data       | set the callback method to get request result | TDataHook          |
| error      | set the callback methos to handle error       | TErrorHook         |

example:

```ts
request.config
  .setOptions({ prefix: '/api' })
  .before(() => {
    // start loading
  })
  .after(() => {
    // cancel loading
  })
  .data(result => {
    if (result.succeed) {
      return result.data;
    } else {
      throw Error();
    }
  })
  .error(error => {
    console.error(error);
  });
```

## Options

extends from fetch `RequestInit`

| name         | description                                   | type                      | default |
| ------------ | --------------------------------------------- | ------------------------- | ------- |
| query        | query params                                  | object or URLSearchParams |
| data         | body params                                   | any                       |
| responseType | how to parse return data                      | json, blob or text        | json    |
| getResponse  | whether to get the source response            | boolean                   | false   |
| prefix       | request url prefix                            | string                    |
| suffix       | request url suffix                            | string                    |
| beforeHook   | set the callback method before request        | TBeforeHook               |
| afterHook    | set the callback method after request         | TAfterHook                |
| dataHook     | set the callback method to get request result | TDataHook                 |
| errorHook    | set the callback methos to handle error       | TErrorHook                |
