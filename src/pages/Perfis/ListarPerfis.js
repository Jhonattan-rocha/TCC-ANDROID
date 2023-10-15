import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Modal, SafeAreaView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { RectButton, LongPressGestureHandler, GestureHandlerRootView, State, Swipeable  } from 'react-native-gesture-handler';

import { azulclaro, azulescuro, white } from "../../config/colors";
import * as actions from '../../store/modules/funcionarioreducer/actions';
import Iconion from 'react-native-vector-icons/Ionicons';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function Listarperfiles(props){

    const navigation = useNavigation();
    const perfis = useSelector(state => state.funcionarioreducer.perfis.result) ?? [];
    const dispacth = useDispatch();

    useEffect(() => {
        dispacth(actions.PERFIL_BUSCAR_REQUEST());
    }, [])


    const renderRightActions = (item) => (
        <View>
            <TouchableOpacity onPress={() => {
                dispacth(actions.PERFIL_DELETAR_REQUEST({id: item.id}));
                dispacth(actions.PERFIL_BUSCAR_REQUEST());
            }}>
                <View style={style.deleteAction}>
                    <IconEnt name="trash" color="#fff" size={30}></IconEnt>
                </View>
            </TouchableOpacity>
        </View>
      );

    const renderLeftActions = (item) => (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("FuncionarioStack", {screen: "EditarPerfil", params: {perfil: item}})}>
                <View style={style.editAction}>
                    <IconAnt name="edit" color="#fff" size={30}></IconAnt>
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <GestureHandlerRootView  style={style.container}>
        <Text style={style.heading}>Perfis Cadastrados</Text>
        <SafeAreaView>
            <FlatList
            data={perfis}
            numColumns={1}
            renderItem={({ item }) => {
                return (
                <LongPressGestureHandler onHandlerStateChange={({ nativeEvent }) => {
                        if (nativeEvent.state === State.ACTIVE) {
                        // Ação do long press
                        console.log('Long press realizado');
                        }
                    }}>
                    <Swipeable useNativeAnimations={false} renderRightActions={() => renderRightActions(item)} renderLeftActions={() => renderLeftActions(item)}>
                        <RectButton style={style.perfilItem} onPress={() => {
                            // Ação do clique normal
                            console.log('Item clicado');
                            navigation.navigate("FuncionarioStack", {screen: "EditarPerfil", params: {perfil: item}});
                        }}>
                        <Text style={style.perfilNome}>{item.nome}</Text>
                        </RectButton>
                    </Swipeable>
                </LongPressGestureHandler>
                );
            }}
            keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
        <View style={style.modalOptions}>
            <TouchableOpacity 
            onPress={() => navigation.navigate("FuncionarioStack", {screen: "CriarPerfil", params: {}})}
            style={style.touchButtonOp}
            >
                <Text style={style.textButtonOp}>Cadastrar perfil</Text>
            </TouchableOpacity>
        </View>
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
    perfilItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: 'black',
    },
    perfilNome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    responsavel: {
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