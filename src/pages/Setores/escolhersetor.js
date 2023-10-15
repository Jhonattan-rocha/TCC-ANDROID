import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleView } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../store/modules/funcionarioreducer/actions';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconEnt from 'react-native-vector-icons/Entypo';
import EditarSetores from "./components/editarSetor";


export default function EscolherSetor(props){
    const nav = useNavigation();
    const setoresList = useSelector(state => state.funcionarioreducer.setores.result) ?? [];
    const dispacth = useDispatch();
    const [optionEdit, setOptionEdit] = useState(false);
    const [setorSelecionado, setSetorSelecionado] = useState({});

    return (
        <>
            <StyleView>
                {optionEdit ? <EditarSetores resetEdit={setOptionEdit} Visible={optionEdit} setor={setorSelecionado}></EditarSetores>: null}
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>SETORES CATALOGADOS</Text>
                </View>
                <FlatList   
                    data={setoresList}
                    numColumns={1}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => {
                        return (
                            <View style={{display: "flex", alignItems: "flex-end", justifyContent: "center", margin: 'auto'}}>
                                <View style={styles.touchIcons}>
                                    <TouchableOpacity onPress={() => dispacth(actions.DELETAR_SETORES_REQUEST({id: item.id}))}>
                                        <IconEnt name="trash" size={30} color="#000" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setSetorSelecionado(item)
                                        setOptionEdit(true)
                                    }}>
                                        <IconAnt name="edit" size={30} color="#000" />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                    onPress={() => nav.navigate("ChamadosStack", {screen: "SetorEscolhido", params: {setor: item.id}})}
                                >
                                    <Text style={styles.buttonText}>{item.nome}</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}>
                </FlatList>
                
                <Button title="Voltar" onPress={(e) => nav.goBack()}></Button>
            </StyleView>
        </>
    );
}
const styles = StyleSheet.create({
        titleContainer: {
          alignItems: "center", // Centraliza horizontalmente
          marginTop: 20,
        },
        titleText: {
          fontSize: 20, // Altera o tamanho da fonte
          fontWeight: "bold", // Altera o peso da fonte,
          color: "black"
        },        
        buttonStyle: {
            backgroundColor: "#050A30",
            width: 270,
            borderRadius: 15,
            marginTop: 30,
            alignSelf: "center", // Centraliza horizontalmente
            height: 100, // Aumenta a altura
            justifyContent: "center", // Centraliza verticalmente
        },

        buttonText: {
            color: "white",
            fontSize: 16,
            textAlign: "center",
        },

        defaultText: {
            color: 'white',
            fontFamily: "Arial"
        },

        touchIcons: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row"
        }
    });