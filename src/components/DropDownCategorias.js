import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/modules/chamadosreducer/actions';
import { TextStyled, TextOptions } from './styled';

export default function DropDown(props) {
  const dispacth = useDispatch();

  const [Categorias, setCategorias] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState('Categorias cadastrados');
  const Categoriaslist = useSelector(state => state.chamadosreducer.Categorias.result)

  const handleUpdate = async () => {
    try {
      dispacth(actions.CATEGORIAS_REQUEST());
      setCategorias(Categoriaslist);
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
      setDefaultValue(Categoriaslist.map(Categoria => {
        if(Categoria.id === props.defaultValue){
          return Categoria.nome
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
              Categorias.map((Categoria, index) => (
                <TextOptions
                  key={index}
                  onPress={() => {
                    handleValueChange(Categoria.id);
                    setDefaultValue(Categoria.nome);
                    setIsOpen(false);
                  }}
                  aria-valuenow={Categoria.id}
                >
                  {Categoria.nome}
                </TextOptions>
              ))
            }
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}
