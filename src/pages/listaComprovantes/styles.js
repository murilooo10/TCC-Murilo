import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: '#EBF6FF'
        
    },
    containerModal: {
        paddingHorizontal: 24,
        paddingTop: 20,
        
    },
    errorMessage:{
        height:30,
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal:30
    },
    wrongText:{
        fontWeight:'bold',
        color:"#E9446A",
        textAlign:'center',
    },
    header: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headerText: {
        fontSize:15,
        color:'#737380'
    },

    alinharClose: {
        alignSelf:'flex-end',
        paddingBottom:10,
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380',
        fontWeight: 'bold',
        paddingBottom:20
    },

    listaComprovantes: {
        marginTop: 0,
    },

    comprovantes:{
        padding: 24,
        borderRadius: 8,
        backgroundColor:'#fff',
        marginBottom: 16,
    },

    comprovantesProperty: {
        fontSize: 14,
        color:'#41414d',
        fontWeight:'bold'
    },

    comprovantesValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380'
    },

    detailsButton:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },

    detailsButtonText: {
        color: '#4f8cff',
        fontSize: 15,
        fontWeight: 'bold'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
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
      button: {
        height: 60,
        backgroundColor:'#00cc00',
        borderRadius: 8,
        marginTop: 20,
        alignSelf: 'stretch',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    search:{
        marginBottom:30,
    }
});