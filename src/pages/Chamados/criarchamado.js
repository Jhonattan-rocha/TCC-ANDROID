import React from "react";
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, NativeModules } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/chamadosreducer/actions';
import DropDown from "../../components/DropDownStatus";
import DropDownCategorias from "../../components/DropDownCategorias";
import DropDownSetor from "../../components/DropDownSetor";
import { TextStyled, TextInputStyled } from "./styled";
import RNDateTimePiker from '@react-native-community/datetimepicker';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Iconion from 'react-native-vector-icons/Ionicons';
import DocumentPicker from "react-native-document-picker";
import RNFS from 'react-native-fs';


export default function CriarChamado(props){
    const dispatch = useDispatch();

    async function handleSubmit(e){
        if(!causa || !operador || !descricao){
            alert("Valores não podem ser vazios");
            return
        }

        const dados = {causa: causa, operador: operador, descricao: descricao, id_status: status, id_funcionario_criador: user.id, categoria: categoria, agendamento: agendamento, setor: setor, files: files, saveFiles: handleSaveFiles}
        try{
            dispatch(actions.ChamadoRequest(dados));
            dispatch(actions.EXEC_PROCEDURE_REQUEST({query: 'call CountChamados();'}));
            navigation.goBack();
        }catch(err){
            console.log(err)
            alert(err)
        }
    }

    const handleFileSelection = async () => {
        try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles], // Defina os tipos de arquivos que deseja permitir
        });
    
        // Aqui você pode fazer algo com o arquivo selecionado, como enviá-lo para o servidor
        setFiles(res)
        } catch (error) {
        // Lidar com erros de seleção de arquivo
        console.log('Erro ao selecionar arquivo:', error);
        }
    };

    const generateRandomInteger = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleOpenFile = (file) => {
        const { FileToolsModule } = NativeModules;
        const url = RNFS.ExternalDirectoryPath + "/" + file.name
        FileToolsModule.openFile(url, file.type)
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        });
    }

    const handleShareFile = (file) => {
        const { FileToolsModule } = NativeModules
        RNFS.copyFile(file.uri, RNFS.ExternalDirectoryPath + "/" + file.name)
        .then(response => {
            FileToolsModule.shareFiles([RNFS.ExternalDirectoryPath + "/" + file.name], [file.type], "")
            .then(response => {
                onsole.log(response);
            })
            .catch(err => console.log(err));  
        })
        .catch(err => console.log(err)); 
    }

    function handleSaveFiles(files, id, user){
        try{
            files.forEach(async file => {
                RNFS.copyFile(file.uri, RNFS.ExternalDirectoryPath + "/" + file.name)
                .then(response => {
                    RNFS.exists(RNFS.ExternalDirectoryPath + "/" + file.name)
                    .then(response => { 
                        if(response){
                            RNFS.readFile(RNFS.ExternalDirectoryPath + "/" + file.name, 'base64')
                            .then(response => {
                                bytes = response
                                let originalname = file.name;
                                let filename = Date.now() + "_" + user.user.id + "_" + originalname;
                                let id_dono = user.user.id;
                                let id_empresa_dona = user.user.id_empresa;
                                let mime_type = file.type;
                                let id_chamado = id;
                                let url = RNFS.ExternalDirectoryPath + "/" + file.name;
                                let dados = {originalname: originalname, filename: filename, id_dono: id_dono, id_empresa_dona:id_empresa_dona, mime_type: mime_type, id_chamado: id_chamado, file: file, url: url};
                                dispatch(actions.ARQUIVO_CRIAR_REQUEST(dados));
                            })
                            .catch(err => console.log(err))
                        }
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            });
            setTimeout(() => {
                dispatch(actions.ARQUIVO_BUSCAR_REQUEST());
            }, 1000);
        }catch(err){
            console.log(err)
        }
    }

    const user = useSelector(state => state.authreducer.user);
    const navigation = useNavigation();
    const [causa, setCausa] = React.useState();
    const [operador, setOperador] = React.useState();
    const [descricao, setDescricao] = React.useState();
    const [status, setStatus] = React.useState();
    const [categoria, setCategoria] =  React.useState();
    const [agendamento, setAgendamento] = React.useState(new Date());
    const [showDateTime, setShowDateTime] = React.useState(false);
    const [setor, setSetor] = React.useState();
    const [files, setFiles] = React.useState(null);

    return (
        <>
            <ScrollView>
                <View>
                    <View>
                        <TextStyled>Causa</TextStyled>
                        <TextInputStyled value={causa} onChangeText={(dados) => setCausa(dados)}></TextInputStyled>
                    </View>

                    <View>
                        <TextStyled>Operador</TextStyled>
                        <TextInputStyled value={operador} onChangeText={(dados) => setOperador(dados)}></TextInputStyled>
                    </View>
                </View>
                <View style={styles.containerDate}>
                    <TextStyled>Agendado:</TextStyled>
                    <TextInput style={styles.inputDate}>{agendamento.toLocaleDateString('pt-BR')}</TextInput>
                    <IconAnt name="select1" color="#000" size={25} onPress={() => setShowDateTime(true)} />
                        {showDateTime && (
                            <RNDateTimePiker
                            value={agendamento}
                            mode="date"
                            display="default"
                            onChange={(event, select) => {
                                if (event.type === 'set') {
                                    setShowDateTime(false);
                                    setAgendamento(select);
                                } else if (event.type === 'dismissed') {
                                    setShowDateTime(false);
                                }
                            }}
                            />
                        )}
                </View>
                <View>
                    <TextStyled>Descrição do Chamado</TextStyled>
                    <TextInputStyled value={descricao} onChangeText={(dados) => setDescricao(dados)}></TextInputStyled>
                </View>

                <View>
                    <TextStyled>Status</TextStyled>
                    <DropDown onSelected={setStatus}></DropDown>
                </View>

                <View>
                    <TextStyled>Tipo do Categoria</TextStyled>
                    <DropDownCategorias onSelected={setCategoria}></DropDownCategorias>
                </View>
                
                <View>
                    <TextStyled>Setor</TextStyled>
                    <DropDownSetor onSelected={setSetor}></DropDownSetor>
                </View>

                <View style={styles.viewAnexo}>
                    <ScrollView>
                        {files ? files.map(file => (
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} key={generateRandomInteger(1, 100000)}>
                                <TouchableOpacity style={{width: '70%'}} onPress={() => handleOpenFile(file)}>
                                    <TextInput style={styles.namefile} editable={false} >{file.name}</TextInput>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleShareFile(file)} style={styles.botaoAnexo}> 
                                    <Iconion name="share-social-sharp" size={30} color="#fff"></Iconion>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    setFiles(files.filter(file => file.uri !== file.uri))
                                }} style={styles.botaoAnexo}> 
                                    <Iconion name="trash" size={30} color="#fff"></Iconion>
                                </TouchableOpacity>
                            </View>
                        )): null}
                    </ScrollView>
                    <TouchableOpacity style={styles.botaoAnexo} onPress={() => handleFileSelection()}>
                        <Iconion name="ios-attach-outline" color="#fff" size={30}></Iconion>
                    </TouchableOpacity>
                </View>

                <Button title="Criar" onPress={(e) => handleSubmit(e)}></Button>
                <Button title="Listar Chamados" onPress={(e) => navigation.navigate("ChamadosStack", {screen: "ChamadoList", params: {user: user}})}></Button>
            </ScrollView>
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
    },
    botaoAnexo: {
        padding: 10,
        backgroundColor: "#000",
        borderRadius: 30,
        width: 50
    },
    viewAnexo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    namefile: {
        width: '100%',
        color: 'black',
        borderColor: "#000",
        borderWidth: 1, 
        borderRadius: 10,
        paddingLeft: 10
    }
});
