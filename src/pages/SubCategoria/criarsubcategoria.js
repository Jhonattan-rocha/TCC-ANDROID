import React, { useState } from "react";
import { View, TextInput, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/chamadosreducer/actions';
import DropDownPrioridade from "../../components/DropDownPrioridade";
import DropDownCategorias from "../../components/DropDownCategorias";

export default function CriarSubCategoria(props){

    const dispacth = useDispatch();

    function handleSubmit(e){
        if(!nome){
            alert("Valores não podem ser vazios");
            return
        }

        const dados = {nome: nome, prioridade: prioridade, id_categoria: categoria, criador: user.user.nome}
        try{
            dispacth(actions.CRIAR_SUBCATEGORIAS_REQUEST(dados))
            navigation.goBack();
        }catch(err){
            console.log(err)
            alert(err)
        }
    }

    const user = useSelector(state => state.authreducer);
    const navigation = useNavigation();
    const [nome, setNome] = React.useState("");
    const [categoria, setCategoria] = useState("");
    const [prioridade, setPrioridade] = React.useState("");

    return (
        <>
            <View>
                <View>
                    <Text style={{color: 'rgb(0,0,0)'}}>Nome da SubCategoria: </Text>
                    <TextInput style={{color: 'rgb(0,0,0)'}} value={nome} onChangeText={(dados) => setNome(dados)}></TextInput>
                </View>
                <View>
                    <Text style={{color: 'rgb(0,0,0)'}}>Categoria: </Text>
                    <DropDownCategorias style={{color: 'rgb(0,0,0)'}} onSelected={setCategoria}></DropDownCategorias>
                </View>
                <View>
                    <Text style={{color: 'rgb(0,0,0)'}}>Prioridade: </Text>
                    <DropDownPrioridade style={{color: 'rgb(0,0,0)'}} onSelected={setPrioridade}></DropDownPrioridade>
                </View>
                <Button title="Criar" onPress={(e) => handleSubmit(e)}></Button>
                <Button title="Listar Chamados" onPress={(e) => navigation.navigate("ChamadoList", {params: {user: user}})}></Button>
            </View>
        </>
    );
}
