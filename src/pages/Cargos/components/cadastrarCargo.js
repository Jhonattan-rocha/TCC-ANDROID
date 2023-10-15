import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, Dimensions, TouchableOpacity } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/modules/funcionarioreducer/actions';


const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

function CadastrarCargos(props){
  const [nome, setNome] = useState('');
  const user = useSelector(state => state.authreducer.user)
  const [criador, setCriador] = useState(user.id);
  const [nivel, setNivel] = useState("")
  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch();

  const handleSave = () => {
    const newSector = {
      nome,
      criador,
      nivel
    };
    dispatch(actions.CRIAR_CARGO_REQUEST(newSector))
    setNome('');
    setCriador('');
    setVisible(false);
    props.setOptionSeve(false);
  };

  return (
        <Modal animationType='slide' visible={visible}>
            <View style={styles.iconModalClose}>
                <TouchableOpacity onPress={() => {
                    props.setOptionsView(false)
                    props.setOptionSeve(false)
                    setVisible(false)
                }}>
                    <IconAnt name="close" size={30} color="#000"></IconAnt>
                </TouchableOpacity>
            </View>
            <Text style={styles.label}>Nome do cargo:</Text>
            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={text => setNome(text)}
                placeholder="Digite o nome do cargo"
            />
            <Text style={styles.label}>Nível:</Text>
            <TextInput
                style={styles.input}
                value={nivel}
                onChangeText={text => setNivel(text)}
                placeholder="Digite o nível do cargo"
            />
            <Button title="Salvar" onPress={handleSave} />
        </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: width,
    height: height,  
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: 'black',
  },
  iconModalClose: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    width: width
    },
});

export default CadastrarCargos;
