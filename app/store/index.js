import { createStore } from "redux";
import reducer from "../reducers/";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createEncryptor from 'redux-persist-transform-encrypt'

const encryptor = createEncryptor({
  secretKey: "SECRETKEY"
});

const persistConfig = {
 key: 'root',
 storage: storage,
 stateReconciler: autoMergeLevel2,
 transforms: [encryptor]
};

const pReducer = persistReducer(persistConfig, reducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);
