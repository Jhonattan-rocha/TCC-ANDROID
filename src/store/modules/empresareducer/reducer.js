import * as type from '../types';

const initialState = {
    isLoggedIn: false,
    empresa: [{result: []}]
}
// caso precise de mais de um reducer, usar a função combineReducer

export default function recuder(state = initialState, action){
    switch (action.type) {
        case type.EMPRESA_SUCCESS: {
            alert('Empresa cadastrada com sucesso')
            return state;
        }
        case type.EMPRESA_FALURE: {
            alert("Erro ao cadastrar a empresa")
            return state
        }
        // -----------------
        case type.EMPRESA_EDITAR_SUCCESS: {
            alert("EMPRESA editada com sucesso")
            return state
        }
        case type.EMPRESA_EDITAR_FALURE: {
            alert("Erro ao editar a EMPRESA")
            return state
        }
        // -----------------
        case type.EMPRESA_BUSCAR_SUCCESS: {
            const newState = {...state}
            newState.empresa = action.payload
            return newState
        }
        case type.EMPRESA_BUSCAR_FALURE: {
            alert("Erro ao buscar as EMPRESAS")
            return state
        }
        case type.EMPRESA_DELETAR_SUCCESS: {
            alert("EMPRESA deletada com sucesso")
            return state
        }
        case type.EMPRESA_DELETAR_FALURE: {
            alert("Erro ao deletar a EMPRESA")
            return state
        }
      // aqui você pode definir suas ações e como o estado deve ser atualizado
      default:
        return state;
    }
};

