import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/modules/funcionarioreducer/actions';
import { TextStyled, TextOptions } from './styled';

export default function DropDown(props) {
  const dispacth = useDispatch();

  const [funcionarios, setFuncionarios] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState('Escolher responsável');
  const funcionariosList = useSelector(state => state.funcionarioreducer.funcionarios.result) || []

  const handleUpdate = async () => {
    try {
      dispacth(actions.FUNCIONARIO_BUSCAR_REQUEST());
      setFuncionarios(funcionariosList);
    } catch (err) {
      console.log(err);
      alert(err.toString());
    }
  };

  const handleValueChange = (itemValue) => {
    props.onSelected(itemValue);
  };

  React.useEffect(() =>{
    if(props.defaultValue){
      setDefaultValue(funcionariosList.map(func => {
        if(func.id === props.defaultValue){
          return func.nome
        }
      }))
    }
    handleUpdate()
  }, [])

  return (
    <View>
      <TouchableOpacity onPress={() => {
        setIsOpen(!isOpen);
      }}>
        <TextStyled>{defaultValue}</TextStyled>
        {isOpen ? (
          <View>
            {
              funcionarios.map((func, index) => (
                <TextOptions
                  key={index}
                  onPress={() => {
                    handleValueChange(func.id);
                    setDefaultValue(func.nome);
                    setIsOpen(false);
                  }}
                  aria-valuenow={func.id}
                >
                  {func.nome}
                </TextOptions>
              ))
            }
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}
