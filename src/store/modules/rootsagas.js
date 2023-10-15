import {all} from 'redux-saga/effects';

import LoginSagas from './authReducer/sagas';
import ChamadosReducer from './chamadosreducer/sagas';
import FuncionarioReducer from './funcionarioreducer/sagas';
import empresareducer from './empresareducer/sagas';
import chatsagas from './ChatsReducer/sagas';

export default function* rootSaga(){
    return yield all([LoginSagas, ChamadosReducer, FuncionarioReducer, empresareducer, chatsagas]);
}
