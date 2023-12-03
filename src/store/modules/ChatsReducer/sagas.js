import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from '../types';
import axios from 'axios';
import { baseURL, SocketPort } from '../../../services/config';


function* GET_CHAT({payload}) {
    try{
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers.Authorization = "Bearer " + token
        const response = yield call(axios.get, `http://${baseURL}:${SocketPort}/chat/${payload.id}`, payload);
        yield put(actions.GET_CHAT_SUCCESS({ idChat: payload.id, mensagens: [...response.data] }));
    }catch(err) {
        console.log(err)
        yield put(actions.GET_CHAT_SUCCESS({ idChat: payload.id, mensagens: [] }));
    }
}


function* Chats({payload = {}}){
    try{
        if(!payload.filter){
            payload.filter = ""
        }
        const token = yield select(state => state.authreducer.token);
        const iduser = yield select(state => state.authreducer.user.id)
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.get, `http://${baseURL}:${SocketPort}/chat/?user=${iduser}`, payload);
        yield put(actions.CHATS_BUSCAR_SUCCESS({...response.data}));
    }catch(error){
        console.log(error);
        yield  put(actions.CHATS_BUSCAR_FALURE(error));
    }
}

function* CriarChats({payload}){
    try{
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.post, `http://${baseURL}:${SocketPort}/chat/`, payload);
        yield put(actions.CHATS_CRIAR_SUCCESS({...response.data}));
        yield put(actions.CHATS_BUSCAR_REQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.CHATS_CRIAR_FALURE({error}));
    }
}

function* EditarChatsComFoto({payload}){
    try{
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type' :'multipart/form-data',
            'Authorization': `Bearer ${token}`
          };
        const formData = new FormData();
        formData.append('original_name', payload.img.name);
        formData.append('type', payload.img.type);
        formData.append('idchat', payload.id);
        formData.append('tag', 'profile_photo');
        formData.append('file', payload.img);
        const responseFile = yield call(axios.patch, `http://${baseURL}:${SocketPort}/chat_foto/${payload.id}`, formData);
        console.log(responseFile);

        axios.defaults.headers = {
            'Content-Type' :'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.patch, `http://${baseURL}:${SocketPort}/chat/${payload.id}`, payload);
        yield put(actions.CHATS_EDITAR_SUCCESS({...response.data}));
        yield put(actions.CHATS_BUSCAR_REQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.CHATS_EDITAR_FALURE({error}));
    }
}


function* EditarChats({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.patch, `http://${baseURL}:${SocketPort}/chat/${payload.id}`, payload);
        yield put(actions.CHATS_EDITAR_SUCCESS({...response.data}));
        yield put(actions.CHATS_BUSCAR_REQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.CHATS_EDITAR_FALURE({error}));
    }
}

function* DeletarChats({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.delete, `http://${baseURL}:${SocketPort}/chat/${payload.id}`, payload);
        yield put(actions.CHATS_DELETAR_SUCCESS({...response.data}));
        yield put(actions.CHATS_BUSCAR_REQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.CHATS_DELETAR_FALURE({error}));
    }
}

function* DeletarArquivo({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        const response = yield call(axios.delete, `http://${baseURL}:${SocketPort}/arquivo/${payload.id}`, payload);
        yield put(actions.CHATS_ARQUIVO_DELETAR_SUCCESS({...response.data}));
        yield put(actions.CHATS_BUSCAR_REQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.CHATS_ARQUIVO_DELETAR_FALURE({error}));
    }
}



function* User({payload = {}}){
    try{
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.get, `http://${baseURL}:${SocketPort}/user/`, payload);
        yield put(actions.USER_SUCCESS({...response.data}));
    }catch(error){
        console.log("Erro do usuário")
        console.log(error);
        yield  put(actions.USER_FALURE(error));
    }
}

function* CriarUser({payload}){
    try{
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.post, `http://${baseURL}:${SocketPort}/user/`, payload);
        yield put(actions.CRIAR_USER_SUCCESS({...response.data}));
        yield put(actions.CHATS_BUSCAR_REQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.CRIAR_USER_FALURE(error));
    }
}

function* EditarUser({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.patch, `http://${baseURL}:${SocketPort}/user/${payload.id}`, payload);
        yield put(actions.EDITAR_USER_SUCCESS({...response.data}));
        yield put(actions.USER_REQUEST({ ...response.data }));
    }catch(error){
        console.log(error);
        yield put(actions.EDITAR_USER_FALURE(error));
    }
}

function* DeletarUser({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.delete, `http://${baseURL}:${SocketPort}/user/${payload.id}`, payload);
        yield put(actions.DELETAR_USER_SUCCESS({...response.data}));
        yield put(actions.USER_REQUEST({ ...response.data }));
    }catch(error){
        console.log(error);
        yield put(actions.DELETAR_USER_FALURE(error));
    }
}


export default all([
    takeLatest(types.GET_CHAT, GET_CHAT),
    takeLatest(types.CHATS_BUSCAR_REQUEST, Chats),
    takeLatest(types.CHATS_CRIAR_REQUEST, CriarChats),
    takeLatest(types.CHATS_EDITAR_REQUEST, EditarChats),
    takeLatest(types.CHATS_DELETAR_REQUEST, DeletarChats),
    takeLatest(types.CHATS_EDITAR_COM_FOTO_REQUEST, EditarChatsComFoto),
    takeLatest(types.CHATS_ARQUIVO_DELETAR_REQUEST, DeletarArquivo),
    takeLatest(types.USER_REQUEST, User),
    takeLatest(types.CRIAR_USER_REQUEST, CriarUser),
    takeLatest(types.EDITAR_USER_REQUEST, EditarUser),
    takeLatest(types.DELETAR_USER_REQUEST, DeletarUser),
]);
    