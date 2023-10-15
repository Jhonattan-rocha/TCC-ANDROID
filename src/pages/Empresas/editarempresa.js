import React from "react";
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/empresareducer/actions';
import { TextStyled, TextInputStyled } from "./styled";


export default function EditarEmpresa(props){
    const dispatch = useDispatch();

    function handleSubmit(e){
        if(!nome || !cnpj || !email){
            alert("Valores não podem ser vazios");
            return
        }

        const dados = {id: props.route.params.empresa.id, nome: nome, razao_social: razao_social, endereco: endereco, status:"a", cnpj: cnpj, email: email, telefone: telefone}
        try{
            dispatch(actions.EMPRESA_EDITAR_REQUEST(dados));
            dispatch(actions.EMPRESA_BUSCAR_REQUEST());
            navigation.goBack();
        }catch(err){
            console.log(err)
            alert(err)
        }
    }

    const navigation = useNavigation();
    const [nome, setNome] = React.useState(props.route.params.empresa.nome);
    const [razao_social, setRazao_social] = React.useState(props.route.params.empresa.razao_social);
    const [endereco, setEndereco] = React.useState(props.route.params.empresa.endereco);
    const [cnpj, setCnpj] = React.useState(props.route.params.empresa.cnpj);
    const [email, setEmail] = React.useState(props.route.params.empresa.email);
    const [telefone, setTelefone] =  React.useState(props.route.params.empresa.telefone);

    return (
        <>
            <View>
                <View>
                    <View>
                        <TextStyled>Nome</TextStyled>
                        <TextInputStyled value={nome} onChangeText={(dados) => setNome(dados)}></TextInputStyled>
                    </View>

                    <View>
                        <TextStyled>Razão Social</TextStyled>
                        <TextInputStyled value={razao_social} onChangeText={(dados) => setRazao_social(dados)}></TextInputStyled>
                    </View>

                    <View>
                        <TextStyled>CNPJ</TextStyled>
                        <TextInputStyled value={cnpj} onChangeText={(dados) => setCnpj(dados)}></TextInputStyled>
                    </View>
                </View>
                <View> 
                    <TextStyled>Email</TextStyled>
                    <TextInputStyled value={email} onChangeText={(dados) => setEmail(dados)}></TextInputStyled>
                </View> 
                <View> 
                    <TextStyled>Telefone</TextStyled>
                    <TextInputStyled value={telefone} onChangeText={(dados) => setTelefone(dados)}></TextInputStyled>
                </View> 
                <View> 
                    <TextStyled>Endereço</TextStyled>
                    <TextInputStyled value={endereco} onChangeText={(dados) => setEndereco(dados)}></TextInputStyled>
                </View> 

                <Button title="Editar" onPress={(e) => handleSubmit(e)}></Button>
                <Button title="Voltar" onPress={(e) => navigation.goBack()}></Button>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    inputDate: {
        color: 'black',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        height: 40,
        paddingLeft: 10,
        paddingRight: 10,
    },
    containerDate: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    }
});
