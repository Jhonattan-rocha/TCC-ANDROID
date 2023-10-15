import styled from "styled-components/native";
import * as colors from '../../../config/colors';
import { ScrollView, View, Text, TextInput, FlatList, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

export const DivChat = styled(View)`
    border-radius: 10px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;


export const InputChat = styled(TextInput)`
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.1);
    padding: 10px;
    text-decoration: none;
    font-size: 12px;
    color: black;
    background-color: azure;
    border-radius: 10px;
    width: ${windowWidth * 0.7}px;
    height: 50px;
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
`;


export const Containerbuttoninput = styled(View)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 80%;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
`;

export const Messages = styled(FlatList)`
    width: 90%;
    height: 60%;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin: 10px;
    overflow: scroll;
    overflow-x: hidden;
    padding: 20px;
`;

export const MessageChat = styled(View)`
    color: black;
    padding: 10px;
    display: flex;
    align-items: ${props => !props.myMessage ? 'flex-start' : "flex-end"};
    align-self: ${props => !props.myMessage ? 'flex-start' : "flex-end"};
    justify-content: center;
    flex-direction: column;
    margin: 10px;
    width: 60%;
    flex-grow: 1;
`;

export const TextStyled = styled(Text)`
    color: black;
    font-family: Arial;
    font-size: 14px;
`;

export const TitleMessage = styled(Text)`
    border-radius: 20px;
    border-width: 1px;
    border-style: solid;
    border-color: ${colors.azulescuro};
    padding: 10px;
    background-color: ${props => !props.myMessage ? `${colors.azulclaro}`:'white'};
    color: ${props => !props.myMessage ? `white`:'black'};
`;

export const ContainerMessage = styled(Text)`
    color: black;
    padding: 10px;
    display: flex;
    align-items: center;
    align-self: ${props => !props.myMessage ? 'flex-start' : "flex-end"};
    justify-content: center;
    flex-direction: column;
    border-style: solid;
    border-width: 1px;
    border-color: ${colors.azulescuro};
    border-radius: 10px;
    margin: 10px;
    width: 100%;
    background-color: ${props => !props.myMessage ? `${colors.azulclaro}`:'white'};
    color: ${props => !props.myMessage ? `white`:'black'};
`;

export const ContainerAudio = styled(Text)`
    color: black;
    padding: 10px;
    display: flex;
    align-items: center;
    align-self: ${props => !props.myMessage ? 'flex-start' : "flex-end"};
    justify-content: center;
    flex-direction: row;
    border-style: solid;
    border-width: 1px;
    border-color: ${colors.azulescuro};
    border-radius: 10px;
    margin: 10px;
    width: 100%;
    background-color: ${props => !props.myMessage ? `${colors.azulclaro}`:'white'};
    color: ${props => !props.myMessage ? `white`:'black'};
`;

