import styled from 'styled-components/native';
import * as colors from '../config/colors';
import { TextInput } from 'react-native'

export const ButtonStyled = styled.Text`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

export const TextStyled = styled.Text`
    color: black;
    font-size: 14px;
    border: 1px solid rgba(0,0,0,0.1);
`;

export const TextOptions = styled.Text`
    color: black;
    font-size: 14px;
    background: rgba(0,0,0,0.1);
`;

export const ContainerAudio = styled.View`
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


export const Messages = styled.ScrollView`
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

export const MessageChat = styled.View`
    color: black;
    padding: 10px;
    display: flex;
    align-items: ${props => !props.myMessage ? 'flex-start' : "flex-end"};
    align-self: ${props => !props.myMessage ? 'flex-start' : "flex-end"};
    justify-content: center;
    flex-direction: column;
    margin: 10px;
    width: 70%;
`;


export const TitleMessage = styled.Text`
    border-radius: 20px;
    border-width: 1px;
    border-style: solid;
    border-color: ${colors.azulescuro};
    padding: 10px;
    background-color: ${props => !props.myMessage ? `${colors.azulclaro}`:'white'};
    color: ${props => !props.myMessage ? `white`:'black'};
`;

export const ContainerMessage = styled.View`
    color: black;
    padding: 10px;
    display: flex;
    align-items: flex-end;
    align-self: ${props => !props.myMessage ? 'flex-start' : "flex-end"};
    justify-content: flex-end;
    flex-direction: column;
    flex-wrap: wrap;
    border-style: solid;
    border-width: 1px;
    border-color: ${colors.azulescuro};
    border-radius: 10px;
    margin: 10px;
    width: 100%;
    background-color: ${props => !props.myMessage ? `${colors.azulclaro}`:'white'};
    color: ${props => !props.myMessage ? `white`:'black'};
`;

export const ContainerMessageText = styled.Text`
    color: black;
    padding: 10px;
    display: flex;
    align-items: flex-end;
    align-self: ${props => !props.myMessage ? 'flex-start' : "flex-end"};
    justify-content: space-between;
    flex-direction: column;
    flex-wrap: wrap;
    border-style: solid;
    border-width: 1px;
    border-color: ${colors.azulescuro};
    border-radius: 10px;
    margin: 10px;
    background-color: ${props => !props.myMessage ? `${colors.azulclaro}`:'white'};
    color: ${props => !props.myMessage ? `white`:'black'};
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
    width: 80%;
    height: 50px;
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
`;