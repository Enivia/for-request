function fetchMethod(url: string, params: any, options: RequestInit) {
  console.log('fetch method called:', url, params, options);
  return fetch(url);
}

export default fetchMethod;
