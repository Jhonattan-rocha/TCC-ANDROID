import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/modules/funcionarioreducer/actions';
import { TextStyled, TextOptions } from './styled';

export default function DropDown(props) {
  const dispacth = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState('Cargos');
  const cargosList = useSelector(state => {
    try{
        return state.funcionarioreducer.cargos.result
    }catch(err){
        return state.funcionarioreducer.cargos
    }
  }) ?? [];

  const handleUpdate = async () => {
    try {
      dispacth(actions.CARGOS_REQUEST());
    } catch (err) {
      console.log(err);
      alert(err.toString());
    }
  };

  const handleValueChange = (itemValue) => {
    props.onSelected(itemValue);
    console.log(itemValue)
  };

  React.useEffect(() =>{
    if(props.defaultValue){
      setDefaultValue(cargosList.map(cargo => {
        if(cargo.id === props.defaultValue){
          return cargo.nome
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
              cargosList.map((cargo, index) => (
                <TextOptions
                  key={index}
                  onPress={() => {
                    handleValueChange(cargo.id);
                    setDefaultValue(cargo.nome);
                    setIsOpen(false);
                  }}
                  aria-valuenow={cargo.id}
                >
                  {cargo.nome}
                </TextOptions>
              ))
            }
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}
