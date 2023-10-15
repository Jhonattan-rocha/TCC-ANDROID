import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/modules/chamadosreducer/actions';

export default function LineChartScreen() {
    const dispatch = useDispatch();
    const screenWidth = Dimensions.get('window').width;

    const qtdchamados = useSelector(state => state.chamadosreducer.procedure.result);

    React.useEffect(() => {
        dispatch(actions.EXEC_PROCEDURE_REQUEST({query: "call CountChamados();"}));
    }, [dispatch])

    const data = qtdchamados.map(chamado => {
        let qtd = qtdchamados.reduce((acc, chamado2) => {
            if(chamado.date === chamado2.date){
                return acc + 1
            }
            return acc
        }, 0);

        
        return {
          date: chamado.date, qtd: qtd
        }
    })  
 
    const chartConfig = {
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    };
 
    const chartData = {
        labels: data.map(item => `${new Date(item.date).getDate()}/${new Date(item.date).getMonth()}`),
        datasets: [
        {
            data: data.map(item => item.qtd),
        },
        ],
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{color: "black"}}>Quantidade de chamados por dia</Text>
            <LineChart
                data={chartData}
                width={screenWidth}
                height={200}
                chartConfig={chartConfig}
                bezier
            />
        </View>
    );
}
