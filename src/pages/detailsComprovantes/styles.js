import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal:24,
        paddingTop:Constants.statusBarHeight + 20,
    },

    header: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },

    titleComprovante: {
        marginBottom:20,
        fontWeight:'bold',
        fontSize: 20,
        lineHeight: 30,
    },
    title: {
        alignItems:'center',
        justifyContent:'center',
    },

    details: {
        padding: 24,
        borderRadius: 8,
        backgroundColor:'#fff',
        marginBottom: 16,
        marginTop: 24,
    },
    detailsProperty: {
        fontSize: 14,
        color:'#41414d',
        fontWeight:'bold',
        marginTop: 24,
    },

    detailsValue: {
        marginTop: 8,
        fontSize: 15,
        color: '#737380'
    },
    actions: {
        marginTop: 16,
    },
    delete: {
        backgroundColor:'#e02041',
        borderRadius: 8,
        height: 50,
        justifyContent:'center',
        alignItems:'center'
    },
    deleteText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    }
    
})