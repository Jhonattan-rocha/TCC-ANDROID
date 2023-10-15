import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { RectButton, LongPressGestureHandler, GestureHandlerRootView, State, Swipeable  } from 'react-native-gesture-handler';

import { azulclaro, azulescuro, white } from "../../config/colors";
import * as actions from '../../store/modules/funcionarioreducer/actions';
import Iconion from 'react-native-vector-icons/Ionicons';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import EditarCargo from "./components/editarCargo";
import CadastrarCargo from "./components/cadastrarCargo";

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function ListarCargos(props){

    const navigation = useNavigation();
    const [optionsView, setOptionsView] = useState(false);
    const [optionSave, setOptionSeve] = useState(false);
    const [optionEdit, setOptionEdit] = useState(false);
    const [cargosSelecionado, setCargosSelecionado] = useState({});
    const cargosList = useSelector(state => {
        try{
            return state.funcionarioreducer.cargos.result
        }catch(err){
            return state.funcionarioreducer.cargos
        }
    }) ?? [];
    const funcionariosList = useSelector(state => {
        try{
            return state.funcionarioreducer.funcionarios.result
        }catch(err){
            return state.funcionarioreducer.funcionarios
        }
    }) ?? [];
    const dispacth = useDispatch();

    useEffect(() => {
        dispacth(actions.FUNCIONARIO_BUSCAR_REQUEST());
        dispacth(actions.CARGOS_REQUEST());
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerRight: props => (
                <View {...props}>
                    <TouchableOpacity onPress={() => setOptionsView(!optionsView)}>
                        <IconEnt  name="dots-three-horizontal" size={20} color="#000"></IconEnt>
                    </TouchableOpacity>
                    {optionSave ? <CadastrarCargo view={optionSave} setOptionsView={setOptionsView} setOptionSeve={setOptionSeve}/>: null}
                    {optionsView ? (
                        <Modal visible={optionsView} animationType="slide">
                            <View style={style.modalOptions}>
                                <View style={style.iconModalClose}>
                                    <TouchableOpacity onPress={() => setOptionsView(false)}>
                                        <IconAnt name="close" size={30} color="#000"></IconAnt>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity 
                                onPress={() => {
                                    setOptionSeve(true)
                                    setOptionsView(false)
                                }}
                                style={style.touchButtonOp}
                                >
                                    <Text style={style.textButtonOp}>Cadastrar Cargos</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    ): null}
                </View>
            )
        })
    }, [navigation, optionsView, setOptionsView]);

    // Dentro do seu componente de navegação

    const renderRightActions = (item) => (
        <View>
            <TouchableOpacity onPress={() => {
                dispacth(actions.DELETAR_CARGO_REQUEST({id: item.id}));
                dispacth(actions.CARGOS_REQUEST());
            }}>
                <View style={style.deleteAction}>
                    <IconEnt name="trash" color="#fff" size={30}></IconEnt>
                </View>
            </TouchableOpacity>
        </View>
      );

    const renderLeftActions = (item) => (
        <View>
            <TouchableOpacity onPress={() => {
                setCargosSelecionado(item)
                setOptionEdit(true)
                }}>
                <View style={style.editAction}>
                    <IconAnt name="edit" color="#fff" size={30}></IconAnt>
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <GestureHandlerRootView  style={style.container}>
        <Text style={style.heading}>Cargos Cadastrados</Text>
        {optionEdit ? <EditarCargo resetEdit={setOptionEdit} Visible={optionEdit} cargo={cargosSelecionado}></EditarCargo>: null}
        <FlatList
          data={cargosList}
          renderItem={({ item }) => {
            let criador = funcionariosList.find(fun => Number(fun['id']) === Number(item["criador"]))

            if(!criador){
                criador = {nome: 'Erro ao buscar os dados do funcionário'}
            }

            return (
              <LongPressGestureHandler onHandlerStateChange={({ nativeEvent }) => {
                    if (nativeEvent.state === State.ACTIVE) {
                        // Ação do long press
                        console.log('Long press realizado');
                    }
                }}>
                <Swipeable useNativeAnimations={false} renderRightActions={() => renderRightActions(item)} renderLeftActions={() => renderLeftActions(item)}>
                    <RectButton style={style.setorItem} onPress={() => {
                        // Ação do clique normal
                        console.log('Item clicado');
                        setCargosSelecionado(item);
                        setOptionEdit(true);
                    }}>
                    <Text style={style.setorNome}>{item.nome}</Text>
                    <Text style={style.criador}>Criador: { criador.nome }</Text>
                    </RectButton>
                </Swipeable>
              </LongPressGestureHandler>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </GestureHandlerRootView >
    );
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    botao: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#4D9DE0",
        color: 'black',
        fontWeight: "bold",
        width: width,
        height: 50
    },
    botaoText: {
        color: 'black',
        fontSize: 14
    },
    
    modalOptions: {
        width: width,
        height: height,
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
        width: width
    },
    touchButtonOp: {
        width: width,
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
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        width: width,
        textAlign: "center",
        color: 'black',
    },
    setorItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: 'black',
    },
    setorNome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    criador: {
        fontSize: 16,
        color: 'black',
    },
    deleteAction: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
        height: '100%',
    },
    deleteText: {
        color: '#fff',
        fontSize: 18,
    },
    editAction: {
        backgroundColor: azulclaro,
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
        height: '100%',
    },
    editText: {
        color: '#fff',
        fontSize: 18,
    },
});