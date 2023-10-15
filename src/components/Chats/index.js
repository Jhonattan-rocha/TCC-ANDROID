import React, { useState } from "react";
import { Divhome, DivListaDeChamados, DivDados, TextStyled, DivChatList,  } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/modules/chamadosreducer/actions';
import DropDown from "../DropDownFiltro";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, ScrollView, Image, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import IconAnt from 'react-native-vector-icons/AntDesign';

export default function Chats(props) {
  const chamados = useSelector(state => state.chamadosreducer.chamados.result) || [];
  const chats = useSelector(state => state.chatreducer.chat) || [];
  const iduser = useSelector(state => state.authreducer.user.id)
  const dispatch = useDispatch(); 
  const [filtroChamados, setFiltroChamados] = React.useState("my");
  const navigation = useNavigation();
  const [showLastMes, setSowLastMes] = React.useState(false);
  const [chamadoSelecionado, setChamadoSelecionado] = React.useState("");

  React.useEffect(() => {
    if(filtroChamados === 'my'){
      dispatch(actions.CHAMADOSREQUEST({filter: `id_funcionario_criador+eq+${iduser}`}));
    }else if(filtroChamados === "resp"){
        dispatch(actions.CHAMADOSREQUEST({filter: `id_funcionario_resp+eq+${iduser}`}));
    }else if(filtroChamados === "other"){
      dispatch(actions.CHAMADOSREQUEST({filter: `id_funcionario_criador+ne+${iduser}`}));
    }else if(filtroChamados === "any"){
        dispatch(actions.CHAMADOSREQUEST());
    }
  }, [filtroChamados])

  function findChat(id){
    let dados = chats.find(ch => ch['idChat'] === id)
    if(!dados){
      return false
    }
    return dados['mensagens']
  }

  return (
      <Divhome contentContainerStyle={styles.alignStyled}>
          <DivListaDeChamados>
            <DropDown onSelected={setFiltroChamados}></DropDown>
            <DivChatList>
            {chamados.map(chamado => {
              let messages = findChat(chamado.id)

              let dados = messages[messages.length -1] ?? ""
              let data = new Date(dados['data']) ?? new Date()
              let dataFormatada = data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) ?? "";
              let salvo = dados['salvo'] ?? ""
              let texto = dados['texto'] ?? ""
              let usuario = String(dados['username']).split(" ") ?? ""

              let usuarioCapitalizeFirstLetter = ""

              if(dados['username']){
                st = usuario[0]
                st = st.charAt(0).toUpperCase() + st.slice(1);
                usuarioCapitalizeFirstLetter = usuarioCapitalizeFirstLetter + st
              }

              usuarioCapitalizeFirstLetter = usuarioCapitalizeFirstLetter + " "

              return (
                <DivDados onPress={() => {
                      navigation.navigate("ChatsStack", {screen:"Chat", params: {chat: chamado}})
                    }} key={chamado.id}
                    onLongPress={() => {
                      setChamadoSelecionado(dados)
                      setSowLastMes(true)
                      }}>
                    <View>
                      <TextStyled>{chamado.causa}</TextStyled> 
                      <View style={styles.MessageContainer}>
                        { dados ? salvo ? <IconAnt name="swap" size={20} color="#000"></IconAnt>:<IconAnt name="swapright" size={20} color="#000"></IconAnt>: null}
                        <Text style={styles.textMessage}> {usuario.length >= 0 ? usuarioCapitalizeFirstLetter: ""} </Text>
                        <Text style={styles.textMessage} numberOfLines={1} ellipsizeMode="tail">{texto}</Text>
                      </View>
                    </View>
                      <Text style={styles.textMessage}>{dataFormatada.length === 10 ? dataFormatada:""}</Text>
                </DivDados>
              )
            })}
            {showLastMes ? 
              <Modal visible={showLastMes} transparent={true} animationType="fade">
              <TouchableWithoutFeedback onPress={() => {
                setSowLastMes(false)
                setChamadoSelecionado("");
              }}>
                  <View style={styles.overlay} />
              </TouchableWithoutFeedback>
              <View style={styles.containerMes}>
                  <TextInput
                  style={styles.inputLastMes} 
                  value={chamadoSelecionado['texto']}
                  autoFocus={true}
                  editable={false}
                  numberOfLines={3}
                  multiline
                  />
              </View>
              </Modal>:
              null}
            </DivChatList>
          </DivListaDeChamados>
      </Divhome>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
    justifyContent: "space-around",
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1 
  },
  botao: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#4D9DE0",
    color: 'black',
    fontWeight: "bold",
    width: '100%',
    maxHeight: 40
  },
  alignStyled: {
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  textMessage: {
    color: 'black'
  },
  MessageContainer: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 200,
    maxHeight: 60
  },
  overlay: {
    flex: 1,
  },
  containerMes: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 32,
    borderRadius: 8,
    maxHeight: 250,
    height: 150
  },
  inputLastMes: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    color: 'black',
    flexWrap: 'wrap',
    minHeight: 50,
    maxHeight: 200
  },
}); 