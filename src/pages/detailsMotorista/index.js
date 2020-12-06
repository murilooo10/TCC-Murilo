import React from 'react';
import { View, Image, Text, TouchableOpacity} from 'react-native';
import logoImg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import api from '../../services/api';
import styles from './styles';

export default function DetailsMotorista(){


    const navigation = useNavigation();
    const route = useRoute();

    const motoristas = route.params.motoristas;

    function navigateBack(){
        navigation.goBack();
    }

    async function deleteMotoristas(){
        await api.delete(`motoristas/${motoristas.id}`);

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

                <View style={styles.driver}>
                    <View style={styles.title}>
                        <Text style={styles.titleComprovante}>Motorista</Text>
                    </View>

                            <Text style={[styles.driverProperty, {marginTop: 0}]}>Nome Completo:</Text>
                            <Text style={styles.driverValue}>{motoristas.nome}</Text>

                            <Text style={styles.driverProperty}>Idade:</Text>
                            <Text style={styles.driverValue}>{motoristas.idade}</Text>

                            <Text style={styles.driverProperty}>RG:</Text>
                            <Text style={styles.driverValue}>{motoristas.rg}</Text>

                            <Text style={styles.driverProperty}>CPF:</Text>
                            <Text style={styles.driverValue}>{motoristas.cpf}</Text>

                            <Text style={styles.driverProperty}>Sexo:</Text>
                            <Text style={styles.driverValue}>{motoristas.sexo}</Text>

                            <Text style={styles.driverProperty}>Nº da carteira de trabalho:</Text>
                            <Text style={styles.driverValue}>{motoristas.carteira_trabalho}</Text>

                            <Text style={styles.driverProperty}>CNH:</Text>
                            <Text style={styles.driverValue}>{motoristas.cnh}</Text>

                    <View style={styles.actions}>
                        <TouchableOpacity style={[styles.action, {backgroundColor:'#4f8cff'}]}>
                            <Text style={styles.actionText}>Salvar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.action} onPress={deleteMotoristas}>
                            <Text style={styles.actionText}>Deletar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
    )
}