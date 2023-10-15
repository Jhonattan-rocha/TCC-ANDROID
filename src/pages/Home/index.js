import React from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, NativeModules } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/chamadosreducer/actions';
import * as actionsEmpresa from '../../store/modules/empresareducer/actions';
import * as actionsFuncionario from '../../store/modules/funcionarioreducer/actions';
import ChartScreen from "../Charts/pieChart";
import LineChartScreen from "../Charts/lineChat";

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

function Home(){

  const navigation = useNavigation();
  const user = useSelector(state => state.authreducer) || [];
  const dispatch = useDispatch();
  const qtdchamados = useSelector(state => state.chamadosreducer.procedure.result) || [];
  let load = qtdchamados.length > 0 ? true : false;

  React.useEffect(() =>{
    try{
      dispatch(actions.CHAMADOSREQUEST({filter: `id_funcionario_criador+eq+${user.user.id}`}));
      dispatch(actions.STATUS_REQUEST());
      dispatch(actions.CATEGORIAS_REQUEST());
      dispatch(actions.EXEC_PROCEDURE_REQUEST({query: 'call CountChamados();'}));
      dispatch(actionsEmpresa.EMPRESA_BUSCAR_REQUEST());
      dispatch(actions.ARQUIVO_BUSCAR_REQUEST({}));
      dispatch(actionsFuncionario.PERFIL_BUSCAR_REQUEST());
    }catch(err){
      alert(err.toString());
    }
  }, [])

  return (
    // horizontal para a lista ser para a horizontal, padrão false
    // flatlist só ocupa espaço de apresentação na tela, o que estiver escondido ele não renderiza 
    <ScrollView showsVerticalScrollIndicator={false}  scrollEnabled={true} contentContainerStyle={styles.container}>
          {load ? (
            <>
              <LineChartScreen></LineChartScreen>
              <ChartScreen></ChartScreen>
            </>
          ): 
          <>
          <Text>Carregando gráficos...</Text>
          <ActivityIndicator size={30} color="#000"></ActivityIndicator>
          </>}
      <TouchableOpacity  onPress={(e) => navigation.navigate("HomeStack", {screen: "ListarEmpresa", params: {}})} style={styles.botao}>
        <Text style={styles.botaoText}>Listar Empresas</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// crirar planilhas de estilo para reutilizar
// envolvendo os estilos em [] ele rescebe mais de um
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column',
    width: '100%',
    height: 700,
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
    padding: 10,
    backgroundColor: "#4D9DE0",
    color: 'black',
    fontWeight: "bold",
    width: width,
    maxHeight: 40
  },
  botaoText: {
    color: 'black',
    fontSize: 14
  }
}); 

export default Home;