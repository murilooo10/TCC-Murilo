import React, { useState, useEffect } from 'react';
import {Feather} from '@expo/vector-icons';
import {View, FlatList, Alert, Image, Modal, Text, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import { TextInput } from 'react-native-gesture-handler';
import { Searchbar} from 'react-native-paper';
import {FontAwesome, AntDesign} from '@expo/vector-icons';
import {TouchableRipple} from 'react-native-paper';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

export default function Veiculos(){
    const[veiculos, setVeiculos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [modelo, setModelo] = useState('');
    const [fabricante, setFabricante] = useState('');
    const [placa, setPlaca] = useState('');
    const [chassi, setChassi] = useState('');
    const [cor, setCor] = useState('');
    const [avarias, setAvarias] = useState('');
    const [ano, setAno] = useState('');
    const [renavam, setRenavam] = useState('');
    const [quilometragem, setQuilometragem] = useState('');
    const navigation = useNavigation();


    function navigateToLogin(){
        navigation.navigate('Login');
    }
    function navigateToDetailsVeiculos(veiculos){
        navigation.navigate('DetailsVeiculos', {veiculos});
    }

    async function loadVeiculos(){
        if(loading){
            return;
        }

        if(total > 0 && veiculos.length == total){
            return;
        }

        setLoading(true);

        const response = await api.get('veiculos', {
            params: {page}
        });

        setVeiculos([ ...veiculos, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    async function cadastrarVeiculo(){
        api.post('veiculos', {modelo, fabricante, placa, chassi, cor, renavam, avarias, ano, quilometragem});
    }

    function handleModeloChange(modelo){ setModelo(modelo); }
    function handleFabricanteChange(fabricante){ setFabricante(fabricante); }
    function handlePlacaChange(placa){ setPlaca(placa); }
    function handleChassihange(chassi){ setChassi(chassi); }
    function handleRenavamhange(renavam){ setRenavam(renavam); }
    function handleCorhange(cor){ setCor(cor); }
    function handleAvariasChange(avarias){ setAvarias(avarias); }
    function handleAnoChange(ano){ setAno(ano); }
    function handleQuilometragemChange(quilometragem){ setQuilometragem(quilometragem); }

    useEffect(() => {
        loadVeiculos();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableRipple 
                    rippleColor="#E9EEF3"
                    onPress={()=>{}}
                >

                    <FontAwesome name="power-off" size={24} color="red" />

                </TouchableRipple>
            </View>
            <Text style={styles.description}>Procure um motorista</Text>
            {/* <Searchbar placeholder="Escreva aqui..." style={styles.search} editable={true} value={this.state.search} ></Searchbar> */}
            
            <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            >
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
                        <Text style={styles.description}>Cadastre um Veículo</Text>
                    </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o modelo"
                            onChangeText={handleModeloChange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o fabricante"
                            onChangeText={handleFabricanteChange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite a placa"
                            onChangeText={handlePlacaChange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o chassi"
                            onChangeText={handleChassihange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o renavam"
                            onChangeText={handleRenavamhange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite a cor"
                            onChangeText={handleCorhange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite as avarias"
                            onChangeText={handleAvariasChange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o ano do veículo"
                            onChangeText={handleAnoChange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite a quilometragem"
                            onChangeText={handleQuilometragemChange}
                        />
                        {/* <View style={styles.errorMessage}>
                            {this.state.errorMessage && <Text style={styles.wrongText}>{this.state.errorMessage}</Text>}
                        </View> */}
                        <TouchableRipple 
                            style={styles.button}
                            rippleColor="#E9EEF3"
                            onPress={cadastrarVeiculo}
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
                <Text style={{color:'#FFF', fontWeight:'bold'}}>Adicionar Veículo</Text>
            </TouchableOpacity>


            <FlatList
                style={styles.veichuleList}
                data={veiculos}
                keyExtractor={veiculos => String(veiculos.id)}
                showsVerticalScrollIndicator ={false}
                onEndReached={loadVeiculos}
                onEndReachedThreshold={0.2}
                renderItem={({item: veiculos}) => (
                    <View style={styles.vehicle}>
                        <Text style={styles.vehicleProperty}>Modelo:</Text>
                        <Text style={styles.vehicleValue}>{veiculos.modelo}</Text>
                        
                        <Text style={styles.vehicleProperty}>Fabricante:</Text>
                        <Text style={styles.vehicleValue}>{veiculos.fabricante}</Text>       

                        <Text style={styles.vehicleProperty}>Ano:</Text>
                        <Text style={styles.vehicleValue}>{veiculos.ano}</Text>

                        <Text style={styles.vehicleProperty}>Chassi:</Text>
                        <Text style={styles.vehicleValue}>{veiculos.chassi}</Text>

                        <Text style={styles.vehicleProperty}>Placa:</Text>
                        <Text style={styles.vehicleValue}>{veiculos.placa}</Text>

                        <Text style={styles.vehicleProperty}>Quilometragem:</Text>
                        <Text style={styles.vehicleValue}>{veiculos.quilometragem}</Text>

                        <Text style={styles.vehicleProperty}>Cor:</Text>
                        <Text style={styles.vehicleValue}>{veiculos.cor}</Text>

                        <Text style={styles.vehicleProperty}>Avarias:</Text>
                        <Text style={styles.vehicleValue}>{veiculos.avarias}</Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => navigateToDetailsVeiculos(veiculos)}
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
