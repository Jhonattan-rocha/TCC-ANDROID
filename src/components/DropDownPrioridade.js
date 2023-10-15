import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextStyled, TextOptions } from './styled';

export default function DropDown(props) {
  const prioridades = [{nome: "Baixo", id: 1}, {nome: "Médio", id: 2}, {nome: "Intermediario", id: 3}, {nome: "Alto", id: 4}, {nome: "Prioridade máxima", id: 5}]
  const [isOpen, setIsOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState(prioridades[0].nome);


  const handleValueChange = (itemValue) => {
    props.onSelected(itemValue);
  };

  React.useEffect(() => {
    prioridades.map(prioridade => {
      if(prioridade.id === props.defaultValue){
        setDefaultValue(prioridade.nome)
      }
    })
    if(!props.defaultValue){
      setDefaultValue(prioridades[0].nome)
      handleValueChange(prioridades[0].id)
    }
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
              prioridades.map((pri, index) => (
                <TextOptions
                  key={index}
                  onPress={() => {
                    handleValueChange(pri.id);
                    setDefaultValue(pri.nome);
                    setIsOpen(false);
                  }}
                  aria-valuenow={pri.id}
                >
                  {pri.nome}
                </TextOptions>
              ))
            }
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}
