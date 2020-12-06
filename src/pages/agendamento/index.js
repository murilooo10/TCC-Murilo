import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  Text,
  Dimensions,
  TextInput,
  Switch,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import moment from 'moment';
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';
import Constants from 'expo-constants';

import CalendarStrip from 'react-native-calendar-strip';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Context } from '../../data/Context';
import { Task } from '../../components/Task';
import styles from './styles.js';
import CreateTask from '../createTask'

export default class Agendamento extends Component {
  state = {
    datesWhitelist: [
      {
        start: moment(),
        end: moment().add(365, 'days'), // total 4 days enabled
      },
    ],
    todoList: [],
    markedDate: [],
    currentDate: `${moment().format('DD')}-${moment().format('MM')}-${moment().format('YYYY')}`,
    isModalVisible: false,
    selectedTask: null,
    isDateTimePickerVisible: false,
  };

  componentWillMount() {
    this._handleDeletePreviousDayTask();
  }

  _handleDeletePreviousDayTask = async () => {
    const { currentDate } = this.state;
    try {
      const value = await AsyncStorage.getItem('TODO');

      if (value !== null) {
        const todoList = JSON.parse(value);
        const todayDate = `${moment().format('DD')}-${moment().format('MM')}-${moment().format('YYYY')}`;
        const checkDate = moment(todayDate);
        await todoList.filter(item => {
          const currDate = moment(item.date);
          const checkedDate = checkDate.diff(currDate, 'days');
          if (checkedDate > 0) {
            item.todoList.forEach(async listValue => {
              try {
                await Calendar.deleteEventAsync(
                  listValue.alarm.createEventAsyncRes.toString()
                );
              } catch (error) {
                console.log(error);
              }
            });
            return false;
          }
          return true;
        });

        // await AsyncStorage.setItem('TODO', JSON.stringify(updatedList));
        this._updateCurrentTask(currentDate);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  _handleModalVisible = () => {
    const { isModalVisible } = this.state;
    this.setState({
      isModalVisible: !isModalVisible,
    });
  };

  _updateCurrentTask = async currentDate => {
    try {
      const value = await AsyncStorage.getItem('TODO');
      if (value !== null) {
        const todoList = JSON.parse(value);
        const markDot = todoList.map(item => item.markedDot);
        const todoLists = todoList.filter(item => {
          if (currentDate === item.date) {
            return true;
          }
          return false;
        });
        if (todoLists.length !== 0) {
          this.setState({
            markedDate: markDot,
            todoList: todoLists[0].todoList,
          });
        } else {
          this.setState({
            markedDate: markDot,
            todoList: [],
          });
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    const { selectedTask } = this.state;
    const prevSelectedTask = { ...selectedTask };
    const selectedDatePicked = prevSelectedTask.alarm.time;
    const hour = moment(date).hour();
    const minute = moment(date).minute();
    const newModifiedDay = moment(selectedDatePicked)
      .hour(hour)
      .minute(minute);

    prevSelectedTask.alarm.time = newModifiedDay;
    this.setState({
      selectedTask: prevSelectedTask,
    });

    this._hideDateTimePicker();
  };

  handleAlarmSet = () => {
    const { selectedTask } = this.state;
    const prevSelectedTask = { ...selectedTask };
    prevSelectedTask.alarm.isOn = !prevSelectedTask.alarm.isOn;
    this.setState({
      selectedTask: prevSelectedTask,
    });
  };

  _updateAlarm = async () => {
    const { selectedTask } = this.state;
    const calendarId = await this._createNewCalendar();
    const event = {
      title: selectedTask.title,
      notes: selectedTask.notes,
      startDate: moment(selectedTask.alarm.time)
        .add(0, 'm')
        .toDate(),
      endDate: moment(selectedTask.alarm.time)
        .add(5, 'm')
        .toDate(),
      timeZone: Localization.timezone,
    };

    if (selectedTask.alarm.createEventAsyncRes === '') {
      try {
        const createEventAsyncRes = await Calendar.createEventAsync(
          calendarId.toString(),
          event
        );
        const updateTask = { ...selectedTask };
        updateTask.alarm.createEventAsyncRes = createEventAsyncRes;
        this.setState({
          selectedTask: updateTask,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await Calendar.updateEventAsync(
          selectedTask.alarm.createEventAsyncRes.toString(),
          event
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  _deleteAlarm = async () => {
    const { selectedTask } = this.state;
    console.log(selectedTask.alarm);

    try {
      await Calendar.deleteEventAsync(selectedTask.alarm.createEventAsyncRes);

      const updateTask = { ...selectedTask };
      updateTask.alarm.createEventAsyncRes = '';
      this.setState({
        selectedTask: updateTask,
      });
    } catch (error) {
      console.log(error);
    }
  };

  _getEvent = async () => {
    const { selectedTask } = this.state;

    if (selectedTask.alarm.createEventAsyncRes) {
      try {
        await Calendar.getEventAsync(
          selectedTask.alarm.createEventAsyncRes.toString()
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  _findCalendars = async () => {
    const calendars = await Calendar.getCalendarsAsync();

    return calendars;
  };

  _createNewCalendar = async () => {
    const calendars = await this._findCalendars();
    const newCalendar = {
      title: 'test',
      entityType: Calendar.EntityTypes.EVENT,
      color: '#2196F3',
      sourceId:
        Platform.OS === 'ios'
          ? calendars.find(cal => cal.source && cal.source.name === 'Default')
              .source.id
          : undefined,
      source:
        Platform.OS === 'android'
          ? {
              name: calendars.find(
                cal => cal.accessLevel === Calendar.CalendarAccessLevel.OWNER
              ).source.name,
              isLocalAccount: true,
            }
          : undefined,
      name: 'test',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
      ownerAccount:
        Platform.OS === 'android'
          ? calendars.find(
              cal => cal.accessLevel === Calendar.CalendarAccessLevel.OWNER
            ).ownerAccount
          : undefined,
    };

    let calendarId = null;

    try {
      calendarId = await Calendar.createCalendarAsync(newCalendar);
    } catch (e) {
      Alert.alert(e.message);
    }

    return calendarId;
  };

  render() {
    const {
      state: {
        datesWhitelist,
        markedDate,
        todoList,
        isModalVisible,
        selectedTask,
        isDateTimePickerVisible,
        currentDate,
      },
      props: { navigation },
    } = this;

    return (
      <Context.Consumer>
        {value => (
          <>
            {selectedTask !== null && (
              <Task isModalVisible={isModalVisible}>
                <DateTimePicker
                  isVisible={isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                  mode="time"
                />
                <View style={styles.taskContainer}>
                  <TextInput
                    style={styles.title}
                    onChangeText={text => {
                      const prevSelectedTask = { ...selectedTask };
                      prevSelectedTask.title = text;
                      this.setState({
                        selectedTask: prevSelectedTask,
                      });
                    }}
                    value={selectedTask.title}
                    placeholder="O que você precisa fazer?"
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#BDC6D8',
                      marginVertical: 10,
                    }}
                  >
                    Suggestion
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.readBook}>
                      <Text style={{ textAlign: 'center', fontSize: 14 }}>
                        Read book
                      </Text>
                    </View>
                    <View style={styles.design}>
                      <Text style={{ textAlign: 'center', fontSize: 14 }}>
                        Design
                      </Text>
                    </View>
                    <View style={styles.learn}>
                      <Text style={{ textAlign: 'center', fontSize: 14 }}>
                        Learn
                      </Text>
                    </View>
                  </View>
                  <View style={styles.notesContent} />
                  <View>
                    <Text
                      style={{
                        color: '#9CAAC4',
                        fontSize: 16,
                        fontWeight: '600',
                      }}
                    >
                      Notes
                    </Text>
                    <TextInput
                      style={{
                        height: 25,
                        fontSize: 19,
                        marginTop: 3,
                      }}
                      onChangeText={text => {
                        const prevSelectedTask = { ...selectedTask };
                        prevSelectedTask.notes = text;
                        this.setState({
                          selectedTask: prevSelectedTask,
                        });
                      }}
                      value={selectedTask.notes}
                      placeholder="Detalhe sobre o que precisa ser feito."
                    />
                  </View>
                  <View style={styles.sepeerator} />
                  <View>
                    <Text
                      style={{
                        color: '#9CAAC4',
                        fontSize: 16,
                        fontWeight: '600',
                      }}
                    >
                      Times
                    </Text>
                    <TouchableOpacity
                      onPress={() => this._showDateTimePicker()}
                      style={{
                        height: 25,
                        marginTop: 3,
                      }}
                    >
                      <Text style={{ fontSize: 19 }}>
                        {moment(selectedTask.alarm.time).format('h:mm A')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.sepeerator} />
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
                        Alarm
                      </Text>
                      <View
                        style={{
                          height: 25,
                          marginTop: 3,
                        }}
                      >
                        <Text style={{ fontSize: 19 }}>
                          {moment(selectedTask.alarm.time).format('h:mm A')}
                        </Text>
                      </View>
                    </View>
                    <Switch
                      value={selectedTask.alarm.isOn}
                      onValueChange={this.handleAlarmSet}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <TouchableOpacity
                      onPress={async () => {
                        this._handleModalVisible();
                        if (selectedTask.alarm.isOn) {
                          await this._updateAlarm();
                        } else {
                          await this._deleteAlarm();
                        }
                        await value.updateSelectedTask({
                          date: currentDate,
                          todo: selectedTask,
                        });
                        this._updateCurrentTask(currentDate);
                      }}
                      style={styles.updateButton}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          textAlign: 'center',
                          color: '#fff',
                        }}
                      >
                        UPDATE
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={async () => {
                        this._handleModalVisible();
                        this._deleteAlarm();
                        await value.deleteSelectedTask({
                          date: currentDate,
                          todo: selectedTask,
                        });
                        this._updateCurrentTask(currentDate);
                      }}
                      style={styles.deleteButton}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          textAlign: 'center',
                          color: '#fff',
                        }}
                      >
                        DELETE
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Task>
            )}
            <View
              style={{
                flex: 1,
                paddingTop: Constants.statusBarHeight,
              }}
            >
              <CalendarStrip
                ref={ref => {
                  this.calenderRef = ref;
                }}
                calendarAnimation={{ type: 'sequence', duration: 30 }}
                style={{
                  height: 150,
                  paddingTop: 20,
                  paddingBottom: 20,
                }}
                calendarHeaderStyle={{ color: '#000000' }}
                dateNumberStyle={{ color: '#000000', paddingTop: 10 }}
                dateNameStyle={{ color: '#BBBBBB' }}
                highlightDateNumberStyle={{
                  color: '#fff',
                  backgroundColor: '#2E66E7',
                  marginTop: 10,
                  height: 35,
                  width: 35,
                  textAlign: 'center',
                  borderRadius: 17.5,
                  overflow: 'hidden',
                  paddingTop: 6,
                  fontWeight: '400',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                highlightDateNameStyle={{ color: '#2E66E7' }}
                disabledDateNameStyle={{ color: 'grey' }}
                disabledDateNumberStyle={{ color: 'grey', paddingTop: 10 }}
                datesWhitelist={datesWhitelist}
                iconLeft={require('../../assets/left-arrow.png')}
                iconRight={require('../../assets/right-arrow.png')}
                iconContainer={{ flex: 0.1 }}
                markedDates={markedDate}
                onDateSelected={date => {
                  const selectedDate = `${moment(date).format('YYYY')}-${moment(date).format('MM')}-${moment(date).format('DD')}`;
                  this._updateCurrentTask(selectedDate);
                  this.setState({
                    currentDate: selectedDate,
                  });
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('CreateTask', {
                    updateCurrentTask: this._updateCurrentTask,
                    currentDate,
                    createNewCalendar: this._createNewCalendar,
                  })
                }
                style={styles.viewTask}
              >
                <Image
                  source={require('../../assets/plus.png')}
                  style={{
                    height: 30,
                    width: 30,
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  width: '100%',
                  height: Dimensions.get('window').height - 170,
                }}
              >
                <ScrollView
                  contentContainerStyle={{
                    paddingBottom: 20,
                  }}
                >
                  {todoList.map(item => (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState(
                          {
                            selectedTask: item,
                            isModalVisible: true,
                          },
                          () => {
                            this._getEvent();
                          }
                        );
                      }}
                      key={item.key}
                      style={styles.taskListContent}
                    >
                      <View
                        style={{
                          marginLeft: 13,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <View
                            style={{
                              height: 12,
                              width: 12,
                              borderRadius: 6,
                              backgroundColor: item.color,
                              marginRight: 8,
                            }}
                          />
                          <Text
                            style={{
                              color: '#554A4C',
                              fontSize: 20,
                              fontWeight: '700',
                            }}
                          >
                            {item.title}
                          </Text>
                        </View>
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginLeft: 20,
                            }}
                          >
                            <Text
                              style={{
                                color: '#BBBBBB',
                                fontSize: 14,
                                marginRight: 5,
                              }}
                            >{`${moment(item.alarm.time).format(
                              'YYYY'
                            )}/${moment(item.alarm.time).format('MM')}/${moment(
                              item.alarm.time
                            ).format('DD')}`}</Text>
                            <Text
                              style={{
                                color: '#BBBBBB',
                                fontSize: 14,
                              }}
                            >
                              {item.notes}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          height: 80,
                          width: 5,
                          backgroundColor: item.color,
                          borderRadius: 5,
                        }}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </>
        )}
      </Context.Consumer>
    );
  }
}