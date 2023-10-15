import * as types from '../types'

export function ChamadoRequest(payload){
    return {
        type: types.CHAMADO_REQUEST,
        payload: payload,  
    };
}

export function ChamadoSUCCESS(payload){
    return {
        type: types.CHAMADO_SUCCESS,
        payload: payload,  
    };
}

export function ChamadoFALURE(payload){
    return {
        type: types.CHAMADO_FALURE,
        payload: payload,  
    };
}


// -------------------

export function EDITAR_CHAMADOREQUEST(payload){
    return {
        type: types.EDITAR_CHAMADO_REQUEST,
        payload: payload,  
    };
}

export function EDITAR_CHAMADOSUCCESS(payload){
    return {
        type: types.EDITAR_CHAMADO_SUCCESS,
        payload: payload,  
    };
}

export function EDITAR_CHAMADOFALURE(payload){
    return {
        type: types.EDITAR_CHAMADO_FALURE,
        payload: payload,  
    };
}

// -------------------------------------------------


export function CHAMADOSREQUEST(payload){
    return {
        type: types.CHAMADOS_REQUEST,
        payload: payload,  
    };
}

export function CHAMADOSSUCCESS(payload){
    return {
        type: types.CHAMADOS_SUCCESS,
        payload: payload,  
    };
}

export function CHAMADOSFALURE(payload){
    return {
        type: types.CHAMADOS_FALURE,
        payload: payload,  
    };
}

// -----------------------------------

export function DELETAR_CHAMADO_REQUEST(payload){
    return {
        type: types.DELETAR_CHAMADO_REQUEST,
        payload: payload,  
    };
}

export function DELETAR_CHAMADO_SUCCESS(payload){
    return {
        type: types.DELETAR_CHAMADO_SUCCESS,
        payload: payload,  
    };
}

export function DELETAR_CHAMADO_FALURE(payload){
    return {
        type: types.DELETAR_CHAMADO_FALURE,
        payload: payload,  
    };
}


// ----------------------------------------------------

export function STATUS_REQUEST(payload){
    return {
        type: types.STATUS_REQUEST,
        payload: payload,  
    };
}

export function STATUS_FALURE(payload){
    return {
        type: types.STATUS_FALURE,
        payload: payload,  
    };
}

export function STAUTS_SUCCESS(payload){
    return {
        type: types.STAUTS_SUCCESS,
        payload: payload,  
    };
}

export function CRIAR_STATUS_FALURE(payload){
    return {
        type: types.CRIAR_STATUS_FALURE,
        payload: payload,  
    };
}

export function CRIAR_STAUTS_SUCCESS(payload){
    return {
        type: types.CRIAR_STAUTS_SUCCESS,
        payload: payload,  
    };
}


export function CRIAR_STATUS_REQUEST(payload){
    return {
        type: types.CRIAR_STATUS_REQUEST,
        payload: payload,  
    };
}

export function EDITAR_STATUS_FALURE(payload){
    return {
        type: types.EDITAR_STATUS_FALURE,
        payload: payload,  
    };
}

export function EDITAR_STAUTS_SUCCESS(payload){
    return {
        type: types.EDITAR_STAUTS_SUCCESS,
        payload: payload,  
    };
}

export function EDITAR_STATUS_REQUEST(payload){
    return {
        type: types.EDITAR_STATUS_REQUEST,
        payload: payload,  
    };
}

export function DELETAR_STATUS_FALURE(payload){
    return {
        type: types.DELETAR_STATUS_FALURE,
        payload: payload,  
    };
}

export function DELETAR_STAUTS_SUCCESS(payload){
    return {
        type: types.DELETAR_STAUTS_SUCCESS,
        payload: payload,  
    };
}

export function DELETAR_STATUS_REQUEST(payload){
    return {
        type: types.DELETAR_STATUS_REQUEST,
        payload: payload,  
    };
}


export function GET_STATUS_REQUEST(payload){
    return {
        type: types.GET_STATUS_REQUEST,
        payload: payload,  
    };
}

export function GET_STATUS_FALURE(payload){
    return {
        type: types.GET_STATUS_FALURE,
        payload: payload,  
    };
}

export function GET_STATUS_SUCCESS(payload){
    return {
        type: types.GET_STATUS_SUCCESS,
        payload: payload,  
    };
}

export function EXEC_PROCEDURE_REQUEST(payload){
    return {
        type: types.EXEC_PROCEDURE_REQUEST,
        payload: payload,  
    };
}

export function EXEC_PROCEDURE_FALURE(payload){
    return {
        type: types.EXEC_PROCEDURE_FALURE,
        payload: payload,  
    };
}

export function EXEC_PROCEDURE_SUCCESS(payload){
    return {
        type: types.EXEC_PROCEDURE_SUCCESS,
        payload: payload,  
    };
}

export function ISLOADING(payload){
    return {
        type: types.ISLOADING,
        payload: payload,  
    };
}


export function CATEGORIAS_REQUEST(payload){
    return {
        type: types.CATEGORIAS_REQUEST,
        payload: payload,  
    };
}

export function CATEGORIAS_FALURE(payload){
    return {
        type: types.CATEGORIAS_FALURE,
        payload: payload,  
    };
}

export function CATEGORIAS_SUCCESS(payload){
    return {
        type: types.CATEGORIAS_SUCCESS,
        payload: payload,  
    };
}

export function CRIAR_CATEGORIAS_REQUEST(payload){
    return {
        type: types.CRIAR_CATEGORIAS_REQUEST,
        payload: payload,  
    };
}

export function CRIAR_CATEGORIAS_FALURE(payload){
    return {
        type: types.CRIAR_CATEGORIAS_FALURE,
        payload: payload,  
    };
}

export function CRIAR_CATEGORIAS_SUCCESS(payload){
    return {
        type: types.CRIAR_CATEGORIAS_SUCCESS,
        payload: payload,  
    };
}


export function EDITAR_CATEGORIAS_REQUEST(payload){
    return {
        type: types.EDITAR_CATEGORIAS_REQUEST,
        payload: payload,  
    };
}

export function EDITAR_CATEGORIAS_FALURE(payload){
    return {
        type: types.EDITAR_CATEGORIAS_FALURE,
        payload: payload,  
    };
}

export function EDITAR_CATEGORIAS_SUCCESS(payload){
    return {
        type: types.EDITAR_CATEGORIAS_SUCCESS,
        payload: payload,  
    };
}



export function DELETAR_CATEGORIAS_REQUEST(payload){
    return {
        type: types.DELETAR_CATEGORIAS_REQUEST,
        payload: payload,  
    };
}

export function DELETAR_CATEGORIAS_FALURE(payload){
    return {
        type: types.DELETAR_CATEGORIAS_FALURE,
        payload: payload,  
    };
}

export function DELETAR_CATEGORIAS_SUCCESS(payload){
    return {
        type: types.DELETAR_CATEGORIAS_SUCCESS,
        payload: payload,  
    };
}


// -----------------


export function SUBCATEGORIAS_REQUEST(payload){
    return {
        type: types.SUBCATEGORIAS_REQUEST,
        payload: payload,  
    };
}

export function SUBCATEGORIAS_FALURE(payload){
    return {
        type: types.SUBCATEGORIAS_FALURE,
        payload: payload,  
    };
}

export function SUBCATEGORIAS_SUCCESS(payload){
    return {
        type: types.SUBCATEGORIAS_SUCCESS,
        payload: payload,  
    };
}

export function CRIAR_SUBCATEGORIAS_REQUEST(payload){
    return {
        type: types.CRIAR_SUBCATEGORIAS_REQUEST,
        payload: payload,  
    };
}

export function CRIAR_SUBCATEGORIAS_FALURE(payload){
    return {
        type: types.CRIAR_SUBCATEGORIAS_FALURE,
        payload: payload,  
    };
}

export function CRIAR_SUBCATEGORIAS_SUCCESS(payload){
    return {
        type: types.CRIAR_SUBCATEGORIAS_SUCCESS,
        payload: payload,  
    };
}


export function EDITAR_SUBCATEGORIAS_REQUEST(payload){
    return {
        type: types.EDITAR_SUBCATEGORIAS_REQUEST,
        payload: payload,  
    };
}

export function EDITAR_SUBCATEGORIAS_FALURE(payload){
    return {
        type: types.EDITAR_SUBCATEGORIAS_FALURE,
        payload: payload,  
    };
}

export function EDITAR_SUBCATEGORIAS_SUCCESS(payload){
    return {
        type: types.EDITAR_SUBCATEGORIAS_SUCCESS,
        payload: payload,  
    };
}



export function DELETAR_SUBCATEGORIAS_REQUEST(payload){
    return {
        type: types.DELETAR_SUBCATEGORIAS_REQUEST,
        payload: payload,  
    };
}

export function DELETAR_SUBCATEGORIAS_FALURE(payload){
    return {
        type: types.DELETAR_SUBCATEGORIAS_FALURE,
        payload: payload,  
    };
}

export function DELETAR_SUBCATEGORIAS_SUCCESS(payload){
    return {
        type: types.DELETAR_SUBCATEGORIAS_SUCCESS,
        payload: payload,  
    };
}


export function ARQUIVO_CRIAR_REQUEST(payload){
    return {
        type: types.ARQUIVO_CRIAR_REQUEST,
        payload: payload,  
    };
}

export function ARQUIVO_CRIAR_SUCCESS(payload){
    return {
        type: types.ARQUIVO_CRIAR_SUCCESS,
        payload: payload,  
    };
}

export function ARQUIVO_CRIAR_FALURE(payload){
    return {
        type: types.ARQUIVO_CRIAR_FALURE,
        payload: payload,  
    };
}

export function ARQUIVO_EDITAR_REQUEST(payload){
    return {
        type: types.ARQUIVO_EDITAR_REQUEST,
        payload: payload,  
    };
}

export function ARQUIVO_EDITAR_SUCCESS(payload){
    return {
        type: types.ARQUIVO_EDITAR_SUCCESS,
        payload: payload,  
    };
}

export function ARQUIVO_EDITAR_FALURE(payload){
    return {
        type: types.ARQUIVO_CRIAR_FALURE,
        payload: payload,  
    };
}

export function ARQUIVO_DELETAR_REQUEST(payload){
    return {
        type: types.ARQUIVO_DELETAR_REQUEST,
        payload: payload,  
    };
}

export function ARQUIVO_DELETAR_SUCCESS(payload){
    return {
        type: types.ARQUIVO_DELETAR_SUCCESS,
        payload: payload,  
    };
}

export function ARQUIVO_DELETAR_FALURE(payload){
    return {
        type: types.ARQUIVO_DELETAR_FALURE,
        payload: payload,  
    };
}

export function ARQUIVO_BUSCAR_REQUEST(payload){
    return {
        type: types.ARQUIVO_BUSCAR_REQUEST,
        payload: payload,  
    };
}

export function ARQUIVO_BUSCAR_SUCCESS(payload){
    return {
        type: types.ARQUIVO_BUSCAR_SUCCESS,
        payload: payload,  
    };
}

export function ARQUIVO_BUSCAR_FALURE(payload){
    return {
        type: types.ARQUIVO_BUSCAR_FALURE,
        payload: payload,  
    };
}

export function ARQUIVO_DOWNLOAD_REQUEST(payload){
    return {
        type: types.ARQUIVO_DOWNLOAD_REQUEST,
        payload: payload,  
    };
}

export function ARQUIVO_DOWNLOAD_SUCCESS(payload){
    return {
        type: types.ARQUIVO_DOWNLOAD_SUCCESS,
        payload: payload,  
    };
}

export function ARQUIVO_DOWNLOAD_FALURE(payload){
    return {
        type: types.ARQUIVO_DOWNLOAD_FALURE,
        payload: payload,  
    };
}
