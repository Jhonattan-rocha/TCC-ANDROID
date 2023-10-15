import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';

function* Funcionario({payload}){
    try{
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers.Authorization = `Bearer ` + token;
        const response = yield call(axios.post, `/funcionario/`, payload);
        yield put(actions.FUNCIONARIO_CRIAR_SUCCESS({... response.data}));
        yield put(actions.FUNCIONARIO_BUSCAR_REQUEST());
    }catch(error){
        console.log(error)
        yield put(actions.FUNCIONARIO_CRIAR_FALURE({erro: error}));
    }
}

function* EditarFuncionario({payload}){
    try{
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers.Authorization = `Bearer ` + token;
        const response = yield call(axios.put, `/funcionario/${payload.id}`, payload);
        yield put(actions.FUNCIONARIO_EDITAR_SUCCESS({... response.data}));
        yield put(actions.FUNCIONARIO_BUSCAR_REQUEST());
    }catch(error){
        console.log(error)
        yield put(actions.FUNCIONARIO_EDITAR_FALURE({erro: error}));
    };
};

function* BuscarFuncionario({payload = {}}){
    try{
        if(!payload.filter){
            payload.filter = ""
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers.Authorization = `Bearer ` + token;
        const response = yield call(axios.get, `/funcionarios/?filter=${encodeURIComponent(payload.filter)}`, payload);
        yield put(actions.FUNCIONARIO_BUSCAR_SUCCESS({... response.data}));
    }catch(error){
        yield put(actions.FUNCIONARIO_BUSCAR_FALURE({erro: error}));
    }
}


function* DeletarFuncionario({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.delete, `/funcionario/${payload.id}`, payload);
        yield put(actions.FUNCIONARIO_DELETAR_SUCCESS({...response.data}));
        yield put(actions.FUNCIONARIO_BUSCAR_REQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.FUNCIONARIO_DELETAR_FALURE({error}));
    }
}


function* Setores({payload = {}}){
    try{
        if(!payload.filter){
            payload.filter = ""
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.get, `/setores/?filter=${encodeURIComponent(payload.filter)}`, payload);
        yield put(actions.SETORES_SUCCESS({...response.data}));
    }catch(error){
        console.log(error);
        yield  put(actions.SETORES_FALURE({error}));
    }
}

function* CriarSetor({payload}){
    try{
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.post, `/setor/`, payload);
        yield put(actions.CRIAR_SETORES_SUCCESS({...response.data}));
        yield put(actions.SETORES_REQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.CRIAR_SETORES_FALURE({error}));
    }
}

function* EditarSetor({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.put, `/setor/${payload.id}`, payload);
        yield put(actions.EDITAR_SETORES_SUCCESS({...response.data}));
        yield put(actions.SETORES_REQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.EDITAR_SETORES_FALURE({error}));
    }
}

function* DeletarSetor({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.delete, `/setor/${payload.id}`, payload);
        yield put(actions.DELETAR_SETORES_SUCCESS({...response.data}));
        yield put(actions.SETORES_REQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.DELETAR_SETORES_FALURE({error}));
    }
}

//cargos


function* Cargos({payload = {}}){
    try{
        if(!payload.filter){
            payload.filter = ""
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.get, `/cargos/?filter=${encodeURIComponent(payload.filter)}`, payload);
        yield put(actions.CARGOS_SUCCESS({...response.data}));
    }catch(error){
        console.log(error);
        yield  put(actions.CARGOS_FALURE({error}));
    }
}

function* CriarCargo({payload}){
    try{
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.post, `/cargo/`, payload);
        yield put(actions.CRIAR_CARGO_SUCCESS({...response.data}));
        yield put(actions.CARGOS_REQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.CRIAR_CARGO_FALURE({error}));
    }
}

function* EditarCargo({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.put, `/cargo/${payload.id}`, payload);
        yield put(actions.EDITAR_CARGO_SUCCESS({...response.data}));
        yield put(actions.CARGOS_REQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.EDITAR_CARGO_FALURE({error}));
    }
}

function* DeletarCargo({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.delete, `/cargo/${payload.id}`, payload);
        yield put(actions.DELETAR_CARGO_SUCCESS({...response.data}));
        yield put(actions.CARGOS_REQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.DELETAR_CARGO_FALURE({error}));
    }
}


function* Perfis({payload = {}}){
    try{
        if(!payload.filter){
            payload.filter = ""
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.get, `/perfis/?filter=${encodeURIComponent(payload.filter)}`, payload);
        yield put(actions.PERFIL_BUSCAR_SUCCESS({...response.data}));
    }catch(error){
        console.log(error);
        yield  put(actions.PERFIL_BUSCAR_FALURE({error}));
    }
}

function* CriarPerfil({payload}){
    try{
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.post, `/perfil/`, payload);
        yield put(actions.PERFIL_CRIAR_SUCCESS({...response.data}));
    }catch(error){
        console.log(error);
        yield put(actions.PERFIL_CRIAR_FALURE({error}));
    }
}

function* EditarPerfil({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.put, `/perfil/${payload.id}`, payload);
        yield put(actions.PERFIL_EDITAR_SUCCESS({...response.data}));
        yield put(actions.PERFIL_BUSCAR_REQUEST({}));
    }catch(error){
        console.log(error);
        yield put(actions.PERFIL_EDITAR_FALURE({error}));
    }
}

function* DeletarPerfil({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        const response = yield call(axios.delete, `/perfil/${payload.id}`, payload);
        yield put(actions.PERFIL_DELETAR_SUCCESS({...response.data}));
    }catch(error){
        console.log(error);
        yield put(actions.PERFIL_DELETAR_FALURE({error}));
    }
}

function* Comentarios({payload = {}}){
    try{
        if(!payload.filter){
            payload.filter = ""
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.get, `/comentarios/?filter=${encodeURIComponent(payload.filter)}`, payload);
        yield put(actions.COMENTARIO_BUSCAR_SUCCESS({...response.data}));
    }catch(error){
        console.log(error);
        yield  put(actions.COMENTARIO_BUSCAR_FALURE({error}));
    }
}

function* CriarComentario({payload}){
    try{
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.post, `/comentario/`, payload);
        yield put(actions.COMENTARIO_CRIAR_SUCCESS({...response.data}));
        yield put(actions.COMENTARIO_BUSCAR_REQUEST({filter: 'id_chamado+eq+'+payload.id_chamado}))
    }catch(error){
        console.log(error);
        yield put(actions.COMENTARIO_CRIAR_FALURE({error}));
    }
}

function* EditarComentario({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.put, `/comentario/${payload.id}`, payload);
        yield put(actions.COMENTARIO_EDITAR_SUCCESS({...response.data}));
        yield put(actions.COMENTARIO_BUSCAR_REQUEST({}));
    }catch(error){
        console.log(error);
        yield put(actions.COMENTARIO_EDITAR_FALURE({error}));
    }
}

function* DeletarComentario({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        const response = yield call(axios.delete, `/comentario/${payload.id}`, payload);
        yield put(actions.COMENTARIO_DELETAR_SUCCESS({...response.data}));
        yield put(actions.COMENTARIO_BUSCAR_REQUEST({filter: 'id_chamado+eq+'+payload.id_chamado}))
    }catch(error){
        console.log(error);
        yield put(actions.COMENTARIO_DELETAR_FALURE({error}));
    }
}


export default all([
    takeLatest(types.FUNCIONARIO_CRIAR_REQUEST, Funcionario),
    takeLatest(types.FUNCIONARIO_EDITAR_REQUEST, EditarFuncionario),
    takeLatest(types.FUNCIONARIO_BUSCAR_REQUEST, BuscarFuncionario),
    takeLatest(types.FUNCIONARIO_DELETAR_REQUEST, DeletarFuncionario),
    takeLatest(types.SETORES_REQUEST, Setores),
    takeLatest(types.CRIAR_SETORES_REQUEST, CriarSetor),
    takeLatest(types.EDITAR_SETORES_REQUEST, EditarSetor),
    takeLatest(types.DELETAR_SETORES_REQUEST, DeletarSetor),
    takeLatest(types.CARGOS_REQUEST, Cargos),
    takeLatest(types.CRIAR_CARGO_REQUEST, CriarCargo),
    takeLatest(types.EDITAR_CARGO_REQUEST, EditarCargo),
    takeLatest(types.DELETAR_CARGO_REQUEST, DeletarCargo),
    takeLatest(types.PERFIL_BUSCAR_REQUEST, Perfis),
    takeLatest(types.PERFIL_CRIAR_REQUEST, CriarPerfil),
    takeLatest(types.PERFIL_EDITAR_REQUEST, EditarPerfil),
    takeLatest(types.PERFIL_DELETAR_REQUEST, DeletarPerfil),
    takeLatest(types.COMENTARIO_BUSCAR_REQUEST, Comentarios),
    takeLatest(types.COMENTARIO_CRIAR_REQUEST, CriarComentario),
    takeLatest(types.COMENTARIO_EDITAR_REQUEST, EditarComentario),
    takeLatest(types.COMENTARIO_DELETAR_REQUEST, DeletarComentario),
]);
