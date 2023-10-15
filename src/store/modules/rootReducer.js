import { combineReducers } from 'redux';
import chamadosreducer from './chamadosreducer/reducer';
import funcionarioreducer from './funcionarioreducer/reducer';
import authreducer from './authReducer/reducer';
import empresareducer from './empresareducer/reducer';
import chatreducer from './ChatsReducer/reducer';

export default combineReducers({
    chamadosreducer: chamadosreducer,
    authreducer: authreducer,
    funcionarioreducer: funcionarioreducer,
    empresareducer: empresareducer,
    chatreducer: chatreducer
});
