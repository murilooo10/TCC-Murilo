import React, { useState, useEffect } from 'react';
import {Feather} from '@expo/vector-icons';
import {View, FlatList, Alert, Image, Modal, Text, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import { TextInput } from 'react-native-gesture-handler';
import { Searchbar} from 'react-native-paper';
import {FontAwesome, AntDesign} from '@expo/vector-icons';
import {TouchableRipple} from 'react-native-paper';
import api from '../../services/api';
import {useNavigation} from '@react-navigation/native';


export default function Motoristas(){

    const[motoristas, setMotoristas] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [matricula, setMatricula] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [idade, setIdade] = useState('');
    const [sexo, setSexo] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [cnh, setCnh] = useState('');
    const [carteira_trabalho, setCarteira_trabalho] = useState('');
    const [valor_venda, setValor_venda] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    function navigateToLogin(){
        navigation.navigate('Login');
    }

    function navigateToDetailsMotoristas(motoristas){
        navigation.navigate('DetailsMotorista', {motoristas});
    }

    async function loadMotoristas(){
        if(loading){
            return;
        }

        if(total > 0 && motoristas.length == total){
            return;
        }

        
        setLoading(true);

        const response = await api.get('motoristas', {
            params: {page}
        });

        setMotoristas([ ...motoristas, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    function handleMatriculaChange(matricula){ setMatricula(matricula); }
    function handleNomeChange(nome){ setNome(nome); }
    function handleSobrenomeChange(sobrenome){ setSobrenome(sobrenome); }
    
    function handleIdadeChange(idade){ setIdade(idade); }
    function handleSexoChange(sexo){ setSexo(sexo); }
    function handleRGChange(rg){ setRg(rg); }
    function handleCPFChange(cpf){ setCpf(cpf); }
    function handleCNHChange(cnh){ setCnh(cnh); }
    function handleCarteiraTrabalhoChange(carteira_trabalho){ setCarteira_trabalho(carteira_trabalho); }
    function handleValorVendaChange(valor_venda){ setValor_venda(valor_venda); }
    function handleEmailChange(email){ setEmail(email); }
    function handlePasswordChange(password){ setPassword(password); }


    async function cadastrarMotorista(){
        api.post('motoristas', {matricula, nome, sobrenome, idade, sexo, rg, cpf, cnh, carteira_trabalho, valor_venda, email, password});
    }

    useEffect(() => {
        loadMotoristas();
    }, []);

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

            {/* <Text style={styles.description}>Procure um motorista</Text>
            <Searchbar placeholder="Escreva aqui..." style={styles.search} editable={true} value={this.state.search} ></Searchbar> */}
           <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}>
                <View style={styles.modalView}>
                    <TouchableRipple
                        style={styles.alinharClose}
                        rippleColor="#E9EEF3"
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                        >
                        <AntDesign name="close" size={20} color="#D3D3D3" />
                    </TouchableRipple>
                    <View style={styles.header}>
                        <Text style={styles.description}>Cadastre um Motorista</Text>
                    </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite a Matricula"
                            onChangeText={handleMatriculaChange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o nome"
                            onChangeText={handleNomeChange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o sobrenome"
                            onChangeText={handleSobrenomeChange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite a idade"
                            onChangeText={handleIdadeChange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o sexo"
                            onChangeText={handleSexoChange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite RG"
                            onChangeText={handleRGChange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o CPF"
                            onChangeText={handleCPFChange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite a CNH"
                            onChangeText={handleCNHChange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o número da carteira de trabalho"
                            onChangeText={handleCarteiraTrabalhoChange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o valor de venda"
                            onChangeText={handleValorVendaChange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o email"
                            onChangeText={handleEmailChange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite a senha"
                            secureTextEntry={true}
                            onChangeText={handlePasswordChange}
                        />
                        {/* <View style={styles.errorMessage}>
                            {this.state.errorMessage && <Text style={styles.wrongText}>{this.state.errorMessage}</Text>}
                        </View> */}
                        <TouchableRipple 
                            style={styles.button}
                            rippleColor="#E9EEF3"
                            onPress={cadastrarMotorista}
                        >
                            <View>
                            <Text style={styles.textStyle}>Cadastrar</Text>
                            </View>
                        </TouchableRipple>
                </View>
            </Modal>
            
            <TouchableOpacity 
                style={styles.detailsButtonAdd} 
                rippleColor="#E9EEF3"
                onPress={() => {
                    setModalVisible(true);
                }}
            >  
                <Text style={{color:'#FFF', fontWeight:'bold'}}>Adicionar Motorista</Text>
            </TouchableOpacity>
            <FlatList
                style={styles.driverList}
                data={motoristas}
                keyExtractor={(motoristas) => String(motoristas.id)}
                onEndReached={loadMotoristas}
                onEndReachedThreshold={0.2}
                showsVerticalScrollIndicator ={false}
                renderItem={({item: motoristas}) => (
                    <View style={styles.driver}>
                        <Text style={styles.driverProperty}>Nome Completo:</Text>
                        <Text style={styles.driverValue}>{motoristas.nome}</Text>

                        <Text style={styles.driverProperty}>CPF:</Text>
                        <Text style={styles.driverValue}>{motoristas.cpf}</Text>

                        <Text style={styles.driverProperty}>CNH:</Text>
                        <Text style={styles.driverValue}>{motoristas.cnh}</Text>

                        <Text style={styles.driverProperty}>Email:</Text>
                        <Text style={styles.driverValue}>{motoristas.email}</Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={navigateToDetailsMotoristas}
                        >
                            <Text style={styles.detailsButtonText}>Ver detalhes</Text>
                            <AntDesign name="right" size={24} color="#4f8cff" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}
