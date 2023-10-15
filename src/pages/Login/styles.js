import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#050A30'
  },

  containerLogo: {
    flex: 1,
    justifyContent: 'center'
  },

  /*
  logo: {
    width: 170,
    height: 195
  },
  */

  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 30
  },

  input: {
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 22,
    borderRadius: 7,
    padding: 10
  },

  buttonSubmit: {
    backgroundColor: '#59BFFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7
  },

  submitText: {
    color: '#FFF',
    fontSize: 19
  },

  buttonRegister: {
    marginTop: 10
  },

  registerText: {
    color: '#FFF'
  }
});


export const ViewStyled = styled.View`
    background-color: white;
    max-width: 500px;
    width: 70%;
    height: 200px;
    padding: 20px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
`;

export const TextInputStyled = styled.TextInput`
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: 1px solid #ccc;
    padding-left: 10px;
    margin-top: 10px;
`;

export const TextButton = styled.Text`
    background-color: #050A30;
    color: white;
    border:0;
    border-radius: 10px;
    margin-top: 10px;
    padding: 10px;
`;

