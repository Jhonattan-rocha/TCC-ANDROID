import React from "react";
import { View, Button, FlatList, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/chamadosreducer/actions';
import { TextCalendarStyled, TextDayCalendar } from "./styled";
import Icon from 'react-native-vector-icons/AntDesign';
import DropDown from "../../components/DropDownFiltro";

function CalendarComponent(props) {
  const currentDate = new Date(); // Obtenha a data atual
  const [monthMain, setMonth] = React.useState(currentDate.getMonth())
  const daysInMonth = new Date(currentDate.getFullYear(), monthMain+1, 0).getDate(); // Obtenha o número de dias no mês atual
  
  const navigation = useNavigation();
  const user = useSelector(state => state.authreducer);
  const dispatch = useDispatch();
  const chamadoslist = useSelector(state => state.chamadosreducer.chamados.result) || [];
  const [filtroChamados, setFiltroChamados] = React.useState("my")
  const handleNextMonth = () => {
    if(monthMain === 11){
      setMonth(0)
      return 
    }
    setMonth(prevMonth => prevMonth + 1);
  };
  
  const handlePreviousMonth = () => {
    if(monthMain === 0){
      setMonth(11)
      return
    }
    setMonth(prevMonth => prevMonth - 1);
  };

  const getMonthName = (monthNumber) => { 
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ];
  
    return months[monthNumber];
  };

  React.useEffect(() => {
    dispatch(actions.STATUS_REQUEST());
    if(filtroChamados === 'my'){
        dispatch(actions.CHAMADOSREQUEST({filter: `id_funcionario_criador+eq+${user.user.id}`}));
    }else if(filtroChamados === "other"){
        dispatch(actions.CHAMADOSREQUEST({filter: `id_funcionario_criador+ne+${user.user.id}`}));
    }else if(filtroChamados === "any"){
        dispatch(actions.CHAMADOSREQUEST());
    }else if(filtroChamados === "resp"){
      dispatch(actions.CHAMADOSREQUEST({filter: `id_funcionario_resp+eq+${user.user.id}`}));
    }
}, [user.user.id, dispatch, filtroChamados]);

  const renderCalendarDays = () => {
    const calendarDays = [];

     for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), monthMain, i);
      const day = date.getDate();
      const month = monthMain + 1;
      const year = date.getFullYear();

      const chamadosfiltrados = chamadoslist.filter(chamados => {
        const data = new Date(chamados.agendamento);
        const dia = data.getDate();
        const mes = data.getMonth() + 1;
        const ano = data.getFullYear();

        if(Number(dia) === Number(day) && Number(mes) === Number(month) && Number(ano) === Number(year)){
            return chamados
        }
      }) || []

      calendarDays.push(
        <TouchableOpacity key={i} style={styles.dayContainer} onPress={(e) => navigation.navigate("ChamadosStack", {screen: "ListaChamadoData", params: {chamado: chamadosfiltrados, day: day}})}>
          <View style={styles.textChamado}>
              <TextDayCalendar style={{color: 'black'}}>{day}</TextDayCalendar>
              <Text style={styles.textQtdchamado}>{chamadosfiltrados.length}</Text>
              <Text style={styles.textQtdchamado}>Chamados</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return calendarDays;
  };

  return (
    <ScrollView contentContainerStyle={styles.containerPrincipal}>
        <View style={styles.containerTitle}>
          <TouchableOpacity onPress={handlePreviousMonth}>
            <Icon name="stepbackward" size={30} color="#000" />
          </TouchableOpacity>
          <Text style={{color: 'black'}}>{currentDate.getFullYear()} </Text>
          <Text style={styles.titleMain}>{getMonthName(monthMain)}</Text>
          <TouchableOpacity onPress={handleNextMonth}>
            <Icon name="stepforward" size={30} color="#000" />
          </TouchableOpacity>
        </View>
        <DropDown onSelected={setFiltroChamados}></DropDown>
        <View style={styles.container}>
          {renderCalendarDays()}
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: "row",
    flexWrap: 'wrap',
    width: '100%',
  },
  dayContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: 100,
    height: 100,
    borderColor: 'black',
    color: 'black',
  },
  textChamado: {
    width: '100%',
    height: '100%',
    backgroundColor: "rgb(255, 255, 255)F",
  },
  containerPrincipal: {
    display: 'flex', 
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'white',
    width: '100%',
    backgroundColor: "rgb(255, 255, 255)F",
  },
  titleMain: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 22
  },
  containerTitle: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexGrow: 1,
    margin: 5
  },
  textQtdchamado: {
    color: 'rgb(0, 0, 0)',
    textAlign: "center",
    fontSize: 18
  }
});

export default CalendarComponent;
