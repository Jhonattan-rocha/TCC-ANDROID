import React from "react";
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/empresareducer/actions';
import { TextStyled, TextInputStyled } from "./styled";


export default function CriarEmpresa(props){
    const dispatch = useDispatch();

    function handleSubmit(e){
        if(!nome || !cnpj || !email || !razao_social || !endereco || !senha || !telefone){
            alert("Valores não podem ser vazios");
            return
        }

        const dados = {nome: nome, razao_social: razao_social, endereco: endereco, cep: '00000000', bairro: '', numero: 0, status:"a", cnpj: cnpj, email: email, telefone: telefone, password: senha}
        try{
            dispatch(actions.EMPRESA_REQUEST(dados));
            dispatch(actions.EMPRESA_BUSCAR_REQUEST());
            navigation.goBack();
        }catch(err){
            console.log(err)
            alert(err)
        }
    }

    const navigation = useNavigation();
    const [nome, setNome] = React.useState();
    const [razao_social, setRazao_social] = React.useState();
    const [endereco, setEndereco] = React.useState();
    const [cnpj, setCnpj] = React.useState();
    const [email, setEmail] = React.useState();
    const [telefone, setTelefone] =  React.useState();
    const [senha, setSenha] =  React.useState();

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

                <View> 
                    <TextStyled>Senha</TextStyled>
                    <TextInputStyled value={senha} onChangeText={(dados) => setSenha(dados)}></TextInputStyled>
                </View> 

                <Button title="Criar" onPress={(e) => handleSubmit(e)}></Button>
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
