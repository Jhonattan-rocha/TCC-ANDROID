import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/modules/ChatsReducer/actions';

const audioRecorderPlayer = new AudioRecorderPlayer();

function AudioRecorder(props) {
  const user = useSelector(state => state.authreducer.user)
  const chat = useSelector(state => {
    try{
        return state.chatreducer.chat.find(ch => ch.idChat === props.chat)
    }catch(err){
        return state.chatreducer.chat
    }
  }) || {idChat: props.chat, mensagens: []};

  const [isRecording, setIsRecording] = useState(false);
  const [press, setPress] = useState(false)
  const [audioPath, setAudioPath] = useState('');
  const currentDate = new Date();
  const [name, setName] = useState(`recording_${currentDate.getMilliseconds()}.mp3`);
  const [path, setPath] = useState(RNFS.ExternalDirectoryPath + "/" + name)
  const dispatch = useDispatch();

  const startRecording = async () => {
    setPress(true)
    Vibration.vibrate(100)
    try {
      await audioRecorderPlayer.startRecorder(path);
      setIsRecording(true);
      setAudioPath(path);
    } catch (error) {
      console.log('Error starting recording:', error);
    }
  };

  const generateRandomInteger = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const stopRecording = async () => {
    setPress(false)
    Vibration.vibrate(100)
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      setAudioPath(result)
      setIsRecording(false);
      console.log('Recording saved at:', result);
      const fileUri = result.replace("file:///","");
      const bytes = await RNFS.readFile(fileUri, 'base64')
      const num = generateRandomInteger(0, 10000000000)
      
      dispatch(actions.ADD_MESSAGE_CHAT_SUCCESS({idChat: props.chat, message: {id: num, texto: "audio message", idUser: user.id, username: user.nome, original_name: name, type: 'audio'}}))
      props.send.emit("message", {id: props.chat, idMes: num, texto: "audio message", idUser: user.id, username: user.nome, original_name: name, file: bytes, type: 'audio'})
      props.update()
      
      setName(`recording_${currentDate.getMilliseconds()}.mp3`)
      setPath(RNFS.ExternalDirectoryPath + "/" + name)
    } catch (error) {
      console.log('Error stopping recording:', error);
    }
  };

  const playRecording = async () => {
    try {
      const sound = new Sound(audioPath, "", (error, success) => {
        if (error) {
          console.log('Error loading sound:', error);
          return;
        }
        console.log(success, error)

        sound.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });

      }); 
      console.log(audioPath, sound.isLoaded())
    } catch (error) {
      console.log('Error playing recording:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPressIn={startRecording} onPressOut={stopRecording} style={[styles.botaoAudio, press && styles.botaoAudioPrecionado]}>
        <IconMc name={"microphone"} color="#fff" size={30}></IconMc>
      </TouchableOpacity>
    </View>
  );
}

export default AudioRecorder;


const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column',
    width: '100%',
    height: '100%'
  },
  input: {
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#222",
    padding: 20,
    margin: 10,
    fontSize: 20
  },
  text: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    margin: 10
  },
  botoes: {
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%'
  },
  botao: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#4D9DE0",
    fontWeight: "bold",
    width: '100%',
    maxHeight: 40
  },
  alignStyled: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  botaoSend: {
      padding: 10,
      backgroundColor: "#000",
      borderRadius: 30
  },
  botaoAnexo: {
      padding: 10,
      backgroundColor: "#000",
      borderRadius: 30
  },
  botaoAudio: {
      padding: 10,
      backgroundColor: "#000",
      borderRadius: 30
  },
  botaoAudioPrecionado: {
    transform: [{ scale: 1.3 }]
  }
}); 

