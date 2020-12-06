import React, {Component} from 'react';
import {View, FlatList, Alert, Image, Modal, Text, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import { Searchbar} from 'react-native-paper';
import {FontAwesome, AntDesign} from '@expo/vector-icons';
import {TouchableRipple} from 'react-native-paper';


export default class ListaComprovantes extends Component{

    state = {
        list:[],
    };
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(function(user){
            
            if(user){
                this.setState({
                    isAuthenticated: true,
                })
                this.getMotorista();

            }
            else{
                this.setState({
                    isAuthenticated: false,
                })
                this.navigateToLogin();

            }
        }.bind(this)
        );
    }

    navigateToLogin = () =>{
        this.props.navigation.navigate('Login');
    }

    navigateToDetailComprovantes = () =>{
        this.props.navigation.navigate('DetailsComprovantes');
    }
    render(){
    return(
        <View style={styles.container} >
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableRipple 
                    rippleColor="#E9EEF3"
                    onPress={()=>{}}
                >

                    <FontAwesome name="power-off" size={24} color="red" />

                </TouchableRipple>
            </View>

            <Text style={styles.description}>Comprovantes</Text>
            <Searchbar placeholder="Escreva aqui..." style={styles.search} editable={true} value={this.state.search} ></Searchbar>

            <FlatList
                style={styles.listaComprovantes}
                //data={this.state.list}
                data={[1,2,3]}
                //keyExtractor={(list, index) => String(index)}
                keyExtractor={(incidents) => String(incidents)}
                showsVerticalScrollIndicator ={false}
                //renderItem={({item: list}) => (
                renderItem={() => (
                    <View style={styles.comprovantes}>
                        <Text style={styles.comprovantesProperty}>Nome Completo:</Text>
                        <Text style={styles.comprovantesValue}>Murilo Marcondes</Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={this.navigateToDetailComprovantes}
                        >
                            <Text style={styles.detailsButtonText}>Ver detalhes</Text>
                            <AntDesign name="right" size={24} color="#4f8cff" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )}
}
