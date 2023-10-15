import React, { useEffect, useState } from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useSelector } from 'react-redux';
import store, {persistor} from './src/store';

import Home from './src/pages/Home';
import HomeChamados from './src/pages/HomeChamados';
import Login from './src/pages/Login';
import CriarChamado from './src/pages/Chamados/criarchamado';
import EditarChamado from './src/pages/Chamados/editarchamado';
import ListarChamados from './src/pages/Chamados/listarChamados';
import CriarStatus from './src/pages/Status/criarstatus';
import EditarStatus from './src/pages/Status/editarstatus';
import RelCham from './src/pages/Chamados/escolherChamado';
import ChamadoEscolhido from './src/pages/Chamados/ChamadoEscolhido';
import ListaChamadosData from './src/pages/Chamados/ListaChamadosData';
import CriarCategoria from './src/pages/Categoria/criarcategoria';
import EditarCategoria from './src/pages/Categoria/editarcategoria';
import EscolherCategoria from './src/pages/Categoria/escolhercategoria';
import CategoriaChamadoEscolhido from './src/pages/Categoria/CategoriaChamadoEscolhido';
import CriarSubCategoria from './src/pages/SubCategoria/criarsubcategoria';
import EditarSubCategoria from './src/pages/SubCategoria/editarsubcategoria';
import EscolherSubCategoria from './src/pages/SubCategoria/escolhersubcategoria';
import SubCategoriaChamadoEscolhido from './src/pages/SubCategoria/SubCategoriaChamadoEscolhido';
import FuncionarioHome from './src/pages/FuncionarioHome';
import ListarSetores from './src/pages/Setores/ListarSetores';
import ListarCargos from './src/pages/Cargos';
import Chats from './src/components/Chats';
import Chat from './src/components/Chats/chat';
import EscolherSetor from './src/pages/Setores/escolhersetor';
import SetorChamadoEscolhido from './src/pages/Setores/SetorChamadoEscolhido';
import EditarFuncionario from './src/pages/Funcionarios/editarfuncionario';
import CriarFuncionario from './src/pages/Funcionarios/criarfuncionario';
import ListarFuncionario from './src/pages/Funcionarios/ListarFuncionarios';
import Tree from './src/pages/Arvoredearquivos';
import CriarEmpresa from './src/pages/Empresas/criarempresa';
import EditarEmpresa from './src/pages/Empresas/editarempresa';
import ListarEmpresas from './src/pages/Empresas/ListarEmpresa';
import ListarPerfis from './src/pages/Perfis/ListarPerfis';
import CriarPerfil from './src/pages/Perfis/criarperfil';

import IconEnt from 'react-native-vector-icons/Entypo';
import IconIon from 'react-native-vector-icons/Ionicons';
import { azulclaro, azulescuro, white } from './src/config/colors';
import EditarPerfil from './src/pages/Perfis/editarperfil';


const HomeStackNavigator = createNativeStackNavigator();
const ChamadosStackNavigator = createNativeStackNavigator();
const ChatsStackNavigator = createNativeStackNavigator();
const FuncionarioStackNavigator = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function ChatsStack(): JSX.Element{
  return (
    <ChatsStackNavigator.Navigator initialRouteName='Chats'>
      <ChatsStackNavigator.Screen name="Chats" options={{title: 'Chats dos chamados'}} component={Chats}></ChatsStackNavigator.Screen>
      <ChatsStackNavigator.Screen name="Chat" options={{title: 'Chat'}} component={Chat}></ChatsStackNavigator.Screen>
    </ChatsStackNavigator.Navigator>
  );
} 

function ChamadosStack(): JSX.Element{
  return (
    <ChamadosStackNavigator.Navigator initialRouteName='HomeChamados'>
      <ChamadosStackNavigator.Screen name="HomeChamados" options={{title: 'Home'}} component={HomeChamados}></ChamadosStackNavigator.Screen>
      <ChamadosStackNavigator.Screen name="ChamadoCad" options={{title: 'Cadastrar Chamado'}} component={CriarChamado}></ChamadosStackNavigator.Screen>
      <ChamadosStackNavigator.Screen name="ChamadoEdit" options={{title: 'Editar Chamado'}} component={EditarChamado}></ChamadosStackNavigator.Screen>
      <ChamadosStackNavigator.Screen name="StatusCad" options={{title: 'Cadastrar Status'}} component={CriarStatus}></ChamadosStackNavigator.Screen>
      <ChamadosStackNavigator.Screen name="StatusEdit" options={{title: 'Editar Status'}} component={EditarStatus}></ChamadosStackNavigator.Screen>
      <ChamadosStackNavigator.Screen name="EscolherChamado" options={{title: 'Filtro por status'}} component={RelCham}></ChamadosStackNavigator.Screen>
      <ChamadosStackNavigator.Screen name="ChamadoEscolhido" options={{title: 'Chamados filtrado por status'}} component={ChamadoEscolhido}></ChamadosStackNavigator.Screen>
      <ChamadosStackNavigator.Screen name="ChamadoList" options={{title: 'Calendario'}} component={ListarChamados}></ChamadosStackNavigator.Screen>
      <ChamadosStackNavigator.Screen name="ListaChamadoData" options={{title: 'Chamados do dia'}} component={ListaChamadosData}></ChamadosStackNavigator.Screen>
      <ChamadosStackNavigator.Screen name="CategoriaCriar" options={{title: 'Cadastrar Categoria'}} component={CriarCategoria}></ChamadosStackNavigator.Screen>
      <ChamadosStackNavigator.Screen name="EditarCategoria" options={{title: 'Editar Categoria'}} component={EditarCategoria}></ChamadosStackNavigator.Screen>            
      <ChamadosStackNavigator.Screen name="EscolherCategoria" options={{title: 'Lista de categorias catalogados'}} component={EscolherCategoria}></ChamadosStackNavigator.Screen>
      <ChamadosStackNavigator.Screen name='CategoriaEscolhida' options={{title: 'Chamados filtrados por categoria'}} component={CategoriaChamadoEscolhido}></ChamadosStackNavigator.Screen>
      <ChamadosStackNavigator.Screen name="SubCategoriaCriar" options={{title: 'Cadastrar Subcategoria'}} component={CriarSubCategoria}></ChamadosStackNavigator.Screen>
      <ChamadosStackNavigator.Screen name="EditarSubCategoria" options={{title: 'Editar Subcategoria'}} component={EditarSubCategoria}></ChamadosStackNavigator.Screen>            
      <ChamadosStackNavigator.Screen name="EscolherSubCategoria" options={{title: 'Lista de subcategorias catalogados'}} component={EscolherSubCategoria}></ChamadosStackNavigator.Screen>
      <ChamadosStackNavigator.Screen name='SubCategoriaEscolhida' options={{title: 'Chamados filtrados por subcategoria'}} component={SubCategoriaChamadoEscolhido}></ChamadosStackNavigator.Screen>
      <ChamadosStackNavigator.Screen name="EscolherSetor" options={{title: 'Lista de setores catalogados'}} component={EscolherSetor}></ChamadosStackNavigator.Screen>
      <ChamadosStackNavigator.Screen name="SetorEscolhido" options={{title: 'Chamados filtrados por setor'}} component={SetorChamadoEscolhido}></ChamadosStackNavigator.Screen>
      <ChamadosStackNavigator.Screen name="Tree" options={{title: "Arquivos do sistema"}} component={Tree}></ChamadosStackNavigator.Screen>
    </ChamadosStackNavigator.Navigator>
  );
}

function HomeStack(): JSX.Element{
  return (
    <HomeStackNavigator.Navigator initialRouteName='Login'>
      <HomeStackNavigator.Screen name="Login" component={Login}></HomeStackNavigator.Screen>
      <HomeStackNavigator.Screen name="Home" component={Home}></HomeStackNavigator.Screen>
      <HomeStackNavigator.Screen name="CriarEmpresa" component={CriarEmpresa}></HomeStackNavigator.Screen>
      <HomeStackNavigator.Screen name="EditarEmpresa" component={EditarEmpresa}></HomeStackNavigator.Screen>
      <HomeStackNavigator.Screen name="ListarEmpresa" component={ListarEmpresas}></HomeStackNavigator.Screen>
    </HomeStackNavigator.Navigator>
  );
}

function FuncionarioStack(): JSX.Element{
  return (
    <FuncionarioStackNavigator.Navigator>
      <FuncionarioStackNavigator.Screen name="Home" component={FuncionarioHome}></FuncionarioStackNavigator.Screen>
      <FuncionarioStackNavigator.Screen name="Setores" component={ListarSetores}></FuncionarioStackNavigator.Screen>
      <FuncionarioStackNavigator.Screen name="Cargos" component={ListarCargos}></FuncionarioStackNavigator.Screen>
      <FuncionarioStackNavigator.Screen name="EditarFuncionario" component={EditarFuncionario}></FuncionarioStackNavigator.Screen>
      <FuncionarioStackNavigator.Screen name="CriarFuncionario" component={CriarFuncionario}></FuncionarioStackNavigator.Screen>
      <FuncionarioStackNavigator.Screen name="ListarFuncionario" component={ListarFuncionario}></FuncionarioStackNavigator.Screen>
      <FuncionarioStackNavigator.Screen name='ListarPerfis' component={ListarPerfis}></FuncionarioStackNavigator.Screen>
      <FuncionarioStackNavigator.Screen name='CriarPerfil' component={CriarPerfil}></FuncionarioStackNavigator.Screen>
      <FuncionarioStackNavigator.Screen name='EditarPerfil' component={EditarPerfil}></FuncionarioStackNavigator.Screen>
    </FuncionarioStackNavigator.Navigator>
  );
}


function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
            <Tab.Navigator initialRouteName='HomeStack' screenOptions={{tabBarHideOnKeyboard: true}}>
              <Tab.Screen name='HomeStack' component={HomeStack} options={({route}) => ({ 
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => (
                  <IconEnt name="home" size={30} color={focused ? white: azulclaro} /> // Ícone do tipo "user" do pacote react-native-vector-icons
                ),
                title: "Home",
                tabBarActiveTintColor: white,
                tabBarActiveBackgroundColor: azulclaro,
                tabBarInactiveTintColor: azulclaro,
                tabBarStyle: ((route) => {
                  const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                  if (routeName === 'Login' || routeName === "") {
                    return { display: "none" }
                  }
                  return
                })(route),
              })}></Tab.Screen>
              <Tab.Screen name='ChamadosStack' component={ChamadosStack} options={({route}) => ({ 
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => (
                  <IconIon name="call-sharp" size={30} color={focused ? white: azulclaro} /> // Ícone do tipo "user" do pacote react-native-vector-icons
                ),
                title: "Chamados",
                tabBarActiveTintColor: white,
                tabBarActiveBackgroundColor: azulclaro,
                tabBarInactiveTintColor: azulclaro,
              })}></Tab.Screen>
              <Tab.Screen name='ChatsStack' component={ChatsStack} options={({route}) => ({
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => (
                  <IconIon name="chatbubble-ellipses" size={30} color={focused ? white: azulclaro} /> // Ícone do tipo "user" do pacote react-native-vector-icons
                ),
                title: "Chats",
                tabBarActiveTintColor: white,
                tabBarActiveBackgroundColor: azulclaro,
                tabBarInactiveTintColor: azulclaro,
                tabBarStyle: ((route) => {
                  const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                  if (routeName === 'Chat') {
                    return { display: "none" }
                  }
                  return
                })(route),
              })}></Tab.Screen>
              <Tab.Screen name="FuncionarioStack" component={FuncionarioStack} options={({route}) => ({
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => (
                  <IconEnt name="users" size={30} color={focused ? white: azulclaro}/> // Ícone do tipo "user" do pacote react-native-vector-icons
                ),
                title: "Funcionários",
                tabBarActiveTintColor: white,
                tabBarActiveBackgroundColor: azulclaro,
                tabBarInactiveTintColor: azulclaro,
              })}></Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;