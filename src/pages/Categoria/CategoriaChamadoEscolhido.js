import React from 'react';
import { View, FlatList, SafeAreaView, Text, Button, TextInput } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/chamadosreducer/actions';
import { TextStyled } from './styled';

export default function ChamadoEscolhido(props){

    const navigation = useNavigation();
    const user = useSelector(state => state.authreducer);
    const dispatch = useDispatch();
    const chamadoslist = useSelector(state => state.chamadosreducer.chamados.result);
    const categoriaslist = useSelector(state => state.chamadosreducer.Categorias.result);
    const statuslist = useSelector(state => state.chamadosreducer.status.result);

    const handleUpdate = () => {
        try{
            dispatch(actions.CHAMADOSREQUEST({filter: `id_funcionario_criador+eq+${user.user.id}`}));
        }catch(err){
            console.log(err);
            alert(err.toString());
        }
    }

    const handleDelete = (id)  => {
        try{
            dispatch(actions.DELETAR_CHAMADO_REQUEST({id: id}));
            dispatch(actions.EXEC_PROCEDURE_REQUEST({query: 'call CountChamados();'}));
        }catch(err){
            console.log(err)
            alert(err)
        }
    }

    React.useEffect(()=>{
        handleUpdate();
    }, [])

    return (
        <View>
            <Text style={{color: 'black', fontSize: 14}}>{categoriaslist.map(cat => {
                if(cat.id === props.route.params.categoria){
                    return cat.nome
                }
            })}</Text>
            <SafeAreaView>
                <FlatList
                    data={chamadoslist}
                    numColumns={1}
                    inverted={true}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => {
                        if(item.categoria === props.route.params.categoria){
                            return (
                                <View>
                                    <TextStyled>Status: {statuslist.map(status => {
                                        if(status.id === item.id_status){
                                            return status.nome
                                        }
                                    })}</TextStyled>
                                    <View>
                                        <TextStyled>{item.causa}</TextStyled>
                                        <TextStyled>{item.operador}</TextStyled>
                                        <TextInput value={item.descricao}></TextInput>
                                    </View>
                                    <Button title="Editar Chamado" onPress={(e) => navigation.navigate("ChamadosStack", {screen: "ChamadoEdit", params: {user: user, chamado: item}})}></Button>
                                    <Button title="Deletar" onPress={(e) => handleDelete(item.id)}></Button>
                                </View>
                            )
                        }
                    }}>
                </FlatList>
            </SafeAreaView>
            <Button title="Voltar" onPress={(e) => navigation.goBack()}></Button>
        </View> 
    );
}
