import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextStyled, TextOptions } from './styled';

export default function DropDown(props) {
  const opcoes = [["Meus Chamados", "my"], ["Chamado dos outros", "other"], ["Qualquer um", "any"], ["Responsável", "resp"]]
  const [isOpen, setIsOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState(opcoes[0][0]);


  const handleValueChange = (itemValue) => {
    props.onSelected(itemValue);
  };

  React.useEffect(() => {
    if(!props.defaultValue){
      setDefaultValue(opcoes[0][0])
      handleValueChange(opcoes[0][1])
    }
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {
        setIsOpen(!isOpen);
      }}>
        <TextStyled>{defaultValue}</TextStyled>
        {isOpen ? (
          <View>
            {
              opcoes.map((ops, index) => (
                <TextOptions
                  key={index}
                  onPress={() => {
                    handleValueChange(ops[1]);
                    setDefaultValue(ops[0]);
                    setIsOpen(false);
                  }}
                >
                  {ops[0]}
                </TextOptions>
              ))
            }
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    }
});
