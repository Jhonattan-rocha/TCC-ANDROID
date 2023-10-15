import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';

function* Empresa({payload}){
    try{
        console.log(payload)
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        const response = yield call(axios.post, `/empresa/`, payload);
        yield put(actions.EMPRESA_SUCCESS({... response.data}));
    }catch(error){
        console.log(error)
        yield put(actions.EMPRESA_FALURE());
    }
}

function* EditarEmpresa({payload}){
    try{
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers.Authorization = `Bearer ` + token;
        const response = yield call(axios.put, `/empresa/${payload.id}`, payload);
        yield put(actions.EMPRESA_EDITAR_SUCCESS({... response.data}));
    }catch(error){
        console.log(error)
        yield put(actions.EMPRESA_EDITAR_FALURE({erro: error}));
    };
};

function* BuscarEmpresa({payload = {}}){
    try{
        if(!payload.filter){
            payload.filter = ``
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers.Authorization = `Bearer ` + token;
        const response = yield call(axios.get, `/empresas/?filter=${encodeURIComponent(payload.filter)}`, payload);
        yield put(actions.EMPRESA_BUSCAR_SUCCESS({... response.data}));
    }catch(error){
        yield put(actions.EMPRESA_BUSCAR_FALURE({erro: error}));
    }
}


function* DeletarEmpresa({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.delete, `/empresa/${payload.id}`, payload);
        yield put(actions.EMPRESA_DELETAR_SUCCESS({...response.data}));
        yield put(actions.EMPRESA_BUSCAR_REQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.EMPRESA_DELETAR_FALURE({error}));
    }
}


export default all([
    takeLatest(types.EMPRESA_REQUEST, Empresa),
    takeLatest(types.EMPRESA_EDITAR_REQUEST, EditarEmpresa),
    takeLatest(types.EMPRESA_BUSCAR_REQUEST, BuscarEmpresa),
    takeLatest(types.EMPRESA_DELETAR_REQUEST, DeletarEmpresa)
]);
