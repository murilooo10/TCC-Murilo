import { ListView, View} from 'react-native';
import React, { useState, useEffect } from 'react';
import {Image} from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import {FontAwesome} from '@expo/vector-icons';
import { PieChart} from 'react-native-svg-charts'
import { Text  } from 'react-native'
import api from '../../services/api';
import {TouchableRipple} from 'react-native-paper';

export default function Analises(){
  const[pecas, setPecas] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
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
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
}

    useEffect(() => {
      loadPecas();
    }, []);

  const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

    const pieData = pecas.map(({id, nome, quantidade}, index) => ({
      nome,
      quantidade,
      id,
      svg:{
        fill: randomColor()
      }
    })); 
    
    const totalQuantidade = pecas.reduce(getTotal, 0);
    function getTotal(totalQuantidade, pecas){
      return totalQuantidade + pecas.quantidade
    }
    const Labels = ({ slices, height, width }) => {
      return slices.map((slice, index) => {
          const { pieCentroid, pecas } = slice;
          return (
              <Text
                  key={index}
                  x={pieCentroid[ 0 ]}
                  y={pieCentroid[ 1 ]}
                  fill={'blacks'}
                  textAnchor={'middle'}
                  alignmentBaseline={'middle'}
                  fontSize={22}
                  stroke={'black'}
                  strokeWidth={0.2} 
              >
                  {pecas.quantidade}
              </Text>
          )
      })
  }

    return (
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
        <Text style={styles.description}>Analises da quantidade de peças</Text>

        <PieChart 
          style={{ height: 250 }}
          data={pieData}
          valueAccessor={({ item }) => item.quantidade}
          spacing={0}
          outerRadius={'95%'}
        >
          {/* <Labels /> */}
            <Text
              fill="black"
              textAnchor={'middle'}
              alignmentBaseline={'middle'}
              fontSize={22}
              stroke={'black'}
              strokeWidth={0.2} 
            >
              {pieData.nome}
              {pieData.quantidade} 
            </Text>
        </PieChart>

        <View >
          <Text style={[styles.descricao, {fontWeight: "bold"}]}> Total dos tipos de peças: <Text style={[styles.descricao]}>{total}</Text></Text>
          <Text style={[styles.descricao, {fontWeight: "bold"}]}> Quantidade total de peças: 
            <Text style={[styles.descricao]}>{totalQuantidade}</Text>
          </Text>
        </View>
      </View>
    )
}
