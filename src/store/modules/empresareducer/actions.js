import * as types from '../types'

export function EMPRESA_REQUEST(payload){
    return {
        type: types.EMPRESA_REQUEST,  
        payload: payload
    };
}

export function EMPRESA_SUCCESS(payload){
    return {
        type: types.EMPRESA_SUCCESS,  
        payload: payload
    };
}

export function EMPRESA_FALURE(payload){
    return {
        type: types.EMPRESA_FALURE,  
        payload: payload
    };
}

// ---------------------------------


export function EMPRESA_EDITAR_REQUEST(payload){
    return {
        type: types.EMPRESA_EDITAR_REQUEST,
        payload: payload,  
    };
}

export function EMPRESA_EDITAR_SUCCESS(payload){
    return {
        type: types.EMPRESA_EDITAR_SUCCESS,
        payload: payload,  
    };
}

export function EMPRESA_EDITAR_FALURE(payload){
    return {
        type: types.EMPRESA_EDITAR_FALURE,
        payload: payload,  
    };
}

// -------------------------------------------------------------

export function EMPRESA_BUSCAR_REQUEST(payload){
    return {
        type: types.EMPRESA_BUSCAR_REQUEST,
        payload: payload,  
    };
}

export function EMPRESA_BUSCAR_SUCCESS(payload){
    return {
        type: types.EMPRESA_BUSCAR_SUCCESS,
        payload: payload,  
    };
}

export function EMPRESA_BUSCAR_FALURE(payload){
    return {
        type: types.EMPRESA_BUSCAR_FALURE,
        payload: payload,  
    };
}

// ----

export function EMPRESA_DELETAR_REQUEST(payload){
    return {
        type: types.EMPRESA_DELETAR_REQUEST,
        payload: payload,  
    };
}

export function EMPRESA_DELETAR_SUCCESS(payload){
    return {
        type: types.EMPRESA_DELETAR_SUCCESS,
        payload: payload,  
    };
}

export function EMPRESA_DELETAR_FALURE(payload){
    return {
        type: types.EMPRESA_DELETAR_FALURE,
        payload: payload,  
    };
}


