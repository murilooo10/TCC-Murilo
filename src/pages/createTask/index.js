import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Switch,
  StyleSheet,
} from 'react-native';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import Constants from 'expo-constants';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Context } from '../../data/Context';
import api from '../../services/api';

const { width: vw } = Dimensions.get('window');
// moment().format('YYYY/MM/DD')

const styles = StyleSheet.create({
  createTaskButton: {
    width: 252,
    height: 48,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
  seperator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
  },
  notes: {
    color: '#9CAAC4',
    fontSize: 16,
    fontWeight: '600',
  },
  notesContent: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
  },
  learn: {
    height: 23,
    width: 51,
    backgroundColor: '#F8D557',
    justifyContent: 'center',
    borderRadius: 5,
  },
  design: {
    height: 23,
    width: 59,
    backgroundColor: '#62CCFB',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  readBook: {
    height: 23,
    width: 83,
    backgroundColor: '#4CD565',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  title: {
    height: 25,
    borderColor: '#5DD976',
    borderLeftWidth: 1,
    paddingLeft: 8,
    fontSize: 19,
  },
  taskContainer: {
    height: 400,
    width: 327,
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: '#2E66E7',
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 20,
    shadowOpacity: 0.2,
    elevation: 5,
    padding: 22,
  },
  calenderContainer: {
    marginTop: 30,
    width: 350,
    height: 350,
    alignSelf: 'center',
  },
  newTask: {
    alignSelf: 'center',
    fontSize: 20,
    width: 130,
    height: 25,
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    marginTop: 60,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#eaeef7',
  },
});

export default class CreateTask extends Component {
  state = {
    selectedDay: {
      [`${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
        'DD'
      )}`]: {
        selected: true,
        selectedColor: '#2E66E7',
      },
    },
    data: moment().format(),
    titulo: '',
    descricao: '',
    keyboardHeight: 0,
    visibleHeight: Dimensions.get('window').height,
    isAlarmSet: false,
    alarmTime: moment().format(),
    isDateTimePickerVisible: false,
    timeType: '',
    creatTodo: {},
    createEventAsyncRes: '',
  };


  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  // _handleCreateEventData = async value => {
  //   const {
  //     state: {
  //       data,
  //       titulo,
  //       descricao,
  //       isAlarmSet,
  //       alarmTime,
  //       createEventAsyncRes,
  //     },
  //     props: { navigation },
  //   } = this;
  //   const { updateCurrentTask, currentDate } = navigation.state.params;
  //   const creatTodo = {
  //     key: uuid(),
  //     date: `${moment(data).format('YYYY')}-${moment(data).format(
  //       'MM'
  //     )}-${moment(data).format('DD')}`,
  //     todoList: [
  //       {
  //         key: uuid(),
  //         title: titulo,
  //         notes: descricao,
  //         alarm: {
  //           time: alarmTime,
  //           isOn: isAlarmSet,
  //           createEventAsyncRes,
  //         },
  //         color: `rgb(${Math.floor(
  //           Math.random() * Math.floor(256)
  //         )},${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
  //           Math.random() * Math.floor(256)
  //         )})`,
  //       },
  //     ],
  //     markedDot: {
  //       date: data,
  //       dots: [
  //         {
  //           key: uuid(),
  //           color: '#2E66E7',
  //           selectedDotColor: '#2E66E7',
  //         },
  //       ],
  //     },
  //   };

  //   await value.updateTodo(creatTodo);
  //   await updateCurrentTask(currentDate);
  //   navigation.navigate('Agendamento');
  // };

  cadastrarAgendamento = async() =>{

    api.post('pecas', this.setState({titulo, data, hora, descricao}));
  }

  _handleDatePicked = date => {
    const { data } = this.state;
    const selectedDatePicked = data;
    const hour = moment(date).hour();
    const minute = moment(date).minute();
    const newModifiedDay = moment(selectedDatePicked)
      .hour(hour)
      .minute(minute);

    this.setState({
      alarmTime: newModifiedDay,
    });

    this._hideDateTimePicker();
  };

  render() {
    const {
      state: {
        selectedDay,
        data,
        titulo,
        descricao,
        isAlarmSet,
        alarmTime,
      },
      props: { navigation },
    } = this;

    return (

            <View style={styles.container}>
                <ScrollView
                  contentContainerStyle={{
                    paddingBottom: 100,
                  }}
                >
                  <View style={styles.backButton}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Agendamento')}
                      style={{ marginRight: vw / 2 - 120, marginLeft: 20 }}
                    >
                      <Image
                        style={{ height: 25, width: 40 }}
                        source={require('../../assets/back.png')}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>

                    <Text style={styles.newTask}>Agendamento</Text>
                  </View>
                  <View style={styles.calenderContainer}>
                    <CalendarList
                      style={{
                        width: 350,
                        height: 350,
                      }}
                      current={data}
                      minDate={moment().format()}
                      horizontal
                      pastScrollRange={0}
                      pagingEnabled
                      calendarWidth={350}
                      onDayPress={day => {
                        this.setState({
                          selectedDay: {
                            [day.dateString]: {
                              selected: true,
                              selectedColor: '#2E66E7',
                            },
                          },
                          data: day.dateString,
                          alarmTime: day.dateString,
                        });
                      }}
                      monthFormat="MMMM yyyy"
                      hideArrows
                      markingType="simple"
                      theme={{
                        selectedDayBackgroundColor: '#2E66E7',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#2E66E7',
                        backgroundColor: '#eaeef7',
                        calendarBackground: '#eaeef7',
                        textDisabledColor: '#d9dbe0',
                      }}
                      markedDates={selectedDay}
                    />
                  </View>
                  <View style={styles.taskContainer}>
                    <TextInput
                      style={styles.title}
                      onChangeText={text => this.setState({ titulo: text })}
                      value={titulo}
                      placeholder="Titulo"
                    />
                    <View style={styles.notesContent} />
                    <View>
                      <Text style={styles.notes}>Descrição</Text>
                      <TextInput
                        style={{
                          height: 25,
                          fontSize: 19,
                          marginTop: 3,
                        }}
                        onChangeText={text =>
                          this.setState({ descricao: text })
                        }
                        value={descricao}
                        placeholder="Descrição sobre o agendamento"
                      />
                    </View>
                    <View style={styles.seperator} />
                    <View>
                      <Text
                        style={{
                          color: '#9CAAC4',
                          fontSize: 16,
                          fontWeight: '600',
                        }}
                      >
                        Horário
                      </Text>
                      <TouchableOpacity
                        onPress={() => this._showDateTimePicker()}
                        style={{
                          height: 25,
                          marginTop: 3,
                        }}
                        
                      >
                        <Text style={{ fontSize: 19 }}                         
                        onChangeText={text =>
                          this.setState({ hora: text })
                        }>
                          {moment(alarmTime).format('h:mm A')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.seperator} />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            color: '#9CAAC4',
                            fontSize: 16,
                            fontWeight: '600',
                          }}
                        >
                          Alarme
                        </Text>
                        <View
                          style={{
                            height: 25,
                            marginTop: 3,
                          }}
                        >
                          <Text style={{ fontSize: 19 }}>
                            {moment(alarmTime).format('h:mm A')}
                          </Text>
                        </View>
                      </View>
                      <Switch
                        value={isAlarmSet}
                        onValueChange={()=>{}}
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    disabled={titulo === ''}
                    style={[
                      styles.createTaskButton,
                      {
                        backgroundColor:
                          titulo === ''
                            ? 'rgba(46, 102, 231,0.5)'
                            : '#2E66E7',
                      },
                    ]}
                    onPress={async () => {
                      await this.cadastrarAgendamento;
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}
                    >
                      Adicionar Agendamento
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
        )}
}
