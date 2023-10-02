// const save = (key: string, value) => {
//   try {
//     const serializedState = JSON.stringify(value);
//     localStorage.setItem(key, serializedState);
//   } catch (error) {
//     // eslint-disable-next-line
//     console.error('Set state error: ', error.message);
//   }
// };

// const get = (key: string) => {
//   try {
//     const serializedState = localStorage.getItem(key);
//     return serializedState === null ? undefined : JSON.parse(serializedState);
//   } catch (error) {
//     // eslint-disable-next-line
//     console.error('Get state error: ', error.message);
//   }
// };

// export default {
//   save,
//   get
// };

type LocalStorageValue<T> = T | null;

const save = <T>(key: string, value: T): void => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    // eslint-disable-next-line
    console.error('Set state error: ', (error as Error).message);
  }
};

const get = <T>(key: string): LocalStorageValue<T> => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? null : (JSON.parse(serializedState) as T);
  } catch (error) {
    // eslint-disable-next-line
    console.error('Get state error: ', (error as Error).message);
    return null;
  }
};

const localStorageService = {
  save,
  get
};

export default localStorageService;
