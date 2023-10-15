import * as actions from '../../store/modules/authReducer/actions';
import { useDispatch, useSelector } from 'react-redux'
import { verifyPermissions } from "../../services/permissons";
import React, { useState, useEffect } from 'react';
import{ KeyboardAvoidingView, View, Text, Image, TextInput, TouchableOpacity, Animated, Keyboard, ActivityIndicator } from 'react-native';
import {useNavigation} from "@react-navigation/native"
import {styles} from './styles';

export default function Login(props){
    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }));
    const [opacity] = useState(new Animated.Value(0));
    const [logo] = useState(new Animated.ValueXY({ x: 400, y: 250 }));
    const [loadingAuth, setLoadingAuth] = useState(false);

    const navigation =  useNavigation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.authreducer);

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    async function handleSubmit(e){
        if(!email && !password){
            alert("O email e senha não pode ser vazio")
            return false
        }
        try{
            setLoadingAuth(true)
            alert(`${{email: email, password: password, type: "fu"}}`)
            dispatch(actions.Login({email: email, password: password, type: "fu"}));
        }catch(err){
            setLoadingAuth(false)
            console.log(err)
            alert(err)
        }

    }

    React.useEffect(() => {
        if(user.token){
          navigation.navigate('HomeStack', {screen: "Home"})
        }
        setLoadingAuth(false);
        verifyPermissions();
    }, [user]);

    useEffect(() => {
      keyboardDidShowListener
        = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
  
      keyboardDidHideListener
        = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
  
      // Animações em paralelo
      Animated.parallel([
        // Fornece um modelo de física básico (efeito mola/estilingue)
        Animated.spring(offset.y, {
          toValue: 0,
          speed: 4,
          bounciness: 20,
          useNativeDriver: false
        }),
  
        // Anima um valor ao longo do tempo
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false
        })
      ]).start();
    }, []);
  
    function keyboardDidShow() {
      Animated.parallel([
        Animated.timing(logo.x, {
          toValue: 100,
          duration: 100,
          useNativeDriver: false
        }),
  
        Animated.timing(logo.y, {
          toValue: 110,
          duration: 100,
          useNativeDriver: false
        })
      ]).start();
    }
  
    function keyboardDidHide() {
      Animated.parallel([
        Animated.timing(logo.x, {
          toValue: 170,
          duration: 100,
          useNativeDriver: false
        }),
  
        Animated.timing(logo.y, {
          toValue: 195,
          duration: 100,
          useNativeDriver: false
        })
      ]).start();
    };
    
    return (
        <>
        <KeyboardAvoidingView style={styles.container}>

        <View style={styles.containerLogo}>
          <Animated.Image
            style={{
              width: logo.x,
              height: logo.y
            }}
            source={require('../../assests/Logo.jpeg')}
          />
        </View>

        <Animated.View style={[
          styles.form,
          {
            opacity: opacity,
            transform: [
              {
                translateY: offset.y
              }
            ]
          }
        ]}>

            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCapitalize="none"
              autoCompleteType="email"
              autoCorrect={false}
              value={email} onChangeText={(data) => setEmail(data)}
            />
  
            <TextInput
              style={styles.input}
              placeholder="Senha"
              //keyboardType="visible-password"
              textContentType="password"
              autoCapitalize="none"
              autoCompleteType="password"
              autoCorrect={false}
              secureTextEntry={true}
              value={password} onChangeText={(data) => setPassword(data)}
            />
            <TouchableOpacity onPress={() => {
              navigation.navigate("HomeStack", {screen: "CriarEmpresa"})
            }}>
              <Text style={{color: "white", fontSize: 18}}>Criar Conta Empresarial</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSubmit} onPress={handleSubmit}>
              {loadingAuth ? 
              <ActivityIndicator size={20} color="#000"></ActivityIndicator>
              :
              <Text style={styles.submitText}>Acessar</Text>
              }
            </TouchableOpacity>
            </Animated.View>
        </KeyboardAvoidingView>
      </>
    );
  };
