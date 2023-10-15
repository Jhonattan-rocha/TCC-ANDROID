import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, Dimensions, TouchableOpacity } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import DropDown from '../../../components/DropDownFuncionarios';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/modules/funcionarioreducer/actions';


const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

function CadastrarSetor(props){
  const [nome, setNome] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch();

  const handleSave = () => {
    const newSector = {
      nome,
      responsavel,
    };
    dispatch(actions.CRIAR_SETORES_REQUEST(newSector))
    setNome('');
    setResponsavel('');
    setVisible(false)
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
            <Text style={styles.label}>Nome do Setor:</Text>
            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={text => setNome(text)}
                placeholder="Digite o nome do setor"
            />
            <Text style={styles.label}>Responsável:</Text>
            <DropDown onSelected={setResponsavel}></DropDown>
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

export default CadastrarSetor;
