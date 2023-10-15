import styled from "styled-components/native";
import * as colors from '../../config/colors';
import { ScrollView, Text, TextInput, View, TouchableOpacity, Dimensions } from 'react-native'

const width = Dimensions.get('window').width

const height = Dimensions.get('window').height

export const Divhome = styled(ScrollView)`
    display: flex;
    flex-direction: column;
    background-color: white;
    margin-top: 10px;
    width: ${width}px;
    height: ${height}px;
    border-radius: 10px;
`;

export const DivListaDeChamados = styled(View)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: white;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    width: 100%;
    flex: 1;
`;

export const DivChatList = styled(View)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    background-color: white;
    width: ${width}px;
    height: ${height}px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;

export const DivDados = styled(TouchableOpacity)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    min-height: 50px;
    max-height: 50px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;

export const TextStyled = styled(Text)`
    color: black;
    font-family: Arial;
    font-size: 14px;
`;
