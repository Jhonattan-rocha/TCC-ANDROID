import React from "react";
import { View, TextInput, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/chamadosreducer/actions';


export default function EditarStatus(props){
    const dispacth = useDispatch();

    function handleSubmit(e){
        if(!nome){
            alert("Valores não podem ser vazios");
            return
        }

        const dados = {id: props.route.params.status.id, nome: nome}
        try{
            dispacth(actions.EDITAR_STATUS_REQUEST(dados))
            navigation.goBack();
        }catch(err){
            console.log(err);
            alert(err);
        }
    }

    const user = useSelector(state => state.authreducer);
    const navigation = useNavigation();
    const [nome, setNome] = React.useState(props.route.params.status.nome);

    return (
        <>
            <View>
                <View>
                    <Text style={{color: 'rgb(0,0,0)'}}>Nome do status: </Text>
                    <TextInput style={{color: 'rgb(0,0,0)'}} value={nome} onChangeText={(dados) => setNome(dados)}></TextInput>
                </View>
                <Button title="Editar" onPress={(e) => handleSubmit(e)}></Button>
                <Button title="Listar Chamados" onPress={(e) => navigation.navigate("ChamadoList", {params: {user: user}})}></Button>
            </View>
        </>
    );
}
