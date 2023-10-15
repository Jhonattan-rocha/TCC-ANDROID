import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, NativeModules } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Checkbox from "../../components/CheckBox";
import RNFS from 'react-native-fs';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function FuncionarioHome(props){
    
    const navigation = useNavigation();
    const [check, setCheck] = React.useState(true);
    const { FileToolsModule } = NativeModules 
    console.log(check)
    FileToolsModule.listFiles("/storage")
    .then(response => console.log(response))
    .catch(err => console.log(err));

    return (
        <View style={style.container}>
            <TouchableOpacity  onPress={(e) => navigation.navigate("FuncionarioStack", {screen: "Setores", params: {}})} style={style.botao}>
                <Text style={style.botaoText}>Setores</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={(e) => navigation.navigate("FuncionarioStack", {screen: "Cargos", params: {}})} style={style.botao}>
                <Text style={style.botaoText}>Cargos</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={(e) => navigation.navigate("FuncionarioStack", {screen: "ListarFuncionario", params: {}})} style={style.botao}>
                <Text style={style.botaoText}>Funcionarios</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={(e) => navigation.navigate("FuncionarioStack", {screen: "ListarPerfis", params: {}})} style={style.botao}>
                <Text style={style.botaoText}>Perfís cadastrados</Text>
            </TouchableOpacity>
        </View>
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
        width: '100%',
        height: 50
    },
    botaoText: {
        color: 'black',
        fontSize: 14
    }
});
