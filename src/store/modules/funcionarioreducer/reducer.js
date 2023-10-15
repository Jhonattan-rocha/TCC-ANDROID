import * as type from '../types';

const initialState = {
  funcionarios: [{result: []}],
  setores: [{result: []}],
  cargos: [{result: []}],
  perfis: [{result: []}],
  comentarios: [{result: []}]
}
// caso precise de mais de um reducer, usar a função combineReducer

export default function recuder(state = initialState, action){
    switch (action.type) {
      case type.FUNCIONARIO_CRIAR_SUCCESS: {
        alert("Funcionario cadastrado com sucesso");
        return state;
      }
      case type.FUNCIONARIO_CRIAR_FALURE: {
        alert("Erro ao cadastrar o Funcionario");
        return state;
      }
      // -----------------
      case type.FUNCIONARIO_EDITAR_SUCCESS: {
        alert("Funcionario editado com sucesso");
        return state;
      }
      case type.FUNCIONARIO_EDITAR_FALURE: {
        alert("Erro ao editar o Funcionario");
        return state;
      }
      // -----------------
      case type.FUNCIONARIO_BUSCAR_SUCCESS: {
        const newState = {...state};
        newState.funcionarios = action.payload;
        return newState;
      }
      case type.FUNCIONARIO_BUSCAR_FALURE: {
        alert("Erro ao buscar os funcionarios");
        return state;
      }
      case type.FUNCIONARIO_DELETAR_SUCCESS: {
        alert("Funcionario deletado com sucesso");
        return state;
      }
      case type.FUNCIONARIO_DELETAR_FALURE: {
        alert("Erro ao deletar o funcionario");
        return state;
      }
      case type.SETORES_SUCCESS: {
        alert("Setores buscados com sucesso");
        const newState = {...state};
        newState.setores = action.payload;
        return newState;
      }
      case type.SETORES_FALURE: {
        alert("Erro ao buscar os setores");
        return state;
      }
      case type.CRIAR_SETORES_SUCCESS: {
        alert("Setor cadastrado com sucesso");
        return state;
      }
      case type.CRIAR_SETORES_FALURE: {
        alert("Erro ao cadastrar o setor");
        return state;
      }
      case type.EDITAR_SETORES_SUCCESS: {
        alert("Setor editado com sucesso");
        return state;
      }
      case type.EDITAR_SETORES_FALURE: {
        alert("Erro ao editar o setor");
        return state;
      }
      case type.DELETAR_SETORES_SUCCESS: {
        alert("Setor deletado com sucesso");
        return state;
      }
      case type.DELETAR_SETORES_FALURE: {
        alert("Erro ao deletar o setor");
        return state;
      }
      // cargos
      case type.CARGOS_SUCCESS: {
        alert("Cargos buscados com sucesso")
        const newState = {...state};
        newState.cargos = action.payload;
        return newState;
      }
      case type.CARGOS_FALURE: {
        alert("Erro ao buscar os cargos");
        return state;
      }
      case type.CRIAR_CARGO_SUCCESS: {
        alert("Cargo cadastrado com sucesso");
        return state;
      }
      case type.CRIAR_CARGO_FALURE: {
        alert("Erro ao cadastrar o cargo");
        return state;
      }
      case type.EDITAR_CARGO_SUCCESS: {
        alert("Cargo editado com sucesso");
        return state;
      }
      case type.EDITAR_CARGO_FALURE: {
        alert("Erro ao editar o cargo");
        return state;
      }
      case type.DELETAR_CARGO_SUCCESS: {
        alert("Cargo deletado com sucesso");
        return state;
      }
      case type.DELETAR_CARGO_FALURE: {
        alert("Erro ao deletar o cargo");
        return state;
      }
      case type.PERFIL_BUSCAR_SUCCESS: {
        alert("Perfis buscados com sucesso");
        const newState = {...state};
        newState.perfis = action.payload;
        return newState;
      }
      case type.PERFIL_BUSCAR_FALURE: {
        alert("Erro ao buscar os perfis")
        return state
      }
      case type.COMENTARIO_BUSCAR_SUCCESS: {
        alert("Comentarios buscados com sucesso")
        const newState = {...state}
        newState.comentarios = action.payload;
        return newState
      }
      
      // aqui você pode definir suas ações e como o estado deve ser atualizado
      default:
        return state;
    }
};

