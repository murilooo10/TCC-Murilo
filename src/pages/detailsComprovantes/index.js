import React from 'react';
import { View, Image, Text, TouchableOpacity} from 'react-native';
import logoImg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

import styles from './styles';

export default function DetailsComprovantes(){

    const navigation = useNavigation();

    function navigateBack(){
        navigation.goBack();
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
            
            <View style={styles.details}>
                <View style={styles.title}>
                    <Text style={styles.titleComprovante}>Comprovante de Pagamento</Text>
                </View>

                <Text style={[styles.detailsProperty, {marginTop: 0}]}>Motorista:</Text>
                <Text style={styles.detailsValue}>Nomee</Text>

                <Text style={styles.detailsProperty}>Comprovante:</Text>
                <Image style={styles.detailsPhoto} source={logoImg} />

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.delete}>
                        <Text style={styles.deleteText}>Deletar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}