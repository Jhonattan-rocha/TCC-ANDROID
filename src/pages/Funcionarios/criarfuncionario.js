import React from "react";
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/funcionarioreducer/actions';
import DropDownSetor from "../../components/DropDownSetor";
import DropDownCargo from '../../components/DropDownCargo';
import { TextStyled, TextInputStyled } from "./styled";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import IconAnt from 'react-native-vector-icons/AntDesign'

export default function CriarFuncionario(props){
    const dispatch = useDispatch();

    function handleSubmit(e){
        if(!nome || !cpf || !email || !senha){
            alert("Valores não podem ser vazios");
            return
        }

        const dados = {nome: nome, cpf: cpf, cep: '00000000', email: email, dtnasc: dtnasc, telefone: telefone, nivel: nivel, cargo: cargo, password: senha, setor: setor, id_empresa: user.id, tenant_id: user.tenant_id}
        try{
            dispatch(actions.FUNCIONARIO_CRIAR_REQUEST(dados));
            dispatch(actions.FUNCIONARIO_BUSCAR_REQUEST({filter: `id_empresa+eq+${user.id}`}));
            navigation.goBack();
        }catch(err){
            console.log(err)
            alert(err)
        }
    }

    const user = useSelector(state => state.authreducer.user);
    const navigation = useNavigation();
    const [nome, setNome] = React.useState();
    const [cpf, setCpf] = React.useState();
    const [email, setEmail] = React.useState();
    const [dtnasc, setDtnasc] = React.useState(new Date());
    const [telefone, setTelefone] =  React.useState();
    const [nivel, setNivel] =  React.useState();
    const [cargo, setCargo] = React.useState();
    const [senha, setSenha] =  React.useState();
    const [setor, setSetor] = React.useState();
    const [showDateTime, setShowDateTime] = React.useState(false);

    return (
            <ScrollView>
                <View>
                    <View>
                        <TextStyled>Nome</TextStyled>
                        <TextInputStyled value={nome} onChangeText={(dados) => setNome(dados)}></TextInputStyled>
                    </View>

                    <View>
                        <TextStyled>cpf</TextStyled>
                        <TextInputStyled value={cpf} onChangeText={(dados) => setCpf(dados)}></TextInputStyled>
                    </View>
                </View>
                <View> 
                    <TextStyled>Email</TextStyled>
                    <TextInputStyled value={email} onChangeText={(dados) => setEmail(dados)}></TextInputStyled>
                </View> 
                <View style={styles.containerDate}>
                    <TextStyled>Data de nascimento</TextStyled>
                    <TextInput style={styles.inputDate}>{new Date(dtnasc).toLocaleDateString('pt-BR')}</TextInput>
                    <IconAnt name="select1" color="#000" size={25} onPress={() => setShowDateTime(true)} />
                        {showDateTime && (
                            <RNDateTimePicker
                            value={dtnasc}
                            mode="date"
                            display="default"
                            onChange={(event, select) => {
                                if (event.type === 'set') {
                                    setShowDateTime(false);
                                    setDtnasc(select);
                                } else if (event.type === 'dismissed') {
                                    setShowDateTime(false);
                                }
                            }}
                            />
                        )}
                </View> 
                <View> 
                    <TextStyled>Telefone</TextStyled>
                    <TextInputStyled value={telefone} onChangeText={(dados) => setTelefone(dados)}></TextInputStyled>
                </View> 
                <View> 
                    <TextStyled>Nível</TextStyled>
                    <TextInputStyled value={nivel} onChangeText={(dados) => setNivel(dados)}></TextInputStyled>
                </View> 
                <View> 
                    <TextStyled>Setor</TextStyled>
                    <DropDownSetor onSelected={setSetor}></DropDownSetor>
                </View> 
                <View> 
                    <TextStyled>Cargo</TextStyled>
                    <DropDownCargo onSelected={setCargo}></DropDownCargo>
                </View> 

                <View> 
                    <TextStyled>Senha</TextStyled>
                    <TextInputStyled value={senha} onChangeText={(dados) => setSenha(dados)}></TextInputStyled>
                </View> 

                <Button title="Criar" onPress={(e) => handleSubmit(e)}></Button>
                <Button title="Voltar" onPress={(e) => navigation.goBack()}></Button>
            </ScrollView>
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
    },
    inputDate: {
        color: 'black',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        height: 40,
        paddingLeft: 10,
        paddingRight: 10
    },
});
