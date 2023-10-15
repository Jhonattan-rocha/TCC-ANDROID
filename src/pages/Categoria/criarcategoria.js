import React from "react";
import { View, TextInput, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/chamadosreducer/actions';
import DropDown from "../../components/DropDownPrioridade";

export default function CriarCategoria(props){

    const dispacth = useDispatch();

    function handleSubmit(e){
        if(!nome){
            alert("Valores não podem ser vazios");
            return
        }

        const dados = {nome: nome, prioridade: prioridade, criador: user.user.nome}
        try{
            dispacth(actions.CRIAR_CATEGORIAS_REQUEST(dados))
            navigation.goBack();
        }catch(err){
            console.log(err)
            alert(err)
        }
    }

    const user = useSelector(state => state.authreducer);
    const navigation = useNavigation();
    const [nome, setNome] = React.useState("");
    const [prioridade, setPrioridade] = React.useState("");

    return (
        <>
            <View>
                <View>
                    <Text style={{color: 'rgb(0,0,0)'}}>Nome da Categoria: </Text>
                    <TextInput style={{color: 'rgb(0,0,0)'}} value={nome} onChangeText={(dados) => setNome(dados)}></TextInput>
                </View>
                <View>
                    <Text style={{color: 'rgb(0,0,0)'}}>Prioridade: </Text>
                    <DropDown style={{color: 'rgb(0,0,0)'}} onSelected={setPrioridade}></DropDown>
                </View>
                <Button title="Criar" onPress={(e) => handleSubmit(e)}></Button>
                <Button title="Voltar" onPress={(e) => navigation.goBack()}></Button>
            </View>
        </>
    );
}
