import React, { useEffect } from "react";
import { View, Button, FlatList, Text, StyleSheet, ScrollView, TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/empresareducer/actions';
import { TextCalendarStyled } from "./styled";


function ListarEmpresas(props) {

  const navigation = useNavigation();
  const user = useSelector(state => state.authreducer.user);
  const dispatch = useDispatch();
  const empresasList = useSelector(state => state.empresareducer.empresa.result) ?? [];
  function handleUpdate(){
    try{
      dispatch(actions.EMPRESA_BUSCAR_REQUEST());
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    handleUpdate()
  }, [])

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Empresas</Text>
        <FlatList
            data={empresasList}
            style={styles.flatListContainer}
            numColumns={1}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({item}) => {
                return (
                    <TouchableOpacity style={styles.textChamado} onPress={() => navigation.navigate("HomeStack", {screen: "EditarEmpresa", params: {empresa: item}})}>
                        <TextCalendarStyled>Nome: {item.nome}</TextCalendarStyled>
                        <TextCalendarStyled>CNPJ: {item.cnpj}</TextCalendarStyled>
                    </TouchableOpacity>
                );
            }}>
        </FlatList>
        <Button title="Criar Empresas" onPress={() => navigation.navigate("HomeStack", {screen: "CriarEmpresa", params: {}})}></Button>
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

export default ListarEmpresas;
