import React, { useState, memo, useEffect } from 'react';
import { Button, Text, Vibration, View, TouchableOpacity, StyleSheet, Image, ActivityIndicator, NativeModules } from 'react-native';
import { MessageChat, TitleMessage, ContainerMessage } from './styled'
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../store/modules/ChatsReducer/actions';
import IconIonic from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconEnt from 'react-native-vector-icons/Entypo';
import { azulclaro, azulescuro } from '../config/colors';
import { baseURL, SocketPort } from '../services/config';
import Notificacao from './Notificacoes';

const FileMessage = ({ user, downloadFile, idVal, idChat, setShowEdit, setSelectMessage, ws }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [fileLoad, setFileLoad] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const serverUrl = `http://${baseURL}:${SocketPort}/download/`
  const dispatch = useDispatch();

  const chat = useSelector(state => {
    try{
        let mes = state.chatreducer.chat.find(ch => ch['idChat'] === idChat)
        return mes.mensagens
    }catch(err){
        return state.chatreducer.chat
    }
  }) || [];
  const data = chat.find(me => me['id'] === idVal) ?? {};
  const [url, setUrl] = useState("file://" + RNFS.ExternalDirectoryPath + "/" + data['original_name'] ?? "")
  const [maxLines, setMaxLines] = React.useState(3); // Número máximo de linhas antes de expandir

  const toggleExpand = () => {
    setMaxLines(maxLines + 6);
  };
  const handlePressIn = (event) => {
    if(!fileLoad){
      const { FileToolsModule } = NativeModules;
      FileToolsModule.downloadFile(serverUrl + data['file_name'], RNFS.ExternalDirectoryPath + "/" + data['original_name'], null, null, "GET")
      .then(response => console.log(response))
      .catch(err => console.log(err));
    }else{
      setFileLoad(true)
    }
    Vibration.vibrate(50); // Vibração ao pressionar o elemento
    // const { pageX, pageY } = event.nativeEvent;
    // setButtonPosition({ x: pageX, y: pageY });
  };

  const handlePressOut = () => {
    console.log(showButtons)
    setShowButtons(!showButtons); // Exibir o container de botões ao soltar o elemento
  };
  
  const handleButtonPress = async () => {
    try {
      const { FileToolsModule } = NativeModules
      await FileToolsModule.shareFiles([RNFS.ExternalDirectoryPath + "/" + data['original_name']], [data['mimetype']], data["texto"])
    } catch (error) {
      console.log('Erro ao compartilhar o texto:', error);
    }
  };

  const handleRetry = () => {
    setFileLoad(false);
  }

  const handleFileLoad = () => {
    setFileLoad(true);
  };

  const handleFileError = (err) => {
    setErrorOccurred(true);
    setFileLoad(false);
  };

  const openFile = async (filePath, fileType) => {
    try {
      const { FileToolsModule } = NativeModules
      FileToolsModule.openFile(filePath.replace("file://", ""), fileType)
      .then(response => {
        console.log(response)
      })
      .catch(err => console.log(err));
    } catch (error) {
      console.log('Error opening file:', error);
    }
  };

  const refresh_file = () => {
    let inter = setInterval(() => {
        RNFS.exists(url)
        .then(response => {
          if(!response){
            const { FileToolsModule } = NativeModules;
            FileToolsModule.downloadFile(serverUrl + data['file_name'], RNFS.ExternalDirectoryPath + "/" + data['original_name'], null, "", "GET")
            .then(response => (
              <Notificacao title="Download Completo" body={`O arquivo ${data['file_name']} foi baixado com sucesso`} channelId={data['id']} name="Download" pressActionId={() => {}}></Notificacao>
            ))
            .catch(err => console.log(err));
          }else{
            setFileLoad(true);
            clearInterval(inter);
          }
        })
        .catch(err => console.log(err));
    }, 2000)

    return inter
  }

  useEffect(() => {
    let inter = refresh_file()
    return () => {
      clearInterval(inter)
    }
  }, []);

  if(!data){
    return null
  }

  return (
    <View>
        <MessageChat myMessage={user.id === data.idUser} idVal={idVal}>
          <TitleMessage myMessage={user.id === data.idUser}>{String(data.username).split(" ")[0]}</TitleMessage>
            <TouchableOpacity
              onPress={() => {
                openFile(url, data['mimetype']);
                if(showButtons){
                  setShowButtons(false)
                }
              }}
              onLongPress={() => {
                handlePressIn();
                handlePressOut();
              }}>
              <ContainerMessage myMessage={user.id === data.idUser}>
                  { String(data['mimetype']).match(/image\//g) ? 
                  <>
                  {fileLoad ?  
                    <Image 
                    source={{uri: url}} 
                    style={{width: 220, height: 200}} 
                    onLoad={handleFileLoad}
                    onError={handleFileError}></Image> : <ActivityIndicator color={ user.id === data.idUser ? "#000":"#fff"} size={30} onPress={() => handleRetry()}></ActivityIndicator>}
                  </> : 
                  <>
                    <View style={style.file}>
                      <Text style={{color: "#fff"}}>{String(data['original_name']).slice(0, 15) + "..."}</Text>
                      <View style={style.downloadBubble}>
                        <IconAnt name="download" size={20} color={"#fff"} onPress={() => {
                          const { FileToolsModule } = NativeModules;
                          FileToolsModule.downloadFile(serverUrl + data['file_name'], RNFS.ExternalDirectoryPath + "/" + data['original_name'], null, "", "GET")
                          .then(response => console.log(response))
                          .catch(err => console.log(err));
                        }}></IconAnt> 
                      </View>
                    </View>
                  </> }
                  <Text style={{color: user.id === data.idUser ? 'black': 'white'}} numberOfLines={maxLines}>{data.texto}</Text>
                    {String(data.texto).length > 40 && (
                      <Text style={{color: user.id === data.idUser ? "#000":"#fff"}} onPress={toggleExpand}>
                        ... Ver mais
                      </Text>
                    )}
                  {data['salvo'] ? <IconAnt name="swap" size={20} color={ user.id === data.idUser ? "#000":"#fff"}></IconAnt>:<IconAnt name="swapright" size={20} color="#000"></IconAnt>} 
              </ContainerMessage>
            </TouchableOpacity>

        </MessageChat>
          {showButtons && (
            <View
              style={[style.popupButtuns]}
            >
              <TouchableOpacity onPress={handleButtonPress} style={{backgroundColor: 'white', borderRadius: 30, padding: 10}}>
                <Text style={{color: 'black'}}><IconIonic name="share-social-sharp" size={20} style={{color: 'black'}}></IconIonic></Text>
              </TouchableOpacity>
              {user.id === data.idUser ? <TouchableOpacity onPress={() => {
                  setSelectMessage(data['id'])
                  setShowEdit(true)
                }} style={{backgroundColor: 'white', borderRadius: 30, padding: 10}}>
                <Text style={{color: 'black'}}><IconIonic name="pencil" size={20} style={{color: 'black'}}></IconIonic></Text>
              </TouchableOpacity>:  null}
              <TouchableOpacity onPress={() => {
                ws.emit("deletemes", data);
                dispatch(actions.DELETE_MESSAGE_CHAT_SUCCESS({idChat: idChat, message: data}));
              }} style={{backgroundColor: 'white', borderRadius: 30, padding: 10}}>
                <Text style={{color: 'black'}}><IconEnt name="trash" size={20} style={{color: 'black'}}></IconEnt></Text>
              </TouchableOpacity>
              {/* Adicione outros botões conforme necessário */}
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
  file: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: azulescuro,
    borderRadius: 10,
    padding: 10
  },
  downloadBubble: {
    margin: 5,
    borderColor: 'white',
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 10,
    backgroundColor: azulclaro
  }
});



export default memo(FileMessage);
