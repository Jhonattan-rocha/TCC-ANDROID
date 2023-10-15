import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleView } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../store/modules/chamadosreducer/actions';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconEnt from 'react-native-vector-icons/Entypo';


export default function EscolherCategoria(props){
    const nav = useNavigation();
    const categoriaslist = useSelector(state => state.chamadosreducer.Categorias.result)
    const dispacth = useDispatch();

    return (
        <>
            <StyleView>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>CATEGORIAS CATALOGADOS</Text>
                </View>
                <FlatList   
                    data={categoriaslist}
                    numColumns={1}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => {
                        return (
                            <View style={{display: "flex", alignItems: "flex-end", justifyContent: "center", margin: 'auto'}}>
                                <View style={styles.touchIcons}>
                                    <TouchableOpacity onPress={() => dispacth(actions.DELETAR_CATEGORIAS_REQUEST({id: item.id}))}>
                                        <IconEnt name="trash" size={30} color="#000" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => nav.navigate("ChamadosStack", {screen: "EditarCategoria", params: {categoria: item}})}>
                                        <IconAnt name="edit" size={30} color="#000" />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                    onPress={() => nav.navigate("ChamadosStack", {screen: "CategoriaEscolhida", params: {categoria: item.id}})}
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