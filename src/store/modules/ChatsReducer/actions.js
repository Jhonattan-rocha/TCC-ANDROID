import * as types from '../types'

export function GET_CHAT(payload){
    return {
        type: types.GET_CHAT,
        payload: payload,  
    };
}

export function GET_CHAT_SUCCESS(payload){
    return {
        type: types.GET_CHAT_SUCCESS,
        payload: payload,  
    };
}

export function GET_CHAT_FALURE(payload){
    return  {
        type: types.GET_CHAT_FALURE,
        payload: payload,
    };
}


export function ADD_MESSAGE_CHAT_REQUEST(payload){
    return {
        type: types.ADD_MESSAGE_CHAT_REQUEST,
        payload: payload,  
    };
}

export function ADD_MESSAGE_CHAT_SUCCESS(payload){
    return {
        type: types.ADD_MESSAGE_CHAT_SUCCESS,
        payload: payload,  
    };
}

export function ADD_MESSAGE_CHAT_FALURE(payload){
    return  {
        type: types.ADD_MESSAGE_CHAT_FALURE,
        payload: payload,
    };
}


export function UPDATE_MESSAGE_CHAT_REQUEST(payload){
    return {
        type: types.UPDATE_MESSAGE_CHAT_REQUEST,
        payload: payload,  
    };
}

export function UPDATE_MESSAGE_CHAT_SUCCESS(payload){
    return {
        type: types.UPDATE_MESSAGE_CHAT_SUCCESS,
        payload: payload,  
    };
}

export function UPDATE_MESSAGE_CHAT_FALURE(payload){
    return  {
        type: types.UPDATE_MESSAGE_CHAT_FALURE,
        payload: payload,
    };
}



export function DELETE_MESSAGE_CHAT_REQUEST(payload){
    return {
        type: types.DELETE_MESSAGE_CHAT_REQUEST,
        payload: payload,  
    };
}

export function DELETE_MESSAGE_CHAT_SUCCESS(payload){
    return {
        type: types.DELETE_MESSAGE_CHAT_SUCCESS,
        payload: payload,  
    };
}

export function DELETE_MESSAGE_CHAT_FALURE(payload){
    return  {
        type: types.DELETE_MESSAGE_CHAT_FALURE,
        payload: payload,
    };
}


export function RESET_CHAT(payload){
    return  {
        type: types.RESET_CHAT,
        payload: payload,
    };
}



export function CHATS_CRIAR_REQUEST(payload){
    return {
        type: types.CHATS_CRIAR_REQUEST,
        payload: payload,  
    };
}

export function CHATS_CRIAR_SUCCESS(payload){
    return {
        type: types.CHATS_CRIAR_SUCCESS,
        payload: payload,  
    };
}

export function CHATS_CRIAR_FALURE(payload){
    return {
        type: types.CHATS_CRIAR_FALURE,
        payload: payload,  
    };
}

export function CHATS_EDITAR_REQUEST(payload){
    return {
        type: types.CHATS_EDITAR_REQUEST,
        payload: payload,  
    };
}

export function CHATS_EDITAR_SUCCESS(payload){
    return {
        type: types.CHATS_EDITAR_SUCCESS,
        payload: payload,  
    };
}

export function CHATS_EDITAR_FALURE(payload){
    return {
        type: types.CHATS_CRIAR_FALURE,
        payload: payload,  
    };
}

export function CHATS_DELETAR_REQUEST(payload){
    return {
        type: types.CHATS_DELETAR_REQUEST,
        payload: payload,  
    };
}

export function CHATS_DELETAR_SUCCESS(payload){
    return {
        type: types.CHATS_DELETAR_SUCCESS,
        payload: payload,  
    };
}

export function CHATS_DELETAR_FALURE(payload){
    return {
        type: types.CHATS_DELETAR_FALURE,
        payload: payload,  
    };
}

export function CHATS_BUSCAR_REQUEST(payload){
    return {
        type: types.CHATS_BUSCAR_REQUEST,
        payload: payload,  
    };
}

export function CHATS_BUSCAR_SUCCESS(payload){
    return {
        type: types.CHATS_BUSCAR_SUCCESS,
        payload: payload,  
    };
}

export function CHATS_BUSCAR_FALURE(payload){
    return {
        type: types.CHATS_BUSCAR_FALURE,
        payload: payload,  
    };
}



// -----



export function CHATS_CRIAR_COM_FOTO_REQUEST(payload){
    return {
        type: types.CHATS_CRIAR_COM_FOTO_REQUEST,
        payload: payload,  
    };
}

export function CHATS_CRIAR_COM_FOTO_SUCCESS(payload){
    return {
        type: types.CHATS_CRIAR_COM_FOTO_SUCCESS,
        payload: payload,  
    };
}

export function CHATS_CRIAR_COM_FOTO_FALURE(payload){
    return {
        type: types.CHATS_CRIAR_COM_FOTO_FALURE,
        payload: payload,  
    };
}

export function CHATS_EDITAR_COM_FOTO_REQUEST(payload){
    return {
        type: types.CHATS_EDITAR_COM_FOTO_REQUEST,
        payload: payload,  
    };
}

export function CHATS_EDITAR_COM_FOTO_SUCCESS(payload){
    return {
        type: types.CHATS_EDITAR_COM_FOTO_SUCCESS,
        payload: payload,  
    };
}

export function CHATS_EDITAR_COM_FOTO_FALURE(payload){
    return {
        type: types.CHATS_EDITAR_COM_FOTO_FALURE,
        payload: payload,  
    };
}

// ----


export function CHATS_ARQUIVO_DELETAR_REQUEST(payload){
    return {
        type: types.CHATS_ARQUIVO_DELETAR_REQUEST,
        payload: payload,  
    };
}

export function CHATS_ARQUIVO_DELETAR_SUCCESS(payload){
    return {
        type: types.CHATS_ARQUIVO_DELETAR_SUCCESS,
        payload: payload,  
    };
}

export function CHATS_ARQUIVO_DELETAR_FALURE(payload){
    return {
        type: types.CHATS_ARQUIVO_DELETAR_FALURE,
        payload: payload,  
    };
}



export function USER_REQUEST(payload){
    return {
        type: types.USER_REQUEST,
        payload: payload,  
    };
}

export function USER_FALURE(payload){
    return {
        type: types.USER_FALURE,
        payload: payload,  
    };
}

export function USER_SUCCESS(payload){
    return {
        type: types.USER_SUCCESS,
        payload: payload,  
    };
}

export function CRIAR_USER_FALURE(payload){
    return {
        type: types.CRIAR_USER_FALURE,
        payload: payload,  
    };
}

export function CRIAR_USER_SUCCESS(payload){
    return {
        type: types.CRIAR_USER_SUCCESS,
        payload: payload,  
    };
}


export function CRIAR_USER_REQUEST(payload){
    return {
        type: types.CRIAR_USER_REQUEST,
        payload: payload,  
    };
}

export function EDITAR_USER_FALURE(payload){
    return {
        type: types.EDITAR_USER_FALURE,
        payload: payload,  
    };
}

export function EDITAR_USER_SUCCESS(payload){
    return {
        type: types.EDITAR_USER_SUCCESS,
        payload: payload,  
    };
}

export function EDITAR_USER_REQUEST(payload){
    return {
        type: types.EDITAR_USER_REQUEST,
        payload: payload,  
    };
}

export function DELETAR_USER_FALURE(payload){
    return {
        type: types.DELETAR_USER_FALURE,
        payload: payload,  
    };
}

export function DELETAR_USER_SUCCESS(payload){
    return {
        type: types.DELETAR_USER_SUCCESS,
        payload: payload,  
    };
}

export function DELETAR_USER_REQUEST(payload){
    return {
        type: types.DELETAR_USER_REQUEST,
        payload: payload,  
    };
}



