import React, { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Vibration, Text, View, TouchableOpacity, StyleSheet, NativeModules } from 'react-native';
import { MessageChat, TitleMessage, ContainerMessageText, InputChat } from './styled';
import * as actions from '../store/modules/ChatsReducer/actions';
import IconIonic from 'react-native-vector-icons/Ionicons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconEnt from 'react-native-vector-icons/Entypo';

const Message = ({ user, idVal, setShowEdit, setSelectMessage, idChat, ws }) => {
  const chat = useSelector(state => {
      try{
          let mes = state.chatreducer.chat.find(ch => ch['idChat'] === idChat)
          return mes.mensagens
      }catch(err){
          return state.chatreducer.chat
      }
  }) || [];
  const mes = chat.find(me => me['id'] === idVal);
  const [showButtons, setShowButtons] = useState(false);
  const dispatch = useDispatch()
  const [maxLines, setMaxLines] = React.useState(3); // Número máximo de linhas antes de expandir

  const toggleExpand = () => {
    setMaxLines(maxLines + 6);
  };
  const handlePressIn = (event) => {
    Vibration.vibrate(50); // Vibração ao pressionar o elemento
    // const { pageX, pageY } = event.nativeEvent;
    // setButtonPosition({ x: pageX, y: pageY });
  };

  const handlePressOut = () => {
    setShowButtons(!showButtons); // Exibir o container de botões ao soltar o elemento
  };

  const handleButtonPress = async () => {
    try {
      const { FileToolsModule } = NativeModules
      const result = await FileToolsModule.shareMessage(mes.texto)
      console.log(result);
    } catch (error) {
      console.log('Erro ao compartilhar o texto:', error);
    }
  };

  const handleDeleteMessage = () => {
    ws.emit("deletemes", mes);
    dispatch(actions.DELETE_MESSAGE_CHAT_SUCCESS({idChat: idChat, message: mes}));
  }

  if(!mes){
    return null
  }

  return (
    <View>
        <MessageChat  myMessage={user.id === mes.idUser}  idVal={idVal}>
          <TitleMessage myMessage={user.id === mes.idUser}>{String(mes.username).split(" ")[0]}</TitleMessage>
          <TouchableOpacity
            onLongPress={() => {
              handlePressIn();
              handlePressOut();
            }}
            onPress={() => {
              if(showButtons){
                setShowButtons(false)
              }
            }}
            style={{width: "100%", marginBottom: 10}}
          >
            <ContainerMessageText myMessage={user.id === mes.idUser}>
              <View style={style.containerMessages}>
                <Text style={{color: user.id === mes.idUser ? 'black': 'white'}} numberOfLines={maxLines}>{mes.texto}</Text>
                {String(mes.texto).length > 40 && (
                  <Text style={{color: user.id === mes.idUser ? "#000":"#fff"}} onPress={toggleExpand}>
                    ... Ver mais
                  </Text>
                )}
                <View style={style.containerStatus}>
                  {mes['salvo'] ? 
                  <>
                    <IconAnt name="swap" size={20} color={ user.id === mes.idUser ? "#000":"#fff"}></IconAnt>
                    <Text style={{color: user.id === mes.idUser ? "#000":"#fff"}}>{mes['data'] ? new Date(mes['data']).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }): ""}</Text>
                  </>                  
                  :
                  <>
                    <IconAnt name="swapright" size={20} color="#000"></IconAnt>
                    <Text style={{color: user.id === mes.idUser ? "#000":"#fff"}}>{mes['data'] ? new Date(mes['data']).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }): ""}</Text>
                  </>} 
                </View>
              </View>
            </ContainerMessageText>
          </TouchableOpacity>
          </MessageChat>
          {showButtons && (
            <View
              style={[style.popupButtuns]} 
            >                 
              <TouchableOpacity onPress={handleButtonPress} style={{backgroundColor: 'white', borderRadius: 30, padding: 10}}>
                <Text style={{color: 'black'}}><IconIonic name="share-social-sharp" size={20} style={{color: 'black'}}></IconIonic></Text>
              </TouchableOpacity>
              {user.id === mes.idUser ? 
              <TouchableOpacity onPress={() => {
                  setSelectMessage(mes['id'])
                  setShowEdit(true)
                }} style={{backgroundColor: 'white', borderRadius: 30, padding: 10}}>
                <Text style={{color: 'black'}}><IconIonic name="pencil" size={20} style={{color: 'black'}}></IconIonic></Text>
              </TouchableOpacity>: null}
              {/* Adicione outros botões conforme necessário */}
              <TouchableOpacity onPress={handleDeleteMessage} style={{backgroundColor: 'white', borderRadius: 30, padding: 10}}>
                <Text style={{color: 'black'}}><IconEnt name="trash" size={20} style={{color: 'black'}}></IconEnt></Text>
              </TouchableOpacity>
            </View>
          )}
    </View>
  );
};

const style = StyleSheet.create({
  popupButtuns: {
    position: 'absolute',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    left: "50%",
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'row'
  },
  containerMessages: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 200,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  containerStatus: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 60,
    maxHeight: 30
  }
});


export default memo(Message);
