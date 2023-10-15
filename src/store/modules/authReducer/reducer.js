import * as type from '../types';

const initialState = {
    isLoggedIn: false,
    token: false,
    user: {},
    isLoading: false
}
// caso precise de mais de um reducer, usar a função combineReducer

export default function recuder(state = initialState, action){
    switch (action.type) {
        case type.LOGIN_SUCCESS: {
            const newState = {...state}
            newState.token = action.payload.token
            newState.user = action.payload.user
            newState.isLoggedIn = true
            return newState;
        }

        case type.LOGIN_FALURE: {
            alert(`Email ou senha inválidos ${action.payload}`)
            const newState = initialState
            return newState
        }

        case type.LOGOUT: {
            const newState = initialState
            alert("Loguot feito com sucesso")
            return newState;
        }

      // aqui você pode definir suas ações e como o estado deve ser atualizado
      default:
        return state;
    }
};

