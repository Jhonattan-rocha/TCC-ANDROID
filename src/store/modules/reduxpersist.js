import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from 'redux-persist';

export default function reducers(reducers){
    const persistReducers = persistReducer(
        {
            key: "BASE",
            storage: AsyncStorage,
            whitelist: ['authreducer', 'chamadosreducer', 'funcionarioreducer', 'empresareducer', 'chatreducer'],
        }, reducers
    );

    return persistReducers;
};

