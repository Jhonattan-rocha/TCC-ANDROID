import React, { useState } from "react";
import { View, TextInput, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/chamadosreducer/actions';
import DropDownPrioridade from "../../components/DropDownPrioridade";
import DropDownCategorias from "../../components/DropDownCategorias";

export default function EditarCategoria(props){

    const dispacth = useDispatch();

    function handleSubmit(e){
        if(!nome){
            alert("Valores não podem ser vazios");
            return
        }

        const dados = {id: props.route.params.subcategoria.id, nome: nome, id_categoria: categoria, prioridade: prioridade}
        try{
            dispacth(actions.EDITAR_SUBCATEGORIAS_REQUEST(dados))
            navigation.goBack();
        }catch(err){
            console.log(err)
            alert(err)
        }
    }

    const user = useSelector(state => state.authreducer);
    const navigation = useNavigation();
    const [nome, setNome] = useState(props.route.params.subcategoria.nome);
    const [prioridade, setPrioridade] = useState(props.route.params.subcategoria.prioridade);
    const [categoria, setCategoria] = useState(props.route.params.subcategoria.id_categoria);

    return (
        <>
            <View>
                <View>
                    <Text style={{color: 'rgb(0,0,0)'}}>Nome da SubCategoria: </Text>
                    <TextInput style={{color: 'rgb(0,0,0)'}} value={nome} onChangeText={(dados) => setNome(dados)}></TextInput>
                </View>
                <View>
                    <Text style={{color: 'rgb(0,0,0)'}}>Categoria: </Text>
                    <DropDownCategorias style={{color: 'rgb(0,0,0)'}} onSelected={setCategoria} defaultValue={categoria}></DropDownCategorias>
                </View>
                <View>
                    <Text style={{color: 'rgb(0,0,0)'}}>Prioridade: </Text>
                    <DropDownPrioridade style={{color: 'rgb(0,0,0)'}} onSelected={setPrioridade} defaultValue={prioridade}></DropDownPrioridade>
                </View>
                <Button title="Editar" onPress={(e) => handleSubmit(e)}></Button>
                <Button title="Listar Chamados" onPress={(e) => navigation.navigate("ChamadoList", {params: {user: user}})}></Button>
            </View>
        </>
    );
}
