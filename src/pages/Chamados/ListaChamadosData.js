import React from "react";
import { View, Button, FlatList, Text, StyleSheet, ScrollView, TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/chamadosreducer/actions';
import { TextCalendarStyled } from "./styled";


function ListaChamadosData(props) {

  const navigation = useNavigation();
  const user = useSelector(state => state.authreducer);
  const dispatch = useDispatch();
  const [chamadoslist, setChamadoslist] = React.useState(props.route.params?.chamado) ?? [];
  const statuslist = useSelector(state => state.chamadosreducer.status.result) ?? [];
  const categoriaslist = useSelector(state => state.chamadosreducer.Categorias.result) ?? [];
  const setoresList = useSelector(state => state.funcionarioreducer.setores.result) ?? [];

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Dia: {props.route.params?.day}</Text>
        <FlatList
            data={chamadoslist}
            style={styles.flatListContainer}
            numColumns={1}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({item}) => {
                return (
                    <TouchableOpacity style={styles.textChamado} onPress={() => navigation.navigate("ChamadosStack", {screen: "ChamadoEdit", params: {chamado: item}})}>
                        <TextCalendarStyled>Causa: {item.causa}</TextCalendarStyled>
                        <TextCalendarStyled>Status: {statuslist.map(status => {
                            if(status.id === item.id_status){
                                return status.nome
                            }
                        })}</TextCalendarStyled>
                        <TextCalendarStyled>Operador: {item.operador}</TextCalendarStyled>
                        <TextCalendarStyled>Descrição: {item.descricao}</TextCalendarStyled>
                        <TextCalendarStyled>Categorias: {categoriaslist.map(cat => {
                            if(cat.id === item.categoria){
                                return cat.nome
                            }
                        })} </TextCalendarStyled>
                        <TextCalendarStyled>Setor: {setoresList.map(setor => {
                            if(setor.id === item.setor){
                                return setor.nome
                            }
                        })} </TextCalendarStyled>
                    </TouchableOpacity>
                );
            }}>
        </FlatList>
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

export default ListaChamadosData;
