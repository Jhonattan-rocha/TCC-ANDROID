import styled from 'styled-components/native';

export const StyleView = styled.View`
    background-color: white;
    color: white;
    flex: 1;
    width: 100%;
`;

export const StyleBtn = styled.Button`
    background-color: blue;
    display: 'flex';
    color: black;
`;

export const DivChamados = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    border: 1px solid black;
`;

export const TextStyled = styled.Text`
    color: black;
    font-family: Arial;
    font-size: 14px;
`;

export const TextInputStyled = styled.TextInput`
    color: black;
    width: 100%;
    border: 1px solid rgba(0,0,0,0.1);
    font-size: 12px;
`;

export const TextCalendarStyled = styled.Text`
    color: white;
    font-family: Arial;
    font-size: 15px;
    text-align: center;
`;

export const TextDayCalendar = styled.Text`
    color: "rgb(255, 255, 255)";
    font-family: Arial;
    font-size: 15px;
    border-bottom-color: 'rgb(0, 0, 0)';
    border-bottom-width: 1px;
    text-align: center;
`;
