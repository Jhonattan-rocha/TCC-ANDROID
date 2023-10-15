import React, { useState, useEffect, memo } from 'react';
import { Vibration, View, TouchableOpacity, StyleSheet, Text, NativeModules } from 'react-native';
import { MessageChat, TitleMessage, ContainerAudio } from './styled'
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../store/modules/ChatsReducer/actions'
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import IconsEnt from 'react-native-vector-icons/Entypo';
import RNFS from 'react-native-fs';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconIonic from 'react-native-vector-icons/Ionicons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { baseURL, SocketPort } from '../services/config';

const AudioMessage = ({ user, downloadFile, idVal, idChat, ws }) => {
    const [player, setPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const serverURL = `http://${baseURL}:${SocketPort}/download/`
    const dispatch = useDispatch();

    const chat = useSelector(state => {
      try{
          let mes = state.chatreducer.chat.find(ch => ch['idChat'] === idChat)
          return mes.mensagens
      }catch(err){
          return state.chatreducer.chat
      }
    }) || [];
    const data = chat.find(me => me['id'] === idVal)

    const [showButtons, setShowButtons] = useState(false);
  
    useEffect(() => {
      if(data){
        RNFS.exists(RNFS.ExternalDirectoryPath + "/" + data['original_name'])
        .then(response => {
          if(response){
            try {
              const sound = new Sound(RNFS.ExternalDirectoryPath + "/" + data['original_name'], '', (error) => {
                if (error) {
                  console.log('Erro ao carregar o arquivo de áudio', error);
                } else {
                  sound.setCurrentTime(currentTime)
                  setDuration(sound.getDuration())
                  setPlayer(sound);
                  setDuration(sound.getDuration());
                }
              });
            } catch (error) {
              console.log('Erro ao iniciar a reprodução', error);
            }
          }else{
            const { FileToolsModule } = NativeModules;
            FileToolsModule.downloadFile(serverURL + data['file_name'], RNFS.ExternalDirectoryPath + "/" + data['original_name'], null, "", "GET")
            .then(response => console.log(response))
            .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
      }
    }, [data])

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
        // const result = await Share.open({
        //   showAppsToView: true,
        //   url: "file://" + RNFS.ExternalDirectoryPath + "/" + data['original_name'],
        //   failOnCancel: false,
        //   message: data.texto,
        //   filename: data['original_name'],
        //   type: data['mimetype']
        // });
        // console.log(result);
        const { FileToolsModule } = NativeModules
        await FileToolsModule.shareFiles([RNFS.ExternalDirectoryPath + "/" + data['original_name']], [data['mimetype']], data["texto"])
      } catch (error) {
        console.log('Erro ao compartilhar o texto:', error);
      }
    };

    const startPlaying = async (audioFile) => {
      try {
        const sound = new Sound(audioFile, '', (error) => {
          if (error) {
            console.log('Erro ao carregar o arquivo de áudio', error);
          } else {
            setIsPlaying(true);
            sound.setCurrentTime(currentTime)
            setDuration(sound.getDuration())
            sound.play((success) => {
              if (success) {
                console.log('Reprodução concluída');
                onSeek(0)
                setIsPlaying(false);
                clearInterval(intervalId);
              } else {
                console.log('Falha na reprodução');
              }
            });
            const interval = setInterval(() => {
              sound.getCurrentTime((seconds) => {
                onSeek(seconds);
                if (seconds >= duration) {
                  clearInterval(interval);
                  onSeek(0)
                }
              });
            }, 60);
            
            setPlayer(sound);
            setDuration(sound.getDuration());
            setIntervalId(interval);
          }
        });
      } catch (error) {
        console.log('Erro ao iniciar a reprodução', error);
      }
      };
      
    
      const pausePlaying = () => {
        if (player) {
          player.pause();
          setIsPlaying(false);
        }
      };
    
      const resumePlaying = () => {
        if (player) {
          player.play();
          setIsPlaying(true);
        }
      };
    
      const onSeek = (value) => {
        if (player) {
            player.setCurrentTime(value);
            setCurrentTime(value);
        }
      };

      if(!data){
        return null
      }
    
      return (
        <View>
            <MessageChat myMessage={user.id === data.idUser} idVal={idVal}>
              <TitleMessage myMessage={user.id === data.idUser}>{String(data.username).split(" ")[0]}</TitleMessage>
              <TouchableOpacity
                onLongPress={() => {
                  handlePressIn();
                  handlePressOut();
                }}
                onPress={() => {
                  if(showButtons){
                    setShowButtons(false)
                  }
              }}>
              <ContainerAudio myMessage={user.id === data.idUser}>
                      <TouchableOpacity onPress={isPlaying ? () => pausePlaying() : async () => {
                          if(!await RNFS.exists(RNFS.ExternalDirectoryPath + "/" + data['original_name'])){
                            const { FileToolsModule } = NativeModules;
                            FileToolsModule.downloadFile(serverURL + data['file_name'], RNFS.ExternalDirectoryPath + "/" + data['original_name'], null, "", "GET")
                            .then(response => console.log(response))
                            .catch(err => console.log(err));
                          }
                              startPlaying(RNFS.ExternalDirectoryPath + "/" + data['original_name'])
                          }}>
                      <IconsEnt
                          name={isPlaying ? 'controller-paus' : 'controller-play'}
                          size={20}
                          style={{color: 'black'}}
                      />
                      </TouchableOpacity>
                      <Slider
                      style={{ width: 120, alignSelf: 'center', alignContent: 'center' }}
                      minimumValue={0}
                      maximumValue={duration}
                      value={currentTime}
                      onValueChange={(value) => onSeek(value)}
                      />
                      {data['salvo'] ? <IconAnt name="swap" size={20} color={ user.id === data.idUser ? "#000":"#fff"}></IconAnt>:<IconAnt name="swapright" size={20} color="#000"></IconAnt>} 
              </ContainerAudio>
              </TouchableOpacity>
          </MessageChat>
            {showButtons && (
              <View
                style={[style.popupButtuns]}
              >
                <TouchableOpacity onPress={handleButtonPress} style={{backgroundColor: 'white', borderRadius: 30, padding: 10}}>
                  <IconIonic name="share-social-sharp" size={20} style={{color: 'black'}}></IconIonic>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  ws.emit("deletemes", data);
                  dispatch(actions.DELETE_MESSAGE_CHAT_SUCCESS({idChat: idChat, message: data}));
                }} style={{backgroundColor: 'white', borderRadius: 30, padding: 10}}>
                  <IconEnt name="trash" size={20} style={{color: 'black'}}></IconEnt>
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
    left: "40%",
    display: 'flex',
    flexDirection: 'row'
  }
});

export default memo(AudioMessage);
