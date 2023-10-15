import React, {useState, useEffect, useCallback} from "react";
import { DivChat, InputChat, Containerbuttoninput, Messages} from './styled'
import SocketIo from 'socket.io-client';
import { useSelector,useDispatch } from "react-redux";
import { View, TouchableOpacity, StyleSheet, Platform, Vibration, SafeAreaView, Button, Modal, Text, Dimensions  } from "react-native";
import Iconion from 'react-native-vector-icons/Ionicons';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import AudioRecorder from "../../audioPlayer";
import AudioMessage from "../../audioMessage";
import FileMessage from "../../FileMessage";
import Message from "../../Message";
import EditMessagePopup from "../../EditMessage";
import { baseURL, SocketPort } from "../../../services/config";
import { azulclaro, azulescuro, white } from "../../../config/colors";

import * as actions from '../../../store/modules/ChatsReducer/actions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Chat(props) {
    
        const user = useSelector(state => state.authreducer.user);
        const [message, setMessage] = useState("");
        const [idChat, setIdChat] = useState(props.route.params.chat.id);
        const navigation = useNavigation();
        const [files, setFiles] = useState("");
        const chat = useSelector(state => {
            try{
                let mes = state.chatreducer.chat.find(ch => ch['idChat'] === idChat)
                return mes.mensagens
            }catch(err){
                return state.chatreducer.chat
            }
        }) ?? [];
        const [messages, setMessages] = useState([]);
        const [showEdit, setShowEdit] = useState(false);
        const [selectMessage, setSelectMessage] = useState([]);
        const [optionsView, setOptionsView] = useState(false);
        const [ws, setWs] = useState(SocketIo);

        const dispatch = useDispatch();
        
        const validarResposta = (data) => {
            try{
                console.log(idChat, data)
                let value = chat.find(mes => {
                    return mes['id'] === data['id']
                }) ?? {}
                
                if(Object.keys(value).length === 0){
                    dispatch(actions.ADD_MESSAGE_CHAT_SUCCESS({idChat: idChat, message: data}));
                }
                dispatch(actions.UPDATE_MESSAGE_CHAT_SUCCESS({idChat: idChat, message: data}));
            }catch(err){
                console.log(err)
            }
        } 
        
        const init = () => {
            const ws = SocketIo(`http://${baseURL}:${SocketPort}`)

            setWs(ws)

            dispatch(actions.GET_CHAT({id: idChat}))

            ws.connect()

            ws.on("connect", (data) => {
                console.log("conectado com sucesso");
            });

            ws.on("success", (data) => {
                setIdChat(data.id);
            })

            ws.on("error", (data) => {
                console.log("Um erro aconteceu: ", data);
            })

            ws.on("message", (data) => {
                validarResposta(data)
            });

            ws.on("disconnect", (error) => {
                console.log("Desconectado", error);
            })

            ws.on('leave', (data) => {
                console.log('Saiu do chat');
            });

            ws.on('join', (data) => {
                console.log('Entrou do chat');
            });

            ws.on('file_data', (data) => {
                validarResposta(data)
            });

            ws.on('audio_data', (data) => {
                validarResposta(data)
            });

            ws.on("reChat", (data) => {
                validarResposta(data)
            });

            ws.on("delmes", (data) => {
                let value = chat.find(mes => {
                    return mes['id'] === data['id']
                }) ?? {}
                
                if(Object.keys(value).length !== 0){
                    dispatch(actions.DELETE_MESSAGE_CHAT_SUCCESS({idChat: idChat, message: data}));
                }
            });

            ws.emit('chat', {id: props.route.params.chat.id, titulo: props.route.params.chat.causa, descricao: props.route.params.chat.descricao});
            ws.emit('join', {room: idChat});

            try{
                ws.emit('re', {id: idChat, idMes: chat[chat.length - 1].id});
            }catch(err){
                console.log(err, "primeira vez no chat")
            }
        }

        const close = () => {
            ws.emit('leave', {room: idChat})
            ws.disconnect();
            setMessages([]);
            console.log("Cliente saiu")
        }

        useEffect(() => {
            init()
            return close
        }, []);

        const updateMessages = useCallback(() => {
            const updatedMessages = chat.map((mes) => {
                if(!mes['idUser']){

                }else{
                    if (String(mes['original_name']).match(/\.(mp3|wav|flac|aac|ogg)$/i)) {
                      return <AudioMessage key={mes['id']} user={user} downloadFile={downloadFile} idVal={mes['id']} idChat={idChat} setShowEdit={setShowEdit} setSelectMessage={setSelectMessage} ws={ws}></AudioMessage>;
                    } else if (mes['original_name']) {
                      return <FileMessage downloadFile={downloadFile} user={user} key={mes['id']} idVal={mes['id']} idChat={idChat} setShowEdit={setShowEdit} setSelectMessage={setSelectMessage} ws={ws}></FileMessage>;
                    } else {
                      return <Message user={user} key={mes['id']} idVal={mes['id']} idChat={idChat} setShowEdit={setShowEdit} setSelectMessage={setSelectMessage} ws={ws}></Message>;
                    }
                }
            });
        
            setMessages(updatedMessages.reverse());
        }, [chat, dispatch, downloadFile, idChat, setShowEdit, setSelectMessage, user, ws]);
        
          // Atualizar o estado local de messages sempre que chat for alterado
        useEffect(() => {
            updateMessages();
        }, [chat]);

        useEffect(() => {
            const unsubscribe = navigation.addListener('beforeRemove', close);
            return unsubscribe;
        }, [navigation, close]);

        useEffect(() => {
            navigation.setOptions({
                headerRight: props => (
                    <View {...props}>
                        <TouchableOpacity onPress={() => setOptionsView(!optionsView)}>
                            <IconEnt  name="dots-three-horizontal" size={20} color="#000"></IconEnt>
                        </TouchableOpacity>
                        {optionsView ? (
                            <Modal visible={optionsView} 
                            animationType="slide">
                                <View style={styles.modalOptions}>
                                    <View style={styles.iconModalClose}>
                                        <TouchableOpacity onPress={() => setOptionsView(false)} style={styles.closeButton}>
                                            <IconAnt name="close" size={30} color="#000"></IconAnt>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                    onPress={() => {
                                        dispatch(actions.RESET_CHAT({id: idChat}))
                                        setMessages([])
                                        navigation.goBack()
                                    }}
                                    style={styles.touchButtonOp}
                                    >
                                        <Text style={styles.textButtonOp}>Limpar Chat</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        ): null}
                    </View>
                )
            })
        }, [navigation, optionsView, idChat, setOptionsView, dispatch, setMessages])

        const fun = () => {
            const nSalvos = chat.filter(mes => mes['salvo'] === false)
            console.log(nSalvos)

            nSalvos.forEach(mes => {
                let bytes = null
                if(mes['original_name']){
                    RNFS.exists(RNFS.ExternalDirectoryPath + "/" + mes['original_name'])
                    .then(response => { 
                        if(response){
                            RNFS.readFile(RNFS.ExternalDirectoryPath + "/" + mes['original_name'], 'base64')
                            .then(response => {
                                bytes = response
                            })
                            .catch(err => console.log(err))
                        }
                    })
                    .catch(err => console.log(err))
                }
                
                data = {id: idChat, idMes: mes['id'], texto: mes['texto'], idUser: mes['idUser'], username: mes['username'], salvo: false, original_name: mes['original_name'], file: bytes, type: mes['type']};
                ws.emit('message', data)
            })
        }

        useEffect(() => {
            try {
              const nSalvos = chat.filter(mes => mes['salvo'] === false) ?? [];
              let inter = null;
          
              if (nSalvos.length > 0) {
                inter = setInterval(fun, 5000);
              } else {
                clearInterval(inter);
              }
          
              return () => {
                clearInterval(inter);
              };
            } catch (err) {
              console.log(err);
            }
          }, [chat]);

        const generateRandomInteger = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const handleSendMessage = async (e) => {
            const num = generateRandomInteger(0, 10000000000)
            let data = {}
            
            if(files){
                files.forEach(file => {
                    RNFS.copyFile(file.uri, RNFS.ExternalDirectoryPath + "/" + file.name)
                    .then(res => {
                        RNFS.readFile(RNFS.ExternalDirectoryPath + "/" + file.name, 'base64')
                        .then(response => {
                            data = {idChat: idChat, message: {id: num, texto: message || " \x00 ", idUser: user.id, username: user.nome, original_name: file.name, salvo: false, file: null, type: 'file'}};
                            ws.emit("message", {id: idChat, idMes: num, texto: message || " \x00 ", idUser: user.id, username: user.nome, original_name: file.name, salvo: false, file: response, type: 'file'});
                            validarResposta(data);
                        })
                        .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
                })
                setFiles(null)
                setMessage("")
                return
            }else{
                data = {idChat: idChat, message: {id: num, texto: message, idUser: user.id, username: user.nome, salvo: false, original_name: '', file: null, type: 'text'}};
                ws.emit("message", {id: idChat, idMes: num, texto: message, idUser: user.id, username: user.nome, salvo: false, original_name: '', file: null, type: 'text'});
            }
            validarResposta(data)
            updateMessages()
            setFiles(null)
            setMessage("")
        }

        const downloadFile = (mes) => {
            RNFS.exists(RNFS.ExternalDirectoryPath + "/" + mes['original_name'])
            .then(response => {
                data = { ...mes }
                if(response){
                    data.original_name = `${generateRandomInteger(1, 1000000000)}_` + mes["original_name"]
                    ws.emit("edit", data)
                }
                const serverUrl = `http://${baseURL}:${SocketPort}/download/` + data['file_name']; // URL do seu servidor Flask-SocketIO
                const downloadDest = `${RNFS.ExternalDirectoryPath}/${data['original_name']}`; // Caminho de destino para salvar o arquivo
                console.log(data)
                // Realiza a solicitação para baixar o arquivo do servidor
                RNFS.downloadFile({
                    fromUrl: serverUrl,
                    toFile: downloadDest,
                    headers: {}, // Headers adicionais, se necessário
                    // background: false, // Define se o download ocorrerá em segundo plano (para iOS)
                    // discretionary: true, // Define se o download será adiado até que o dispositivo esteja conectado ao Wi-Fi (para iOS)
                    download_name: data['original_name'], 
                    progress: (res) => {
                        const progress = (res.bytesWritten / res.contentLength) * 100;
                        console.log(`Progresso: ${progress}%`);
                    },
                    readTimeout: 30
                }).promise
                    .then((response) => {
                        
                    console.log('Arquivo baixado:', response);
                    // O arquivo foi baixado com sucesso, você pode realizar as operações desejadas com ele aqui
                    })
                    .catch((error) => {
                        console.log('Erro ao baixar o arquivo:', error);
                        RNFS.unlink(downloadDest)
                        .then(response => {
                            console.log("Arquivo limpo")
                        })
                        .catch(err => console.log(err));
                    });
            })
            .catch(err => console.log(err))
        };

        const handleFileSelection = async () => {
            try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles], // Defina os tipos de arquivos que deseja permitir
            });
        
            // Aqui você pode fazer algo com o arquivo selecionado, como enviá-lo para o servidor
            setFiles(res)
            } catch (error) {
            // Lidar com erros de seleção de arquivo
            console.log('Erro ao selecionar arquivo:', error);
            }
        };
        
        return (
                <SafeAreaView contentContainerStyle={styles.container}>
                    { showEdit ? 
                    <EditMessagePopup idChat={idChat} message={selectMessage} visible={showEdit} ws={ws} onCancel={setShowEdit}></EditMessagePopup>
                    :
                    null}
                    <DivChat>
                        <Messages
                        data={messages}
                        renderItem={({item}) => (
                            item
                        )}
                        keyExtractor={(item) => {
                            try{
                                return item.props.idVal
                            }catch(err){
                                return generateRandomInteger(0, 10000000)
                            }
                        }}
                        initialNumToRender={5} // Número inicial de elementos a serem renderizados
                        windowSize={5}
                        inverted={true} // Inverter a ordem de exibição dos itens
                        />
                        <View style={styles.botoes}>
                            <Containerbuttoninput>
                                <TouchableOpacity style={styles.botaoAnexo} onPress={() => handleFileSelection()}>
                                    <Iconion name="ios-attach-outline" color="#fff" size={30}></Iconion>
                                </TouchableOpacity>
                                <InputChat multiline scrollEnabled={false} value={message} onChangeText={(dados) => setMessage(dados)} id="messageInput"></InputChat>
                                {message !== "" || files ? 
                                    <TouchableOpacity onPress={(e) => handleSendMessage(e)} style={styles.botaoSend}>
                                        <Iconion name="send-sharp" color="#fff" size={30}></Iconion>
                                    </TouchableOpacity>
                                : 
                                <AudioRecorder setFiles={setFiles} send={ws} chat={idChat} update={updateMessages}></AudioRecorder>}
                            </Containerbuttoninput>
                        </View>
                    </DivChat>
                </SafeAreaView>
        );
}


const styles = StyleSheet.create({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: 'column',
      width: windowWidth,
      height: windowHeight
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
      width: windowWidth
    },
    botao: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      backgroundColor: "#4D9DE0",
      fontWeight: "bold",
      width: windowWidth,
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
    modalOptions: {
        width: windowWidth,
        height: windowHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    iconModalClose: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        width: windowWidth
    },
    touchButtonOp: {
        width: windowWidth,
        backgroundColor: azulclaro,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 20
    },
    textButtonOp: {
        color: white,
        fontSize: 18,
        fontWeight: 'bold'
    }
  }); 
