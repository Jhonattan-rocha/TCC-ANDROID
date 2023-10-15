import React from "react";
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/funcionarioreducer/actions';
import DropDownSetor from "../../components/DropDownSetor";
import DropDownCargo from '../../components/DropDownCargo';
import { TextStyled, TextInputStyled } from "./styled";
import IconAnt from 'react-native-vector-icons/AntDesign'
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function EditarFuncionario(props){
    const dispatch = useDispatch();

    function handleSubmit(e){
        if(!nome || !cpf || !email){
            alert("Valores não podem ser vazios");
            return
        }

        const dados = {id: props.route.params.funcionario.id, nome: nome, cpf: cpf, email: email, dtnasc: dtnasc, telefone: telefone, nivel: nivel, id_cargo: cargo, setor: setor}
        try{
            console.log(dados)
            dispatch(actions.FUNCIONARIO_EDITAR_REQUEST(dados));
            dispatch(actions.FUNCIONARIO_BUSCAR_REQUEST());
            navigation.goBack();
        }catch(err){
            console.log(err)
            alert(err)
        }
    }

    function handleDelete(){
        try{
            dispatch(actions.FUNCIONARIO_DELETAR_REQUEST({id: props.route.params.funcionario.id}));
            dispatch(actions.FUNCIONARIO_BUSCAR_REQUEST());
            navigation.goBack();
        }catch(err){
            console.log(err)
            alert(err)
        }
    }

    const user = useSelector(state => state.authreducer.user);
    const navigation = useNavigation();
    const [nome, setNome] = React.useState(props.route.params.funcionario.nome);
    const [cpf, setCpf] = React.useState(props.route.params.funcionario.cpf);
    const [email, setEmail] = React.useState(props.route.params.funcionario.email);
    const [dtnasc, setDtnasc] = React.useState(new Date(props.route.params.funcionario.dtnasc) ?? new Date());
    const [telefone, setTelefone] =  React.useState(props.route.params.funcionario.telefone);
    const [nivel, setNivel] =  React.useState(props.route.params.funcionario.nivel);
    const [cargo, setCargo] = React.useState(props.route.params.funcionario.id_cargo);
    const [setor, setSetor] = React.useState(props.route.params.funcionario.setor);
    const [showDateTime, setShowDateTime] = React.useState(false);

    return (
            <ScrollView>
                <View>
                    <TextStyled>Nome</TextStyled>
                    <TextInputStyled value={nome} onChangeText={(dados) => setNome(dados)}></TextInputStyled>
                </View>

                <View>
                    <TextStyled>cpf</TextStyled>
                    <TextInputStyled value={cpf} onChangeText={(dados) => setCpf(dados)}></TextInputStyled>
                </View>
                <View> 
                    <TextStyled>Email</TextStyled>
                    <TextInputStyled value={email} onChangeText={(dados) => setEmail(dados)}></TextInputStyled>
                </View> 
                <View style={styles.containerDate}>
                    <TextStyled>Data de nascimento</TextStyled>
                    <TextInput style={styles.inputDate}>{dtnasc.toLocaleDateString('pt-BR')}</TextInput>
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
                    <DropDownSetor onSelected={setSetor} defaultValue={setor}></DropDownSetor>
                </View> 
                <View> 
                    <TextStyled>Cargo</TextStyled>
                    <DropDownCargo onSelected={setCargo} defaultValue={cargo}></DropDownCargo>
                </View>


                <Button title="Editar" onPress={(e) => handleSubmit(e)}></Button>
                <Button title="Deletar" onPress={() => handleDelete()}></Button>
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
