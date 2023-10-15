import React from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/chamadosreducer/actions';
import { TextStyled } from "./styled";
import IconFntEl from 'react-native-vector-icons/FontAwesome'
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconIn from 'react-native-vector-icons/Ionicons';
import IconMatrial from 'react-native-vector-icons/MaterialCommunityIcons';
import { azulclaro } from "../../config/colors";


function HomeChamados(){

  const navigation = useNavigation();
  const user = useSelector(state => state.authreducer) || [];
  const dispatch = useDispatch();

  React.useEffect(() =>{
    try{
      dispatch(actions.CHAMADOSREQUEST({filter: `id_funcionario_criador+eq+${user.user.id}`}));
      dispatch(actions.STATUS_REQUEST());
      dispatch(actions.CATEGORIAS_REQUEST());
      dispatch(actions.SUBCATEGORIAS_REQUEST());
      dispatch(actions.EXEC_PROCEDURE_REQUEST({query: 'call CountChamados();'}));
    }catch(err){
      alert(err.toString());
    }
  }, [])

  return (
    // horizontal para a lista ser para a horizontal, padrão false
    // flatlist só ocupa espaço de apresentação na tela, o que estiver escondido ele não renderiza 
    <View>
          <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} scrollEnabled={true}>
            <View style={styles.container}>
                <TouchableOpacity onPress={(e) => navigation.navigate("ChamadosStack", {screen: "ChamadoList"})} style={styles.botao}>
                  <IconFntEl color="#000" size={30} name="calendar"></IconFntEl>
                  <TextStyled>Calendario</TextStyled>
                </TouchableOpacity>
                <TouchableOpacity onPress={(e) => navigation.navigate("ChamadosStack", {screen: "EscolherChamado"})} style={styles.botao}>
                  <IconAnt color="#000" size={30} name="linechart"></IconAnt>
                  <TextStyled>Status</TextStyled>
                </TouchableOpacity>
                <TouchableOpacity onPress={(e) => navigation.navigate("ChamadosStack", {screen: "EscolherSetor"})} style={styles.botao}>
                  <IconIn color="#000" size={30} name="pie-chart-sharp"></IconIn>
                  <TextStyled>Setores</TextStyled>
                </TouchableOpacity>
                <TouchableOpacity onPress={(e) => navigation.navigate("ChamadosStack", {screen: "EscolherCategoria"})} style={styles.botao}>
                  <IconIn color="#000" size={30} name="reorder-three-sharp"></IconIn>
                  <TextStyled>Categorias</TextStyled>
                  </TouchableOpacity>
                <TouchableOpacity onPress={(e) => navigation.navigate("ChamadosStack", {screen: "EscolherSubCategoria"})} style={styles.botao}>
                  <IconIn color="#000" size={30} name="reorder-two"></IconIn>
                  <TextStyled>Subcategorias</TextStyled>
                  </TouchableOpacity>
                <TouchableOpacity onPress={(e) => navigation.navigate("ChamadosStack", {screen: "StatusCad"})} style={styles.botao}>
                  <IconMatrial color="#000" size={30} name="chart-box-plus-outline"></IconMatrial>
                  <TextStyled>Adicionar Status</TextStyled>
                  </TouchableOpacity>
                <TouchableOpacity  onPress={(e) => navigation.navigate("ChamadosStack", {screen: "ChamadoCad", params: {user: user}})} style={styles.botao}>
                  <IconFntEl color="#000" size={30} name="calendar-plus-o"></IconFntEl>
                  <TextStyled>Adicionar Chamado</TextStyled>
                  </TouchableOpacity>
                <TouchableOpacity  onPress={(e) => navigation.navigate("ChamadosStack", {screen: "CategoriaCriar", params: {user: user}})} style={styles.botao}>
                  <IconMatrial color="#000" size={30} name="book-plus"></IconMatrial>
                  <TextStyled>Adicionar Categoria</TextStyled>
                  </TouchableOpacity>
                <TouchableOpacity  onPress={(e) => navigation.navigate("ChamadosStack", {screen: "SubCategoriaCriar", params: {user: user}})} style={styles.botao}>
                  <IconMatrial color="#000" size={30} name="book-plus-multiple-outline"></IconMatrial>
                  <TextStyled>Adicionar SubCategoria</TextStyled>
                </TouchableOpacity>
                {/* -------------------------------------- */}
                <TouchableOpacity  onPress={(e) => navigation.navigate("ChamadosStack", {screen: "Tree", params: {user: user}})} style={styles.botao}>
                  <IconFntEl color="#000" size={30} name="files-o"></IconFntEl>
                  <TextStyled>Arquivos do sistema</TextStyled>
                </TouchableOpacity>
            </View>
          </ScrollView>
    </View>
  );
}

// crirar planilhas de estilo para reutilizar
// envolvendo os estilos em [] ele rescebe mais de um
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    flexWrap: 'wrap',
  },
  input: {
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#222",
    padding: 20,
    margin: 10,
    fontSize: 20
  },
  text: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    margin: 10
  },
  botoes: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1 
  },
  botao: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: 'black',
    fontWeight: "bold",
    minHeight: 70,
    minWidth: 90,
    borderRadius: 40,
    margin: 30
  }
}); 

export default HomeChamados;