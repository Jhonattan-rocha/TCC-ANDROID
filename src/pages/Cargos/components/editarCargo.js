import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, Dimensions, TouchableOpacity } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/modules/funcionarioreducer/actions';


const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

function EditarSetores(props){
  const [nome, setNome] = useState(props.cargo.nome);
  const [nivel, setNivel] = useState(`${props.cargo.nivel}`)
  const dispatch = useDispatch();

  const handleSave = () => {
    const newSector = {
      id: props.cargo.id,
      nome: nome,
      nivel: nivel,
    };
    dispatch(actions.EDITAR_CARGO_REQUEST(newSector))
    setNome('');
    setNivel('');
    props.resetEdit(false);
  };

  const handleInputChange = (text) => {
    const max = 10
    const min = 0
    if(Number(String(text).replace(/\D/g, "")) <= max && Number(String(text).replace(/\D/g, "")) >= min){
      setNivel(String(text).replace(/\D/g, ""))
    }
  };

  return (
        <Modal animationType='slide' visible={props.Visible}>
            <View style={styles.iconModalClose}>
                <TouchableOpacity onPress={() => {
                    props.resetEdit(false);
                }}>
                    <IconAnt name="close" size={30} color="#000"></IconAnt>
                </TouchableOpacity>
            </View>
            <Text style={styles.label}>Nome do Cargo:</Text>
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
                onChangeText={text => handleInputChange(text)}
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

export default EditarSetores;
