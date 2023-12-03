import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import * as actions from './actions';
import * as actionsChats from '../ChatsReducer/actions';
import * as actionsFuncionarios from '../funcionarioreducer/actions';
import * as types from '../types';
import axios from '../../../services/axios';

function* Chamado({payload}){
    try{
        const token = yield select(state => state.authreducer.token);
        const iduser = yield select(state => state.authreducer.user.id);
        const username = yield select(state => state.authreducer.user.nome);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.post, "/chamado/", payload);
        yield put(actions.ChamadoSUCCESS({...response.data}));
        
        if(payload.anexos.length > 0){
            for(let anexo of payload.anexos){
                anexo.id_chamado = response.data.result.id
                yield put(actions.ARQUIVO_CRIAR_REQUEST(anexo));
            }
        }

        if(payload.comentarios.length > 0){
            for(let comentario of payload.comentarios){
                let dados = {conteudo: comentario, id_chamado: response.data.result.id, id_funcionario_criador: iduser};
                yield put(actionsFuncionarios.COMENTARIO_CRIAR_REQUEST(dados));
            }
        }

        yield put(actionsChats.CHATS_CRIAR_REQUEST({id: response.data.result.id, titulo: response.data.result.causa, descricao: response.data.result.descricao, status: 'em aberto', iduser: iduser, username: username}))

        yield put(actions.CHAMADOSREQUEST({filter: `id_funcionario_criador+eq+${iduser}`}));
    }catch(error){
        console.log(error);
        yield  put(actions.ChamadoFALURE(error));
    }
}


function* Chamados({payload = {}}){
    try{
        if(!payload.filter){
            payload.filter = ``
        };
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers.Authorization = `Bearer ` + token;
        const response = yield call(axios.get, `/chamados/?filter=${encodeURIComponent(payload.filter)}`, payload);
        yield put(actions.CHAMADOSSUCCESS({...response.data}));
    }catch(error){
        console.log(error)
        yield put(actions.CHAMADOSFALURE());
    }
}

function* EditarChamado({payload}){
    try{
        const token = yield select(state => state.authreducer.token);
        const user = yield select(state => state.authreducer);
        axios.defaults.headers.Authorization = `Bearer ` + token
        const response = yield call(axios.put, `/chamado/${payload.id}`, payload);
        yield put(actions.EDITAR_CHAMADOSUCCESS({...response.data}))
        yield put(actions.CHAMADOSREQUEST({filter: `id_funcionario_criador+eq+${user.user.id}`}));
    }catch(error){
        console.log(error)
        yield put(actions.EDITAR_CHAMADOFALURE())
    }
}

function* DeletarChamado({payload}){
    try{
        const token = yield select(state => state.authreducer.token);
        const user = yield select(state => state.authreducer);
        axios.defaults.headers.Authorization = `Bearer ` + token
        const response = yield call(axios.delete, `/chamado/${payload.id}`, payload);
        yield put(actions.DELETAR_CHAMADO_SUCCESS({...response.data}))
        yield put(actions.CHAMADOSREQUEST({filter: `id_funcionario_criador+eq+${user.user.id}`}));
    }catch(error){
        yield put(actions.DELETAR_CHAMADO_FALURE())
    }
}

function* Status({payload = {}}){
    try{
        if(!payload.filter){
            payload.filter = ""
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.get, `/statuslist/?filter=${encodeURIComponent(payload.filter)}`, payload);
        yield put(actions.STAUTS_SUCCESS({...response.data}));
    }catch(error){
        console.log(error);
        yield  put(actions.STATUS_FALURE({error}));
    }
}

function* GetStatus({payload}){
    try{
        if(!payload.id){
            alert(`Id inválido`)
            return
        }

        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.get, `/status/${payload.id}`, payload);
        yield put(actions.GET_STATUS_SUCCESS({...response.data}));
    }catch(error){
        console.log(error);
        yield  put(actions.GET_STATUS_FALURE({error}));
    }
}

function* CriarStatus({payload}){
    try{
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.post, `/status/`, payload);
        yield put(actions.CRIAR_STAUTS_SUCCESS({...response.data}));
        yield put(actions.STATUS_REQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.CRIAR_STATUS_FALURE({error}));
    }
}

function* EditarStatus({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.put, `/status/${payload.id}`, payload);
        yield put(actions.EDITAR_STAUTS_SUCCESS({...response.data}));
        yield put(actions.STATUS_REQUEST({ ...response.data }));
    }catch(error){
        console.log(error);
        yield put(actions.EDITAR_STATUS_FALURE({error}));
    }
}

function* DeletarStatus({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.delete, `/status/${payload.id}`, payload);
        yield put(actions.DELETAR_STAUTS_SUCCESS({...response.data}));
        yield put(actions.STATUS_REQUEST({ ...response.data }));
    }catch(error){
        console.log(error);
        yield put(actions.DELETAR_STATUS_FALURE({error}));
    }
}

function* ExecProcedure({payload = {}}){
    try{
        yield put(actions.ISLOADING({load: false}))
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.post, `/consult/`, payload);
        yield put(actions.EXEC_PROCEDURE_SUCCESS({...response.data}));
        yield put(actions.ISLOADING({load: true}));
    }catch(error){
        console.log(error)
        yield put(actions.EXEC_PROCEDURE_FALURE());
    }
}


function* Categorias({payload= {}}){
    try{
        if(!payload.filter){
            payload.filter = ""
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.get, `/categorias/?filter=${encodeURIComponent(payload.filter)}`, payload);
        yield put(actions.CATEGORIAS_SUCCESS({...response.data}));
    }catch(error){
        console.log(error);
        yield  put(actions.CATEGORIAS_FALURE({error}));
    }
}

function* CriarCategoria({payload}){
    try{
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.post, `/categoria/`, payload);
        yield put(actions.CRIAR_CATEGORIAS_SUCCESS({...response.data}));
        yield put(actions.CATEGORIAS_REQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.CRIAR_CATEGORIAS_FALURE({error}));
    }
}

function* EditarCategoria({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.put, `/categoria/${payload.id}`, payload);
        yield put(actions.EDITAR_CATEGORIAS_SUCCESS({...response.data}));
        yield put(actions.CATEGORIAS_REQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.EDITAR_CATEGORIAS_FALURE({error}));
    }
}

function* DeletarCategoria({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.delete, `/categoria/${payload.id}`, payload);
        yield put(actions.DELETAR_CATEGORIAS_SUCCESS({...response.data}));
        yield put(actions.CATEGORIAS_REQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.DELETAR_CATEGORIAS_FALURE({error}));
    }
}


function* SubCategorias({payload = {}}){
    try{
        if(!payload.filter){
            payload.filter = ""
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.get, `/subcategorias/?filter=${encodeURIComponent(payload.filter)}`, payload);
        yield put(actions.SUBCATEGORIAS_SUCCESS({...response.data}));
    }catch(error){
        console.log(error);
        yield  put(actions.SUBCATEGORIAS_FALURE({error}));
    }
}

function* CriarSubCategoria({payload}){
    try{
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.post, `/subcategoria/`, payload);
        yield put(actions.CRIAR_SUBCATEGORIAS_SUCCESS({...response.data}));
        yield put(actions.SUBCATEGORIAS_REQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.CRIAR_SUBCATEGORIAS_FALURE({error}));
    }
}

function* EditarSubCategoria({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.put, `/subcategoria/${payload.id}`, payload);
        yield put(actions.EDITAR_SUBCATEGORIAS_SUCCESS({...response.data}));
        yield put(actions.SUBCATEGORIAS_REQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.EDITAR_SUBCATEGORIAS_FALURE({error}));
    }
}

function* DeletarSubCategoria({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.delete, `/subcategoria/${payload.id}`, payload);
        yield put(actions.DELETAR_SUBCATEGORIAS_SUCCESS({...response.data}));
        yield put(actions.SUBCATEGORIAS_REQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.DELETAR_SUBCATEGORIAS_FALURE({error}));
    }
}



function* Arquivos({payload = {}}){
    try{
        if(!payload.filter){
            payload.filter = ""
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.get, `/arquivos/?filter=${encodeURIComponent(payload.filter)}`, payload);
        yield put(actions.ARQUIVO_BUSCAR_SUCCESS({...response.data}));
    }catch(error){
        console.log(error);
        yield  put(actions.ARQUIVO_BUSCAR_FALURE({error}));
    }
}

function* CriarArquivos({payload}){
    try{
        const token = yield select(state => state.authreducer.token);
        const iduser = yield select(state => state.authreducer.user.id);

        axios.defaults.headers = {
            'Content-Type' :'multipart/form-data',
            'Authorization': `Bearer ${token}`
        };
        const formData = new FormData();
        formData.append('originalname', payload.originalname);
        formData.append('filename', payload.filename);
        formData.append('id_dono', iduser);
        formData.append('mime_type', payload.mime_type);
        formData.append('id_chamado', payload.id_chamado);
        formData.append('file', payload.file);
        const response = yield call(axios.post, `/arquivo/`, formData);
        yield put(actions.ARQUIVO_CRIAR_SUCCESS({...response.data}));
    }catch(error){
        console.log(error);
        yield put(actions.ARQUIVO_CRIAR_FALURE({...error}));
    }
}

function* EditarArquivo({payload}){
    try{
        if(!payload.id){
            return 
        }
        const token = yield select(state => state.authreducer.token);
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
        const response = yield call(axios.put, `/arquivo/${payload.id}`, payload);
        yield put(actions.ARQUIVO_EDITAR_SUCCESS({...response.data}));
    }catch(error){
        console.log(error);
        yield put(actions.ARQUIVO_EDITAR_FALURE({error}));
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
        const response = yield call(axios.delete, `/arquivo/${payload.id}`, payload);
        yield put(actions.ARQUIVO_DELETAR_SUCCESS({...response.data}));
        yield put(actions.ARQUIVO_BUSCAR_REQUEST());
    }catch(error){
        console.log(error);
        yield put(actions.ARQUIVO_DELETAR_FALURE({error}));
    }
}

export default all([
    takeLatest(types.CHAMADO_REQUEST, Chamado),
    takeLatest(types.CHAMADOS_REQUEST, Chamados),
    takeLatest(types.EDITAR_CHAMADO_REQUEST, EditarChamado),
    takeLatest(types.DELETAR_CHAMADO_REQUEST, DeletarChamado),
    takeLatest(types.STATUS_REQUEST, Status),
    takeLatest(types.CRIAR_STATUS_REQUEST, CriarStatus),
    takeLatest(types.EDITAR_STATUS_REQUEST, EditarStatus),
    takeLatest(types.DELETAR_STATUS_REQUEST, DeletarStatus),
    takeLatest(types.GET_STATUS_REQUEST, GetStatus),
    takeLatest(types.EXEC_PROCEDURE_REQUEST, ExecProcedure),
    takeLatest(types.CATEGORIAS_REQUEST, Categorias),
    takeLatest(types.CRIAR_CATEGORIAS_REQUEST, CriarCategoria),
    takeLatest(types.EDITAR_CATEGORIAS_REQUEST, EditarCategoria),
    takeLatest(types.DELETAR_CATEGORIAS_REQUEST, DeletarCategoria),
    takeLatest(types.SUBCATEGORIAS_REQUEST, SubCategorias),
    takeLatest(types.CRIAR_SUBCATEGORIAS_REQUEST, CriarSubCategoria),
    takeLatest(types.EDITAR_SUBCATEGORIAS_REQUEST, EditarSubCategoria),
    takeLatest(types.DELETAR_SUBCATEGORIAS_REQUEST, DeletarSubCategoria),
    takeLatest(types.ARQUIVO_BUSCAR_REQUEST, Arquivos),
    takeLatest(types.ARQUIVO_CRIAR_REQUEST, CriarArquivos),
    takeLatest(types.ARQUIVO_EDITAR_REQUEST, EditarArquivo),
    takeLatest(types.ARQUIVO_DELETAR_REQUEST, DeletarArquivo),
]);
