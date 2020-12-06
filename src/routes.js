import React from 'react';
import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/home';
import Veiculos from './pages/veiculos';
import Motoristas from './pages/motoristas'
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Agendamento from './pages/agendamento';
import CreateTask from './pages/createTask';
import FotoComprovante from './pages/fotoComprovante';
import ListaComprovantes from './pages/listaComprovantes';
import DetailsComprovantes from './pages/detailsComprovantes';
import Pecas from './pages/pecas';
import Analises from './pages/analises';
import DetailsPecas from './pages/detailsPecas';
import DetailsMotorista from './pages/detailsMotorista';
import DetailsVeiculos from './pages/detailsVeiculos';
import firebase from 'firebase';
import {firebasecConfig} from './banco/index.js';

firebase.initializeApp(firebasecConfig);
const AppStack = createStackNavigator();

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer']);

export default function Routes(){

    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Cadastro" component={Cadastro} />
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Veiculos" component={Veiculos} />
                <AppStack.Screen name="DetailsVeiculos" component={DetailsVeiculos} />
                <AppStack.Screen name="Motoristas" component={Motoristas} />
                <AppStack.Screen name="DetailsMotorista" component={DetailsMotorista} />
                <AppStack.Screen name="FotoComprovante" component={FotoComprovante} />
                <AppStack.Screen name="ListaComprovantes" component={ListaComprovantes} />
                <AppStack.Screen name="DetailsComprovantes" component={DetailsComprovantes} />
                <AppStack.Screen name="Pecas" component={Pecas} />
                <AppStack.Screen name="Analises" component={Analises} />
                <AppStack.Screen name="DetailsPecas" component={DetailsPecas} />
                <AppStack.Screen name="Agendamento" component={Agendamento} />
                <AppStack.Screen name="CreateTask" component={CreateTask} />
            </AppStack.Navigator>

        </NavigationContainer>
    );
}
