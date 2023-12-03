import React from "react";
import { View, TextInput, Button, Text, StyleSheet, ScrollView, TouchableOpacity, NativeModules, Modal, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/chamadosreducer/actions';
import * as actionsFuncionario from '../../store/modules/funcionarioreducer/actions';
import * as actionsChats from '../../store/modules/ChatsReducer/actions';
import DropDown from "../../components/DropDownStatus";
import DropDownCategorias from "../../components/DropDownCategorias";
import DropDownSetor from "../../components/DropDownSetor";
import { TextStyled, ContainerEdit, TextInputStyled } from "./styled";
import IconAnt from 'react-native-vector-icons/AntDesign';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Iconion from 'react-native-vector-icons/Ionicons';
import IconEnt from 'react-native-vector-icons/Entypo';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { ApiPort, baseURL, SocketPort } from "../../services/config";
import { azulmaisclaro } from "../../config/colors";

export default function EditarChamado(props){

    const dispatch = useDispatch();

    const handleDelete = (id)  => {
        try{
            dispatch(actions.DELETAR_CHAMADO_REQUEST({id: id}));
            dispatch(actions.EXEC_PROCEDURE_REQUEST({query: 'call CountChamados();'}));
            dispatch(actions.CHAMADOSREQUEST({filter: `id_funcionario_criador+eq+${user.user.id}`}));
            navigation.navigate("ChamadosStack", {screen: "ChamadoList", params: {user: user}})
        }catch(err){
            console.log(err)
            alert(err)
        }
    }

    function handleSaveFiles(files){
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
                                let id_chamado = props.route.params.chamado.id;
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

    async function handleSubmit(e){
        if(!causa || !operador || !descricao){
            alert("Valores não podem ser vazios");
            return
        }

        const dados = {id: props.route.params.chamado.id, causa: causa, operador: operador, descricao: descricao, id_status: status, categoria: categoria, agendamento: agendamento, setor: setor}
        const dados2 = {id: props.route.params.chamado.id, causa: causa, operador: operador, descricao: descricao, id_status: status, id_funcionario_resp: funcResp, categoria: categoria, agendamento: agendamento, setor: setor}
        

        try{
            if(funcResp){
                dispatch(actions.EDITAR_CHAMADOREQUEST(dados2))
            }else{
                dispatch(actions.EDITAR_CHAMADOREQUEST(dados))
            }
            dispatch(actions.CHAMADOSREQUEST({filter: `id_funcionario_criador+eq+${user.user.id}`}));
            dispatch(actions.EXEC_PROCEDURE_REQUEST({query: 'call CountChamados();'}));
            navigation.navigate("ChamadosStack", {screen: "ChamadoList"});
        }catch(err){
            console.log(err)
            alert(err)
        }
    }

    const handleFileSelection = async () => {
        try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles], // Defina os tipos de arquivos que deseja permitir
            allowMultiSelection: true
        });
    
        // Aqui você pode fazer algo com o arquivo selecionado, como enviá-lo para o servidor
        handleSaveFiles(res)

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

    const user = useSelector(state => state.authreducer);
    const arqs = useSelector(state => {
        try{
            return state.chamadosreducer.arquivos.result
        }catch(err){
            return state.chamadosreducer.arquivos
        }
    }).filter(file => file.id_chamado === props.route.params.chamado.id);
    const comentarios = useSelector(state => state.funcionarioreducer.comentarios)
    const navigation = useNavigation();
    const [causa, setCausa] = React.useState(props.route.params.chamado.causa);
    const [operador, setOperador] = React.useState(props.route.params.chamado.operador);
    const [descricao, setDescricao] = React.useState(props.route.params.chamado.descricao);
    const [status, setStatus] = React.useState(props.route.params.chamado.id_status);
    const [categoria, setCategoria] =  React.useState(props.route.params.chamado.categoria);
    const [funcResp, setFuncResp] = React.useState(props.route.params.chamado.id_funcionario_resp);
    const [agendamento, setAgendamento] = React.useState(new Date(props.route.params.chamado.agendamento));
    const [showDateTime, setShowDateTime] = React.useState(false);
    const [setor, setSetor] = React.useState(props.route.params.chamado.setor);
    const [showComments, setShowComments] = React.useState(false);
    const [modalComentario, showModalComentario] = React.useState(false);
    const [comentarioSelecionado, setComentarioSelecionado] = React.useState({});
    const [novoComentario, setNovoComentario] = React.useState("");
    const serverUrl = `http://${baseURL}:${ApiPort}/download/`

    const handleOpenFile = (file) => {
        const { FileToolsModule } = NativeModules;
        const url = RNFS.ExternalDirectoryPath + "/" + file.originalname
        FileToolsModule.openFile(url, file.mime_type)
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(url)
            FileToolsModule.downloadFile(serverUrl, url, {'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`}, JSON.stringify({originalname: file.originalname, filename: file.filename}), "POST")
            .then(response => {
                FileToolsModule.openFile(url, file.mime_type)
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err)
                })
            })
            .catch(err => console.log(err))
        })
    }

    const handleShareFile = (file) => {
        const { FileToolsModule } = NativeModules
        FileToolsModule.shareFiles([RNFS.ExternalDirectoryPath + "/" + file.originalname], [file.mime_type], "")
        .then(response => {
          console.log(response);
        })
        .catch(err => console.log(err));   
    }

    React.useEffect(() => {
        dispatch(actionsFuncionario.COMENTARIO_BUSCAR_REQUEST({filter: 'id_chamado+eq+'+props.route.params.chamado.id}));
        dispatch(actions.ARQUIVO_BUSCAR_REQUEST({filter: 'id_chamado+eq+'+props.route.params.chamado.id}));
    }, []);

    return (
        <>
            <ScrollView>
                <View>
                    <TextStyled>Causa</TextStyled>
                    <TextInputStyled value={causa} onChangeText={(dados) => setCausa(dados)}></TextInputStyled>
                </View>

                <View>
                    <TextStyled>Operador</TextStyled>
                    <TextInputStyled value={operador} onChangeText={(dados) => setOperador(dados)}></TextInputStyled>
                </View>

                <View style={styles.containerDate}>
                    <TextStyled>Agendado:</TextStyled>
                    <TextInput style={styles.inputDate}>{agendamento.toLocaleDateString('pt-BR')}</TextInput>
                    <IconAnt name="select1" color="#000" size={25} onPress={() => setShowDateTime(true)} />
                        {showDateTime && (
                            <RNDateTimePicker
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
                    <TextInputStyled value={descricao} onChangeText={(dados) => setDescricao(dados)} defaultValue={descricao}></TextInputStyled>
                </View>

                <View>
                    <TextStyled>Status</TextStyled>
                    <DropDown onSelected={setStatus} defaultValue={status}></DropDown>
                </View>

                <View>
                    <TextStyled>Tipo do Categoria</TextStyled>
                    <DropDownCategorias onSelected={setCategoria} defaultValue={categoria}></DropDownCategorias>
                </View>
                
                <View>
                    <TextStyled>Setor</TextStyled>
                    <DropDownSetor onSelected={setSetor} defaultValue={setor}></DropDownSetor>
                </View>
                <View style={styles.viewAnexo}>
                    <ScrollView>
                        {arqs ? arqs.map(file => (
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} key={generateRandomInteger(1, 100000)}>
                                <TouchableOpacity style={{width: '70%'}} onPress={() => handleOpenFile(file)}>
                                    <TextInput style={styles.namefile} editable={false} >{file.originalname}</TextInput>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleShareFile(file)} style={styles.botaoAnexo}> 
                                    <Iconion name="share-social-sharp" size={30} color="#fff"></Iconion>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => dispatch(actions.ARQUIVO_DELETAR_REQUEST({id: file.id}))} style={styles.botaoAnexo}> 
                                    <Iconion name="trash" size={30} color="#fff"></Iconion>
                                </TouchableOpacity>
                            </View>
                        )): null}
                    </ScrollView>
                    <TouchableOpacity style={styles.botaoAnexo} onPress={() => handleFileSelection()}>
                        <Iconion name="ios-attach-outline" color="#fff" size={30}></Iconion>
                    </TouchableOpacity>
                </View>


                <View style={{width: 'auto'}}>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                        <TouchableOpacity style={[styles.labelComentarios, { flex: 1 }]} onPress={() => setShowComments(!showComments)}>
                            <Text style={{ color: 'white', fontSize: 14, textAlign: 'center', fontWeight: 'bold' }}>Comentarios</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            showModalComentario(!modalComentario);
                        }}>
                            <IconAnt name="pluscircle" color="#000" size={35}></IconAnt>
                        </TouchableOpacity>
                    </View>
                    {showComments ? 
                        <View style={styles.comentarios}>
                            {comentarios ? comentarios.result.map(co => {
                                return ( 
                                    <View key={comentarios.result.indexOf(co)}>
                                        <View style={styles.botoesComentarios}>
                                            <TouchableOpacity onPress={() => {
                                                setComentarioSelecionado(co);
                                                showModalComentario(!modalComentario);
                                            }}>
                                                <IconAnt name="edit" color="#000" size={30}></IconAnt>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {
                                                dispatch(actionsFuncionario.COMENTARIO_DELETAR_REQUEST({id: co.id}));
                                            }}>
                                                <IconEnt name="trash" color="#000" size={30}></IconEnt>
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.itemComentario}>{co.conteudo}</Text>
                                    </View>
                                 );
                            }): null}
                        </View>
                    : null}
                {modalComentario ? 
                    <Modal visible={modalComentario} transparent={true} animationType="fade">
                        <TouchableWithoutFeedback onPress={() => {
                            showModalComentario(false)
                        }}>
                            <View style={styles.overlay} />
                        </TouchableWithoutFeedback>
                        <View style={styles.containerMes}>
                            <TextInput
                            style={styles.inputMakeDir} 
                            value={Object.keys(comentarioSelecionado).length > 0 ? comentarioSelecionado.conteudo:novoComentario}
                            autoFocus={true}
                            numberOfLines={3}
                            multiline
                            onChangeText={(txt) => {
                                if(Object.keys(comentarioSelecionado).length > 0){
                                    setComentarioSelecionado({...comentarioSelecionado, conteudo: txt})
                                }else{
                                    setNovoComentario(txt)
                                }
                            }}
                            />
                            <Button title={Object.keys(comentarioSelecionado).length ? 'Editar':'Criar'} onPress={() => {
                                if(Object.keys(comentarioSelecionado).length > 0){
                                    dispatch(actionsFuncionario.COMENTARIO_EDITAR_REQUEST(comentarioSelecionado))
                                }else{
                                    dispatch(actionsFuncionario.COMENTARIO_CRIAR_REQUEST({conteudo: novoComentario, id_chamado: props.route.params.chamado.id, id_funcionario_criador: user.user.id}));
                                }
                                showModalComentario(false);
                                setNovoComentario("");
                                setComentarioSelecionado({});
                            }}></Button>
                        </View>
                    </Modal>:
                    null}
                </View>
                {user.user.id !== props.route.params.chamado.id_funcionario_criador ? 
                    <Button title="Responsabilizar-se" onPress={() => {
                        alert("Sucesso");
                        setFuncResp(user.user.id);
                        dispatch(actions.EDITAR_CHAMADOREQUEST({id: props.route.params.chamado.id, id_funcionario_resp: user.user.id}));
                        dispatch(actionsChats.CRIAR_USER_REQUEST({iduser: user.user.id, nome: user.user.nome, idchat: props.route.params.chamado.id}));
                    }}>Responsabilizar-se</Button>:null
                }
                <View>
                    <Button title="Salvar" onPress={() => handleSubmit()}></Button>
                    <Button title="Deletar" onPress={() => handleDelete(props.route.params.chamado.id)}></Button>
                    <Button title="Voltar" onPress={(e) => navigation.goBack()}></Button>
                </View>
            </ScrollView>
        </> 
    );
}

const styles = StyleSheet.create({  
    container: {
        flex: 1,
        display: "flex",
        alignContent: "flex-start",
        justifyContent: 'space-between',
        flexDirection: 'column',
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
    },
    comentarios: {
        flex: 1
    },
    labelComentarios: {
        backgroundColor: azulmaisclaro,
        borderRadius: 10,
        padding: 5,
        height: 40,
    },
    itemComentario: {
        textAlign: 'center',
        fontSize: 17,
        color: 'black'
    },
    botoesComentarios: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: "flex-end",
        flexDirection: 'row',
        width: 'auto'
    },
    overlay: {
        flex: 1,
    },
    containerMes: {
        backgroundColor: '#fff',
        padding: 16,
        margin: 32,
        borderRadius: 8,
        maxHeight: 250,
        height: 150
    },
    inputMakeDir: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 16,
        color: 'black',
        flexWrap: 'wrap',
        minHeight: 50,
        maxHeight: 200
    },
}) 
 