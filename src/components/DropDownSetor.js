import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/modules/funcionarioreducer/actions';
import { TextStyled, TextOptions } from './styled';

export default function DropDown(props) {
  const dispacth = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState('Setores');
  const setoresList = useSelector(state => state.funcionarioreducer.setores.result) ?? [];

  const handleUpdate = async () => {
    try {
      dispacth(actions.SETORES_REQUEST());
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
      setDefaultValue(setoresList.map(setor => {
        if(setor.id === props.defaultValue){
          return setor.nome
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
              setoresList.map((setor, index) => (
                <TextOptions
                  key={index}
                  onPress={() => {
                    handleValueChange(setor.id);
                    setDefaultValue(setor.nome);
                    setIsOpen(false);
                  }}
                  aria-valuenow={setor.id}
                >
                  {setor.nome}
                </TextOptions>
              ))
            }
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}
