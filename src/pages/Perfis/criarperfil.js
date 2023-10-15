import React from "react";
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/funcionarioreducer/actions';
import Checkbox from "../../components/CheckBox";
import { azulmaisclaro, white } from "../../config/colors";

export default function CriarPerfil(props){
    const dispatch = useDispatch();
    const initialState = {
        create_empresa: false,
        update_empresa: false,
        delete_empresa: false,
        view_empresa: false,
        section_empresa: false,
        create_funcionario: false,
        update_funcionario: false,
        delete_funcionario: false,
        view_funcionario: false,
        section_funcionario: false,
        create_chamado: false,
        update_chamado: false,
        delete_chamado: false,
        view_chamado: false,
        section_chamado: false,
        create_chat: false,
        update_chat: false,
        delete_chat: false,
        view_chat: false,
        section_chat: false,
        create_arquivo: false,
        update_arquivo: false,
        delete_arquivo: false,
        view_arquivo: false,
        section_arquivo: false,
        create_cargo: false,
        update_cargo: false,
        delete_cargo: false,
        view_cargo: false,
        section_cargo: false,
        create_categoria: false,
        update_categoria: false,
        delete_categoria: false,
        view_categoria: false,
        section_categoria: false,
        create_subcategoria: false,
        update_subcategoria: false,
        delete_subcategoria: false,
        view_subcategoria: false,
        section_subcategoria: false,
        create_comentario: false,
        update_comentario: false,
        delete_comentario: false,
        view_comentario: false,
        section_comentario: false,
        create_filial: false,
        update_filial: false,
        delete_filial: false,
        view_filial: false,
        section_filial: false,
        create_perfil: false,
        update_perfil: false,
        delete_perfil: false,
        view_perfil: false,
        section_perfil: false,
        create_setores: false,
        update_setores: false,
        delete_setores: false,
        view_setores: false,
        section_setores: false,
        create_status: false,
        update_status: false,
        delete_status: false,
        view_status: false,
        section_status: false,
        nome: ""
    };

    function handleSubmit(e){
        try{
            dispatch(actions.PERFIL_CRIAR_REQUEST(permissions));
            dispatch(actions.PERFIL_BUSCAR_REQUEST());
            navigation.goBack();
        }catch(err){
            console.log(err)
            alert(err)
        }
    }

    const user = useSelector(state => state.authreducer.user);
    const navigation = useNavigation();
    const [permissions, setPermissions] = React.useState(initialState);

    return (
        <>
            <ScrollView>
                <View>
                    <Text style={styles.textStyled}>Nome</Text>
                    <TextInput style={{color: "black"}} value={permissions.nome} onChangeText={(dados) => setPermissions({...permissions, nome: dados})}></TextInput>
                </View>
                <View>
                    <TouchableOpacity onPress={() => setPermissions({...permissions, section_empresa: !permissions.section_empresa})} style={styles.section}>
                        <Text style={styles.textSection}>Empresa</Text>
                    </TouchableOpacity>
                    {permissions.section_empresa ? 
                    <>
                        <View>
                            <Text style={styles.textStyled}>Pode cadastrar as empresas?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, create_empresa: check})} initialValue={permissions.create_empresa} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode editar as empresas?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, update_empresa: check})} initialValue={permissions.update_empresa} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode deletar as empresas?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, delete_empresa: check})} initialValue={permissions.delete_empresa} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode ver as empresas?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, view_empresa: check})} initialValue={permissions.view_empresa} color="black"></Checkbox>
                        </View>
                    </>
                    :
                    null}
                </View>
                <View>
                    <TouchableOpacity onPress={() => setPermissions({...permissions, section_funcionario: !permissions.section_funcionario})} style={styles.section}>
                        <Text style={styles.textSection}>Funcionario</Text>
                    </TouchableOpacity>
                    {permissions.section_funcionario ? 
                    <>
                        <View>
                            <Text style={styles.textStyled}>Pode cadastrar os funcionarios?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, create_funcionario: check})} initialValue={permissions.create_funcionario} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode editar os funcionarios?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, update_funcionario: check})} initialValue={permissions.update_funcionario} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode deletar os funcionarios?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, delete_funcionario: check})} initialValue={permissions.delete_funcionario} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode ver os funcionarios?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, view_funcionario: check})} initialValue={permissions.view_funcionario} color="black"></Checkbox>
                        </View>
                    </>
                    :
                    null}
                </View>
                <View>
                    <TouchableOpacity onPress={() => setPermissions({...permissions, section_chamado: !permissions.section_chamado})} style={styles.section}>
                        <Text style={styles.textSection}>Chamados</Text>
                    </TouchableOpacity>
                    {permissions.section_chamado ? 
                    <>
                        <View>
                            <Text style={styles.textStyled}>Pode cadastrar os chamados?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, create_chamado: check})} initialValue={permissions.create_chamado} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode editar os chamados?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, update_chamado: check})} initialValue={permissions.update_chamado} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode deletar os chamados?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, delete_chamado: check})} initialValue={permissions.delete_chamado} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode ver os chamados?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, view_chamado: check})} initialValue={permissions.view_chamado} color="black"></Checkbox>
                        </View>
                    </>
                    :
                    null}
                </View>
                <View>
                    <TouchableOpacity onPress={() => setPermissions({...permissions, section_chat: !permissions.section_chat})} style={styles.section}>
                        <Text style={styles.textSection}>Chats</Text>
                    </TouchableOpacity>
                    {permissions.section_chat ? 
                    <>
                        <View>
                            <Text style={styles.textStyled}>Pode cadastrar os chats?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, create_chat: check})} initialValue={permissions.create_chat} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode editar os chats?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, update_chat: check})} initialValue={permissions.update_chat} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode deletar os chats?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, delete_chat: check})} initialValue={permissions.delete_chat} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode ver os chats?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, view_chat: check})} initialValue={permissions.view_chat} color="black"></Checkbox>
                        </View>
                    </>
                    :
                    null}
                </View>
                <View>
                    <TouchableOpacity onPress={() => setPermissions({...permissions, section_arquivo: !permissions.section_arquivo})} style={styles.section}>
                        <Text style={styles.textSection}>Arquivos</Text>
                    </TouchableOpacity>
                    {permissions.section_arquivo ? 
                    <>
                        <View>
                            <Text style={styles.textStyled}>Pode cadastrar os arquivos?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, create_arquivo: check})} initialValue={permissions.create_arquivo} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode editar os arquivos?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, update_arquivo: check})} initialValue={permissions.update_arquivo} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode deletar os arquivos?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, delete_arquivo: check})} initialValue={permissions.delete_arquivo} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode ver os arquivos?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, view_arquivo: check})} initialValue={permissions.view_arquivo} color="black"></Checkbox>
                        </View>
                    </>
                    :
                    null}
                </View>
                <View>
                    <TouchableOpacity onPress={() => setPermissions({...permissions, section_cargo: !permissions.section_cargo})} style={styles.section}>
                        <Text style={styles.textSection}>Cargos</Text>
                    </TouchableOpacity>
                    {permissions.section_cargo ? 
                    <>
                        <View>
                            <Text style={styles.textStyled}>Pode cadastrar os cargos?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, create_cargo: check})} initialValue={permissions.create_cargo} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode editar os cargos?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, update_cargo: check})} initialValue={permissions.update_cargo} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode deletar os cargos?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, delete_cargo: check})} initialValue={permissions.delete_cargo} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode ver os cargos?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, view_cargo: check})} initialValue={permissions.view_cargo} color="black"></Checkbox>
                        </View>
                    </>
                    :
                    null}
                </View>
                <View>
                    <TouchableOpacity onPress={() => setPermissions({...permissions, section_categoria: !permissions.section_categoria})} style={styles.section}>
                        <Text style={styles.textSection}>Categorias</Text>
                    </TouchableOpacity>
                    {permissions.section_categoria ? 
                    <>
                        <View>
                            <Text style={styles.textStyled}>Pode cadastrar as categorias?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, create_categoria: check})} initialValue={permissions.create_categoria} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode editar as categorias?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, update_categoria: check})} initialValue={permissions.update_categoria} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode deletar as categorias?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, delete_categoria: check})} initialValue={permissions.delete_categoria} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode ver as categorias?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, view_categoria: check})} initialValue={permissions.view_categoria} color="black"></Checkbox>
                        </View>
                    </>
                    :
                    null}
                </View>
                <View>
                    <TouchableOpacity onPress={() => setPermissions({...permissions, section_subcategoria: !permissions.section_subcategoria})} style={styles.section}>
                        <Text style={styles.textSection}>Subsubcategorias</Text>
                    </TouchableOpacity>
                    {permissions.section_subcategoria ? 
                    <>
                        <View>
                            <Text style={styles.textStyled}>Pode cadastrar as subcategorias?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, create_subcategoria: check})} initialValue={permissions.create_subcategoria} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode editar as subcategorias?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, update_subcategoria: check})} initialValue={permissions.update_subcategoria} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode deletar as subcategorias?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, delete_subcategoria: check})} initialValue={permissions.delete_subcategoria} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode ver as subcategorias?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, view_subcategoria: check})} initialValue={permissions.view_subcategoria} color="black"></Checkbox>
                        </View>
                    </>
                    :
                    null}
                </View>
                <View>
                    <TouchableOpacity onPress={() => setPermissions({...permissions, section_comentario: !permissions.section_comentario})} style={styles.section}>
                        <Text style={styles.textSection}>Comentarios</Text>
                    </TouchableOpacity>
                    {permissions.section_comentario ? 
                    <>
                        <View>
                            <Text style={styles.textStyled}>Pode cadastrar os comentarios?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, create_comentario: check})} initialValue={permissions.create_comentario} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode editar os comentarios?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, update_comentario: check})} initialValue={permissions.update_comentario} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode deletar os comentarios?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, delete_comentario: check})} initialValue={permissions.delete_comentario} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode ver os comentarios?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, view_comentario: check})} initialValue={permissions.view_comentario} color="black"></Checkbox>
                        </View>
                    </>
                    :
                    null}
                </View>
                <View>
                    <TouchableOpacity onPress={() => setPermissions({...permissions, section_filial: !permissions.section_filial})} style={styles.section}>
                        <Text style={styles.textSection}>Filiaís</Text>
                    </TouchableOpacity>
                    {permissions.section_filial ? 
                    <>
                        <View>
                            <Text style={styles.textStyled}>Pode cadastrar as filials?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, create_filial: check})} initialValue={permissions.create_filial} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode editar as filials?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, update_filial: check})} initialValue={permissions.update_filial} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode deletar as filials?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, delete_filial: check})} initialValue={permissions.delete_filial} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode ver as filials?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, view_filial: check})} initialValue={permissions.view_filial} color="black"></Checkbox>
                        </View>
                    </>
                    :
                    null}
                </View>
                <View>
                    <TouchableOpacity onPress={() => setPermissions({...permissions, section_perfil: !permissions.section_perfil})} style={styles.section}>
                        <Text style={styles.textSection}>Perfís</Text>
                    </TouchableOpacity>
                    {permissions.section_perfil ? 
                    <>
                        <View>
                            <Text style={styles.textStyled}>Pode cadastrar os perfís?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, create_perfil: check})} initialValue={permissions.create_perfil} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode editar os perfís?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, update_perfil: check})} initialValue={permissions.update_perfil} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode deletar os perfís?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, delete_perfil: check})} initialValue={permissions.delete_perfil} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode ver os perfís?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, view_perfil: check})} initialValue={permissions.view_perfil} color="black"></Checkbox>
                        </View>
                    </>
                    :
                    null}
                </View>
                <View>
                    <TouchableOpacity onPress={() => setPermissions({...permissions, section_setores: !permissions.section_setores})} style={styles.section}>
                        <Text style={styles.textSection}>Setores</Text>
                    </TouchableOpacity>
                    {permissions.section_setores ? 
                    <>
                        <View>
                            <Text style={styles.textStyled}>Pode cadastrar os perfís?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, create_setores: check})} initialValue={permissions.create_setores} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode editar os perfís?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, update_setores: check})} initialValue={permissions.update_setores} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode deletar os perfís?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, delete_setores: check})} initialValue={permissions.delete_setores} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode ver os perfís?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, view_setores: check})} initialValue={permissions.view_setores} color="black"></Checkbox>
                        </View>
                    </>
                    :
                    null}
                </View>
                <View>
                    <TouchableOpacity onPress={() => setPermissions({...permissions, section_status: !permissions.section_status})} style={styles.section}>
                        <Text style={styles.textSection}>Status</Text>
                    </TouchableOpacity>
                    {permissions.section_status ? 
                    <>
                        <View>
                            <Text style={styles.textStyled}>Pode cadastrar os perfís?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, create_status: check})} initialValue={permissions.create_status} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode editar os perfís?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, update_status: check})} initialValue={permissions.update_status} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode deletar os perfís?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, delete_status: check})} initialValue={permissions.delete_status} color="black"></Checkbox>
                        </View>
                        <View>
                            <Text style={styles.textStyled}>Pode ver os perfís?</Text>
                            <Checkbox labelTrue="Sim" labelFalse="Não" fontSize={18} size={30} type="toggle" onChangeCheck={(check) => setPermissions({...permissions, view_status: check})} initialValue={permissions.view_status} color="black"></Checkbox>
                        </View>
                    </>
                    :
                    null}
                </View>
                <Button title="Criar" onPress={(e) => handleSubmit(e)}></Button>
                <Button title="Voltar" onPress={(e) => navigation.goBack()}></Button>
            </ScrollView>
        </>
    );
}


const styles = StyleSheet.create({
    textStyled: {
        color: 'black',
        fontSize: 14
    },
    section: {
        width: '100%',
        height: 40,
        backgroundColor: azulmaisclaro,
        borderRadius: 10,
        padding:  10,
    },
    textSection: {
        color: white,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
