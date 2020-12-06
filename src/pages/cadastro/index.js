
import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';
import firebase from 'firebase';
import logoImg from '../../assets/logoGrande.png';
import md5 from 'md5';
//import {Picker} from '@react-native-picker/picker';


export default class Cadastro extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLogged: false,
            matricula: "",
            nome: '',
            sobrenome: '',
            email: '',
            senha: '',
            perfil:'Usuário Chefe',
            confirmarSenha: '',
            errorMessage: null,
        }; 

        this.componentDidMount = () => {
            this.checkIfSignUp();
        }

        this.navigateToLogin = this.navigateToLogin.bind(this);
        this.cadastro = this.cadastro.bind(this);

    }

 
    checkIfSignUp = () => {

        firebase.auth().onAuthStateChanged(function(user){

            if(user){
                if(this.state.perfil == "Usuário Chefe"){
                    this.state ={
                        perfil: 1
                    }
                }else{
                    if(this.state.perfil == "Chefe Manutenção"){
                        this.state ={
                            perfil: 1
                        }
                    }
                }
                firebase.database().ref('usuario').child(user.uid).set({
                    matricula: this.state.matricula,
                    nome: this.state.nome,
                    sobrenome: this.state.sobrenome,
                    codigo_perfil: this.state.perfil,
                    email: this.state.email,
                    password: md5(this.state.password)
                })
            }else{
                this.props.navigation.navigate('Cadastro');
            }
        }.bind(this)
        );
    }

    cadastro = () =>{

        try{
            const {email, perfil, password, confirmarSenha, matricula, nome} = this.state;
            if(matricula != null && perfil != null && email != null && password != null && confirmarSenha != null && nome!=null){
                if(password != confirmarSenha){
                    this.setState({errorMessage: "'Confirmar Senha' diferente de 'Senha'"}); 
                }else{
                    firebase.auth()
                    .createUserWithEmailAndPassword(email.trim(), password)
                    .then((sucess) =>{
                        this.setState({ isAuthenticated:true});
                        alert('cadastrado com sucesso!');
                        this.navigatoToLogin();
                    }).catch(error => {this.setState({errorMessage : error.message})});
                }
            }else{
                this.setState({errorMessage: "Preencha todos os campos presentes!"});
            }
        }catch (error){
            this.setState({errorMessage : error.message});
        }
    }

    navigateToLogin = () =>{
        this.props.navigation.navigate('Login');
    }
    


    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={logoImg}/>
                </View>
                <View style={styles.body}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu numero de matricula"
                        
                        value={this.state.matricula}
                        onChangeText={matricula=> this.setState({matricula})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu nome"
                        value={this.state.nome}
                        onChangeText={nome=> this.setState({nome})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu sobrenome"
                        value={this.state.sobrenome}
                        onChangeText={sobrenome=> this.setState({sobrenome})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu email"
                        value={this.state.email}
                        onChangeText={email=> this.setState({email})}
                    />

                    {/* <Picker
                    selectedValue={this.state.perfil}
                    style={styles.input}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({perfil: itemValue})
                    }>
                        <Picker.Item label="Usuário Chefe" value="Usuário Chefe" />
                        <Picker.Item label="Chefe Manutenção" value="Chefe Manutenção" />
                    </Picker> */}


                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua senha"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={password=> this.setState({password})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Confirmar senha"
                        secureTextEntry={true}
                        value={this.state.confirmarSenha}
                        onChangeText={confirmarSenha=> this.setState({confirmarSenha})}
                    />
                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.wrongText}>{this.state.errorMessage}</Text>}
                    </View>

                    <TouchableRipple 
                        style={styles.button}
                        rippleColor="#E9EEF3"
                        onPress={this.cadastro}
                    >
                        <View>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                        </View>
                    </TouchableRipple>

                    <TouchableOpacity 
                        style={styles.buttonLogin}
                        rippleColor="#E9EEF3"
                        onPress={this.navigatoToLogin}
                    >
                        <View>
                        <Text style={styles.buttonTextLogin}>Jรก possui login? Clique aqui!</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View> 
        )
    }
} 
