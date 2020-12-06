import React, {useEffect} from 'react';
import { View, Image, Text, TouchableOpacity} from 'react-native';
import logoImg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import api from '../../services/api';

import styles from './styles';

export default function DetailsVeiculos(){

    const navigation = useNavigation();
    const route = useRoute();


    const veiculos = route.params.veiculos;
    function navigateBack(){
        navigation.goBack();
    }

    async function deleteVeiculos(){

        await api.delete(`veiculos/${veiculos.id}`);

        navigateBack();

    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={navigateBack} >
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
                <Image source={logoImg} />
            </View>

                <View style={styles.vehicle}>
                    <View style={styles.title}>
                        <Text style={styles.titleComprovante}>Veículos</Text>
                    </View>

                    <Text style={[styles.vehicleProperty, {marginTop:0}]}>Modelo:</Text>
                    <Text style={styles.vehicleValue}>{veiculos.modelo}</Text>
                    
                    <Text style={styles.vehicleProperty}>Fabricante:</Text>
                    <Text style={styles.vehicleValue}>{veiculos.fabricante}</Text>

                    <Text style={styles.vehicleProperty}>Chassi:</Text>
                    <Text style={styles.vehicleValue}>{veiculos.chassi}</Text>

                    <Text style={styles.vehicleProperty}>Placa:</Text>
                    <Text style={styles.vehicleValue}>{veiculos.placa}</Text>

                    <Text style={styles.vehicleProperty}>Quilometragem:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="quilometragem"
                        value={veiculos.quilometragem}
                    />

                    <Text style={styles.vehicleProperty}>Cor:</Text>
                    <Text style={styles.vehicleValue}>{veiculos.cor}</Text>

                    <Text style={styles.vehicleProperty}>Avarias:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nenhuma"
                        value={veiculos.avarias}
                    />

                    <View style={styles.actions}>
                        <TouchableOpacity style={[styles.action, {backgroundColor:'#4f8cff'}]}>
                            <Text style={styles.actionText}>Salvar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.action} onPress={deleteVeiculos}>
                            <Text style={styles.actionText}>Deletar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
    )
}