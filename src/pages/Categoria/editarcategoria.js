import React, { useState } from "react";
import { View, TextInput, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/chamadosreducer/actions';
import DropDown from "../../components/DropDownPrioridade";

export default function EditarCategoria(props){

    const dispacth = useDispatch();

    function handleSubmit(e){
        if(!nome){
            alert("Valores não podem ser vazios");
            return
        }

        const dados = {id: props.route.params.categoria.id, nome: nome, prioridade: prioridade}
        try{
            dispacth(actions.EDITAR_CATEGORIAS_REQUEST(dados))
            navigation.goBack();
        }catch(err){
            console.log(err)
            alert(err)
        }
    }

    const user = useSelector(state => state.authreducer);
    const navigation = useNavigation();
    const [nome, setNome] = useState(props.route.params.categoria.nome);
    const [prioridade, setPrioridade] = useState(props.route.params.categoria.prioridade);

    return (
        <>
            <View>
                <View>
                    <Text style={{color: 'rgb(0,0,0)'}}>Nome do Categoria: </Text>
                    <TextInput style={{color: 'rgb(0,0,0)'}} value={nome} onChangeText={(dados) => setNome(dados)}></TextInput>
                </View>
                <View>
                    <Text style={{color: 'rgb(0,0,0)'}} >Prioridade: </Text>
                    <DropDown onSelected={setPrioridade} defaultValue={prioridade}></DropDown>
                </View>
                <Button title="Editar" onPress={(e) => handleSubmit(e)}></Button>
                <Button title="Voltar" onPress={(e) => navigation.goBack()}></Button>
            </View>
        </>
    );
}
