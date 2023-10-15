import React from "react";
import { SafeAreaView, ScrollView  } from 'react-native';
import { DivChamados } from "./styled";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/chamadosreducer/actions';
import CalendarComponent from "./Calendar";


export default function ListarChamados(){

    const user = useSelector(state => state.authreducer);
    const dispatch = useDispatch();

    const handleUpdate = () => {
        try{
            dispatch(actions.CHAMADOSREQUEST({filter: `id_funcionario_criador+eq+${user.user.id}`}));
            dispatch(actions.EXEC_PROCEDURE_REQUEST({query: 'call CountChamados();'}));
            dispatch(actions.CATEGORIAS_REQUEST());
            dispatch(actions.STATUS_REQUEST());
        }catch(err){
            alert(err.toString());
        }
    }
 
    React.useEffect(()=>{
        handleUpdate();
    }, []);

    return (
        <>
            <DivChamados>
                <SafeAreaView style={{flex: 1}}>
                    <CalendarComponent></CalendarComponent>
                </SafeAreaView>
            </DivChamados>
        </>
    );
}  