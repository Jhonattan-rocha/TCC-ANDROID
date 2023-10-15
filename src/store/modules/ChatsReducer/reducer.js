import * as type from '../types';

const initialState = {
    chat: []
}
// caso precise de mais de um reducer, usar a função combineReducer

export default function recuder(state = initialState, action){
    switch (action.type) {
        case type.GET_CHAT_SUCCESS: {
            try{
                const chatToAdd = action.payload;
            
                const chatExists = state.chat.some(chat => chat.idChat === chatToAdd.idChat);
                
                if (!chatExists) {
                  return {
                    ...state,
                    chat: [...state.chat, chatToAdd]
                  };
                }
    
                return state
            }catch(err){
                return state
            }
        }

        case type.GET_CHAT_FALURE: {
            try{
                const chatToAdd = action.payload;
            
                const chatExists = state.chat.some(chat => chat.idChat === chatToAdd.idChat);
                
                if (!chatExists) {
                  return {
                    ...state,
                    chat: [...state.chat, chatToAdd]
                  };
                }
    
                return state
            }catch(err){
                return state
            }
        }

        case type.ADD_MESSAGE_CHAT_SUCCESS: {
            const { idChat, message } = action.payload;
            // Verificar se o chat já existe no estado
            const chatIndex = state.chat.findIndex((c) => c.idChat === idChat);
            
            if (chatIndex !== -1) {
              const existingChat = {...state.chat[chatIndex]};
              const messageExists = existingChat.mensagens.some((mes) => mes.id === message.id);
          
              if (!messageExists) {
                // Criar uma cópia profunda do chat existente e adicionar a nova mensagem
                const updatedChat = Object.assign({}, existingChat, {
                  mensagens: [...existingChat.mensagens, message],
                });
          
                return {
                  ...state,
                  chat: [
                    ...state.chat.slice(0, chatIndex), // Copiar todos os chats anteriores
                    updatedChat, // Adicionar o chat atualizado
                    ...state.chat.slice(chatIndex + 1), // Copiar todos os chats posteriores
                  ],
                };
              }
            }
          
            return state; // Retorna o estado original caso não faça nenhuma alteração
          }

        case type.ADD_MESSAGE_CHAT_FALURE: {
            alert("Falha ao salvar a mensagem")
            return state
        }

        case type.UPDATE_MESSAGE_CHAT_SUCCESS: {
            const { idChat, message } = action.payload;

            return {
                ...state,
                chat: state.chat.map(chat =>
                    chat.idChat === idChat
                        ? {
                              ...chat,
                              mensagens: chat.mensagens.map(mes =>
                                  mes.id === message.id ? { ...message } : mes
                              ),
                          }
                        : chat
                )
            };
        }

        case type.UPDATE_MESSAGE_CHAT_FALURE: {
            alert("Falha ao editar a mensagem")
            return state
        }

        case type.DELETE_MESSAGE_CHAT_SUCCESS: {
          const { idChat, message } = action.payload;

          return {
              ...state,
              chat: state.chat.map(chat =>
                  chat.idChat === idChat
                      ? {
                            ...chat,
                            mensagens: chat.mensagens.filter(mes =>
                                mes.id !== message.id
                            ),
                        }
                      : chat
              )
          };
        }

        case type.DELETE_MESSAGE_CHAT_FALURE: {
            alert("Falha ao deletar a mensaegem")
            return state
        }

        case type.RESET_CHAT: {
            const { id } = action.payload;

            return {
                ...state,
                chat: state.chat.filter(chat => chat['idChat'] !== id)
            };
        }

      // aqui você pode definir suas ações e como o estado deve ser atualizado
      default:
        return state;
    }
};

