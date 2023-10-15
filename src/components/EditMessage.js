import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback, View, TextInput, Button, StyleSheet } from 'react-native';
import * as actions from '../store/modules/ChatsReducer/actions';
import { useSelector, useDispatch } from 'react-redux';


const EditMessagePopup = ({ visible, idChat, message, onCancel, ws }) => {
    const chat = useSelector(state => {
        try{
            return state.chatreducer.chat.find(ch => ch.idChat === idChat).mensagens
        }catch(err){
            return state.chatreducer.chat
        }
    }) || [];

    const mes = chat.find(me => me['id'] === message)

    const [editedMessage, setEditedMessage] = useState(mes['texto']);
    const dispacth = useDispatch();

    const handleSave = () => {
        const mess = { ...mes }
        mess.texto = editedMessage;
        dispacth(actions.UPDATE_MESSAGE_CHAT_SUCCESS({ idChat: idChat, message: mess }));
        ws.emit("edit", mess);
        handleClose();
    };

    const handleClose = () => {
        onCancel(false);
    };

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={handleClose}>
            <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
            <TextInput
            style={styles.input} 
            value={editedMessage}
            onChangeText={setEditedMessage}
            autoFocus={true}
            />
            <View style={styles.buttons}>
            <Button title="Salvar" onPress={handleSave} />
            <Button title="Cancelar" onPress={handleClose} />
            </View>
        </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  container: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 32,
    borderRadius: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    color: 'black'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default EditMessagePopup;
