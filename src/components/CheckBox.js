import React, { useState } from 'react';
import { TouchableOpacity, View, Text} from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFontEl from 'react-native-vector-icons/FontAwesome';
import IconMatCom from 'react-native-vector-icons/MaterialCommunityIcons';

const Checkbox = ({ 
    labelTrue = "", 
    labelFalse = "", 
    initialValue = false, 
    type = "box", 
    color = "#000", 
    textColor = "#000", 
    size = 30, 
    fontSize = 14,
    onChangeCheck = () => {} }) => {
  const [checked, setChecked] = useState(initialValue);
  
  const TypeOfColor = (type, color, value) => {
    switch(type){
        case "function":{
            return color(value)
        }
        case "string":{
            return color
        }
        case "default_function": {
            return (value) => value ? 'black' : 'white'
        }
    }
  } 

  const toggleCheckbox = () => {
    setChecked(!checked);
    onChangeCheck(!checked);
  };

  if(!labelFalse){
    labelFalse = labelTrue
  }

  const change = () => {
    switch(type){
        case "box": {
            return (
                <View
                    style={{
                    width: 25,
                    height: 25,
                    borderWidth: 1,
                    borderColor: 'black',
                    borderRadius: 3,
                    marginRight: 10,
                    backgroundColor: typeof color === "function" ? TypeOfColor("function", color, checked) : TypeOfColor("default_function"),
                    }}>
                </View>
              );
        }
        case "toggle": {
            return (
                checked ? <IconFontEl color={TypeOfColor(typeof color, color, checked)} size={size} name="toggle-on"/>:<IconFontEl name="toggle-off" color={TypeOfColor(typeof color, color, checked)} size={size}/>
              );
        }
        case "circle": {
            return (
                checked ? <IconMatCom color={TypeOfColor(typeof color, color, checked)} size={size} name="checkbox-marked-circle-outline"/>:<IconMatCom name="checkbox-blank-circle-outline" color={TypeOfColor(typeof color, color, checked)} size={size}/>
            );
        }
      }
  }

  return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={toggleCheckbox}>
            {change()}
        </TouchableOpacity>
        <Text style={{color: TypeOfColor(typeof textColor, textColor, checked), fontSize: fontSize}}> {checked ? labelTrue : labelFalse}</Text>
      </View>
  );
};

export default Checkbox;
