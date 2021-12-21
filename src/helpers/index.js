import {each} from 'lodash';

export const prepareArraySelect = (array, rowValue, rowLabel) => {
  const newArray = [];

  each(array, (item) => {
    const objectItem = {};
    objectItem.value = item[rowValue];
    objectItem.label = item[rowLabel];
    newArray.push(objectItem);
  });
  return newArray;
};

export const customFetch = (url, method, contentType='application/json', token, body) => {
  const options = {
    headers: {
      'Content-Type': contentType,
    },
    method,
  };
  if (token){
    options.headers.Authorization = `Bearer ${token}`
  };
  if(body){
    options.body = JSON.stringify(body);
  }
  return fetch(url, options)
    .then(async (response) => {
      if (!response.ok) {
        const resp = await response.json();
        const { message } = resp;
        return Promise.reject(new Error(`Ocurrió un error en la ruta ${url}: ${message}`));
      }
      return response.json();
    })
    .then(responseData => responseData)
    .catch(e => Promise.reject(e));
};