import React, { useState, useEffect } from 'react';
import {View, FlatList, ScrollView, RefreshControl, Image, Modal, Text, TouchableOpacity, Picker} from 'react-native';
import firebase from 'firebase';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import { Searchbar} from 'react-native-paper';
import {FontAwesome, AntDesign} from '@expo/vector-icons';
import {TouchableRipple} from 'react-native-paper';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';


export default function Pecas(){
    const[pecas, setPecas] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [arrayholder, setArrayholder] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState(0);
    const [icms, setIcms] = useState("3%");
    const [fornecedor, setFornecedor] = useState("Fornecedor...");
    const [descricao, setDescricao] = useState("Descrição da peça");
    const navigation = useNavigation();

    function navigateToDetailsPecas(pecas){
        navigation.navigate('DetailsPecas', {pecas});
    }

    async function loadPecas(){
        if(loading){
            return;
        }

        if(total > 0 && pecas.length == total){
            return;
        }

        
        setLoading(true);

        const response = await api.get('pecas', {
            params: {page}
        });

        setPecas([ ...pecas, ...response.data]);
        setArrayholder([ ...pecas, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    async function searchFilterFunction(text){
            const newData = arrayholder.filter(item => {      
                const itemData = `${item.nome.toUpperCase()}   
                ${item.marca.toUpperCase()} ${item.quantidade.toUpperCase()}`;
                
                const textData = text.toUpperCase();
                    
                return itemData.indexOf(textData) > -1;    
                });
                
                setPecas(newData);
                
    }

    function handleNomeChange(nome){ setNome(nome); }
    function handleMarcaChange(marca){ setMarca(marca); }
    function handleQuantidadeChange(quantidade){ setQuantidade(quantidade); }
    function handleValorChange(valor){ setValor(valor); }
    function handleDescricaoChange(descricao){ setDescricao(descricao); }


    async function cadastrarPecas(){

        api.post('pecas', {nome, marca, quantidade, valor, icms, fornecedor, descricao});
    }

    useEffect(() => {
        loadPecas();
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

            <Text style={styles.description}>Peças</Text>
            <Searchbar placeholder="Escreva aqui..." style={styles.search} autoCorrect={false} onChangeText={text => searchFilterFunction(text)} ></Searchbar>

            <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);

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
                        <Text style={styles.description}>Cadastre uma Peça</Text>
                    </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Qual o nome da Peça?"
                            onChangeText={handleNomeChange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Qual a marca da Peça?"
                            onChangeText={handleMarcaChange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Quantas peças estão no estoque?"
                            onChangeText={handleQuantidadeChange}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Qual o valor da peça?"
                            onChangeText={handleValorChange}
                        />
                        <Picker
                            selectedValue={icms}
                            style={styles.input}
                            onValueChange={(icms, itemIndex) => setIcms(icms)}
                        >
                            <Picker.Item label="3%" value={3/100} />
                            <Picker.Item label="5%" value={5/100} />
                            <Picker.Item label="8%" value={8/100} />
                        </Picker>

                        <Picker
                            selectedValue={fornecedor}
                            style={styles.input}
                            onValueChange={(fornecedor, itemIndex) => setFornecedor(fornecedor)}
                        >
                            <Picker.Item label="Fornecedor..." value='' />
                            <Picker.Item label="RTCarImport" value="rtcarimport" />
                            <Picker.Item label="Dinpar" value="dinapar" />
                        </Picker>
                        <TextInput
                            style={styles.input}
                            placeholder="Descreva a peça?"
                            onChangeText={handleDescricaoChange}
                        />
                        {/* <View style={styles.errorMessage}>
                            {this.state.errorMessage && <Text style={styles.wrongText}>{this.state.errorMessage}</Text>}
                        </View> */}
                        <TouchableRipple 
                            style={styles.button}
                            rippleColor="#E9EEF3"
                            onPress={cadastrarPecas}
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
                <Text style={{color:'#FFF', fontWeight:'bold'}}>Adicionar Peças</Text>
            </TouchableOpacity>

            <FlatList
                style={styles.listaPecas}
                data={pecas}
                keyExtractor={(pecas) => String(pecas.id)}
                showsVerticalScrollIndicator ={false}
                onEndReached={loadPecas}
                onEndReachedThreshold={0.2}
                renderItem={({item: pecas}) => (
                    <View style={styles.pecas}>
                        <Text style={styles.pecasProperty}>Peça:</Text>
                            <Text style={styles.pecasValue}>{pecas.nome}</Text>

                        <Text style={styles.pecasProperty}>Quantidade:</Text>
                        <Text style={styles.pecasValue}>{pecas.quantidade}</Text>

                        <Text style={styles.pecasProperty}>Descrição:</Text>
                        <Text style={styles.pecasValue}>{pecas.descricao}</Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => navigateToDetailsPecas(pecas)}
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
