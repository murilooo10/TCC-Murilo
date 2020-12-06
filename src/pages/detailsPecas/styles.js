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

    pecas: {
        padding: 24,
        borderRadius: 8,
        backgroundColor:'#fff',
        marginBottom: 60,
        marginTop: 24,
    },
    pecasProperty: {
        fontSize: 14,
        color:'#41414d',
        fontWeight:'bold',
        marginTop: 24,
    },

    pecasValue: {
        marginTop: 8,
        fontSize: 15,
        color: '#737380'
    },
    actions: {
        marginTop: 16,
        justifyContent: 'space-between',
        flexDirection:'row',
    },
    action: {
        backgroundColor:'#e02041',
        borderRadius: 8,
        height: 50,
        width: '48%',
        justifyContent:'center',
        alignItems:'center'
    },
    input: {
        height: 50,
        backgroundColor:'#fff',
        borderRadius: 8,
        alignSelf: 'stretch',
        borderColor: '#eee', 
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 8,
    },
    actionText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    }
    
})