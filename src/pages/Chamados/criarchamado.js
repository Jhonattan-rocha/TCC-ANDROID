import React from "react";
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, NativeModules, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { azulmaisclaro } from "../../config/colors";
import * as actions from '../../store/modules/chamadosreducer/actions';
import DropDown from "../../components/DropDownStatus";
import DropDownCategorias from "../../components/DropDownCategorias";
import DropDownSetor from "../../components/DropDownSetor";
import { TextStyled, TextInputStyled } from "./styled";
import RNDateTimePiker from '@react-native-community/datetimepicker';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Iconion from 'react-native-vector-icons/Ionicons';
import IconEnt from 'react-native-vector-icons/Entypo';
import DocumentPicker from "react-native-document-picker";
import RNFS from 'react-native-fs';


export default function CriarChamado(props){
    const dispatch = useDispatch();

    async function handleSubmit(e){
        if(!causa || !operador || !descricao){
            alert("Valores não podem ser vazios");
            return
        }

        const dados = {causa: causa, operador: operador, descricao: descricao, id_status: status, id_funcionario_criador: user.id, categoria: categoria, agendamento: agendamento, setor: setor, anexos: files, comentarios: comentarios}
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
            type: [DocumentPicker.types.allFiles], 
        });

        let originalname = res[0].name;
        let filename = Date.now() + "_" + user.id + "_" + originalname;
        let id_dono = user.id;
        let mime_type = res[0].type;
        let url = RNFS.ExternalDirectoryPath + "/" + res[0].name;
        let file = res[0]
        let dados = {originalname: originalname, filename: filename, id_dono: id_dono, mime_type: mime_type, id_chamado: 0, url: url, file: file};
        setFiles([...files, dados]);

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
        const url = RNFS.ExternalDirectoryPath + "/" + file.filename
        RNFS.copyFile(file.file.uri, url)
        .then(response => {
            FileToolsModule.openFile(url, file.mime_type)
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            }); 
        })
        .catch(err => console.log(err)); 
    }

    const handleShareFile = (file) => {
        const { FileToolsModule } = NativeModules
        RNFS.copyFile(file.file.uri, RNFS.ExternalDirectoryPath + "/" + file.filename)
        .then(response => {
            FileToolsModule.shareFiles([RNFS.ExternalDirectoryPath + "/" + file.filename], [file.mime_type], "")
            .then(response => {
                onsole.log(response);
            })
            .catch(err => console.log(err));  
        })
        .catch(err => console.log(err)); 
    }

    const user = useSelector(state => state.authreducer.user);
    const navigation = useNavigation();
    const [causa, setCausa] = React.useState("");
    const [operador, setOperador] = React.useState("");
    const [descricao, setDescricao] = React.useState("");
    const [status, setStatus] = React.useState();
    const [categoria, setCategoria] =  React.useState("");
    const [agendamento, setAgendamento] = React.useState(new Date());
    const [showDateTime, setShowDateTime] = React.useState(false);
    const [setor, setSetor] = React.useState();
    const [files, setFiles] = React.useState([]);
    const [comentarios, setComentarios] = React.useState([]);
    const [novoComentario, setNovoComentario] = React.useState({});
    const [showComments, setShowComments] = React.useState(false);
    const [modalComentario, showModalComentario] = React.useState(false);
    
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
                                    <TextInput style={styles.namefile} editable={false} >{file.filename}</TextInput>
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
                            {comentarios.length > 0 && comentarios.map(co => {
                                return ( 
                                    <View key={comentarios.indexOf(co)}>
                                        <Text style={styles.itemComentario}>{co}</Text>
                                    </View>
                                 );
                            })}
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
                            value={novoComentario}
                            autoFocus={true}
                            numberOfLines={3}
                            multiline
                            onChangeText={(txt) => {
                                setNovoComentario(txt);
                            }}
                            />
                            <Button title={'Criar'} onPress={() => {
                                setComentarios([...comentarios, novoComentario])
                                showModalComentario(false);
                                setNovoComentario("");
                            }}></Button>
                        </View>
                    </Modal>:
                    null}
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
        color: 'black',
        height: 40
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
});
