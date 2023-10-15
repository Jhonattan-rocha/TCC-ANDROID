import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/modules/chamadosreducer/actions';

export default function ChartScreen() {

    const dispatch = useDispatch();
    const qtdchamados = useSelector(state => state.chamadosreducer.procedure.result);
    const colors = ["#FFC947", "#45B5AA", "#F47B5A", "#9B59B6", "#4D9DE0", "#FF5E5B", "#FFC947", "#27AE60", "#3498DB", "#F368E0", "#FF9F71", "#FFD670", "#A0C4FF", "#D8B4FE", "#90EE90"];

    const result = Object.entries(
        qtdchamados.reduce((acc, curr) => {
          const { nome, qtd } = curr;
          if (acc[nome]) {
            acc[nome] += qtd;
          } else {
            acc[nome] = qtd;
          }
          return acc;
        }, {})
    ).map(([nome, qtd]) => ({ nome: nome, qtd: qtd }));;
    const data = result.map(chamado => {
        return {
            name: chamado.nome,
            population: chamado.qtd,
            color: colors[Math.floor(Math.random() * colors.length)],
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        }
    });

    React.useEffect(() => {
        try{
            dispatch(actions.EXEC_PROCEDURE_REQUEST({query: 'call CountChamados();'}));
        }catch(err){
            alert(err.toString());
        }
    }, [dispatch]);


    const chartConfig = {
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{color: "black"}}>Quantidade de chamados por status</Text>
            <PieChart
                data={data}
                width={300}
                height={200}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />
        </View>
    );
}
