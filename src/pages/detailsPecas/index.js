import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity} from 'react-native';
import logoImg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import api from '../../services/api';
import styles from './styles';

export default function DetailsPecas(){
    const [quantidade, setQuantidade] = useState('');
    const navigation = useNavigation();
    const route = useRoute();

    const pecas = route.params.pecas;
    function navigateBack(){
        navigation.goBack();
    }

    function handleQuantidadeChange(quantidade){ setQuantidade(quantidade); }

    async function deletePecas(){

        await api.delete(`pecas/${pecas.id}`);

        navigateBack();

    }
    async function updatePecas(){
        await api.put(`pecas/${pecas.id}`, {quantidade});

        navigateBack();
    }
    return(
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={navigateBack} >
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
                <Image source={logoImg} />
            </View>

            <View style={styles.pecas}>
                <View style={styles.title}>
                    <Text style={styles.titleComprovante}>Peças</Text>
                </View>

                <Text style={[styles.pecasProperty, {marginTop: 0}]}>Peça:</Text>
                <Text style={styles.pecasValue}>{pecas.nome}</Text>

                <Text style={styles.pecasProperty}>Modelo:</Text>
                <Text style={styles.pecasValue}>{pecas.marca}</Text>

                <Text style={styles.pecasProperty}>Quantidade:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Qual a nova quantidade desta peça?"
                    onChangeText={handleQuantidadeChange}
                />
                
                <Text style={styles.pecasProperty}>Preço:</Text>
                <Text style={styles.pecasValue}>{Intl.NumberFormat('pt-BR', {style:"currency", currency: "BRL"}).format(pecas.valor)}</Text>

                <Text style={styles.pecasProperty}>ICMS:</Text>
                <Text style={styles.pecasValue}>{(pecas.icms * 100) +'%'}</Text>

                <Text style={styles.pecasProperty}>Valor Ajustado:</Text>
                <Text style={styles.pecasValue}>{Intl.NumberFormat('pt-BR', {style:"currency", currency: "BRL"}).format((pecas.valor * pecas.icms) + pecas.valor)}</Text>
                
                <Text style={styles.pecasProperty}>Fornecedor:</Text>
                <Text style={styles.pecasValue}>{pecas.fornecedor}</Text>
                
                <Text style={styles.pecasProperty}>Descrição:</Text>
                <Text style={styles.pecasValue}>{pecas.descricao}</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={[styles.action, {backgroundColor:'#4f8cff'}]} onPress={updatePecas}>
                        <Text style={styles.actionText}>Salvar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={deletePecas}>
                        <Text style={styles.actionText}>Deletar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}