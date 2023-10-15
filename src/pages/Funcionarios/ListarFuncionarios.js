import React, { useEffect } from "react";
import { View, Button, FlatList, Text, StyleSheet, ScrollView, TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/funcionarioreducer/actions';
import { TextCalendarStyled } from "./styled";


function ListarFuncionario(props) {

  const navigation = useNavigation();
  const user = useSelector(state => state.authreducer);
  const dispatch = useDispatch();
  const funcionariosList = useSelector(state => state.funcionarioreducer.funcionarios.result) ?? [];
  const cargosList = useSelector(state => {
    try{
        return state.funcionarioreducer.cargos.result
    }catch(err){
        return state.funcionarioreducer.cargos
    }
  }) ?? [];
  const setoresList = useSelector(state => state.funcionarioreducer.setores.result) ?? [];

  function handleUpdate(){
    try{
      dispatch(actions.FUNCIONARIO_BUSCAR_REQUEST());
      dispatch(actions.CARGOS_REQUEST());
      dispatch(actions.SETORES_REQUEST());
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    handleUpdate()
  }, [])

  console.log(funcionariosList);

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Funcionarios</Text>
        <FlatList
            data={funcionariosList}
            style={styles.flatListContainer}
            numColumns={1}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({item}) => {
                return (
                    <TouchableOpacity style={styles.textChamado} onPress={() => navigation.navigate("FuncionarioStack", {screen: "EditarFuncionario", params: {funcionario: item}})}>
                        <TextCalendarStyled>Nome: {item.nome}</TextCalendarStyled>
                        <TextCalendarStyled>CPF: {item.cpf}</TextCalendarStyled>
                        <TextCalendarStyled>Setor: {setoresList.find(setor => setor.id === item.setor) ? setoresList.find(setor => setor.id === item.setor).nome : ""} </TextCalendarStyled>
                        <TextCalendarStyled>Cargo: {cargosList.find(cargo => cargo.id === item.id_cargo) ? cargosList.find(cargo => cargo.id === item.id_cargo).nome: ""}</TextCalendarStyled>
                    </TouchableOpacity>
                );
            }}>
        </FlatList>
        <Button title="Criar Funcionario" onPress={() => navigation.navigate("FuncionarioStack", {screen: "CriarFuncionario", params: {}})}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    borderWidth: 0.5,
    borderColor: 'black',
    color: 'black',
  },
  flatListContainer: {
    width: '100%',
    height: '100%',
  },
  textChamado: {
    backgroundColor: "#59BFFF",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    padding: 10
  }, 
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  }
});

export default ListarFuncionario;
