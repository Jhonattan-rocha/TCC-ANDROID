import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/modules/chamadosreducer/actions';
import { TextStyled, TextOptions } from './styled';

export default function DropDown(props) {
  const dispacth = useDispatch();

  const [status, setStatus] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState('Status');
  const statuslist = useSelector(state => state.chamadosreducer.status.result) || []

  const handleUpdate = async () => {
    try {
      dispacth(actions.STATUS_REQUEST());
      setStatus(statuslist);
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
      setDefaultValue(statuslist.map(stats => {
        if(stats.id === props.defaultValue){
          return stats.nome
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
              status.map((stats, index) => (
                <TextOptions
                  key={index}
                  onPress={() => {
                    handleValueChange(stats.id);
                    setDefaultValue(stats.nome);
                    setIsOpen(false);
                  }}
                  aria-valuenow={stats.id}
                >
                  {stats.nome}
                </TextOptions>
              ))
            }
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}
