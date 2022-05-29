import React, {useState} from 'react';
import styled, {ThemeProvider} from 'styled-components/native';
import {theme as themes} from './theme';
import {StatusBar, Dimensions} from 'react-native';
import Input from './components/input';
import {images} from './images';
import IconButton from './components/IconButton';
import Task from './components/Task';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;
const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({theme}) => theme.main};
  align-self: flex-start;
  margin: 0px 20px;
`;

const List = styled.ScrollView`
  flex: 1;
  width: ${({width}) => width - 40}px;
`;

export default () => {
  const width = Dimensions.get('window').width;
  const [newTask, setNewTask] = useState('');
  const _addTask = () => {
    setNewTask('');
  };
  const _handleTextChange = text => {
    setNewTask(text);
  };

  return (
    <ThemeProvider theme={themes}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={themes.background}
        />
        <Title>ToDo List</Title>
        <Input
          placeholder="+ Add a Task"
          value={newTask}
          onChangeText={_handleTextChange}
          onSubmitEditing={_addTask}
        />
        <List width={width}>
          <Task text="우헤" />
          <Task text="우헤" />
          <Task text="우헤" />
          <Task text="우헤" />
          <Task text="우헤" />
          <Task text="우헤" />
          <Task text="우헤" />
          <Task text="우헤" />
          <Task text="우헤" />
          <Task text="우헤" />
          <Task text="우헤" />
        </List>
      </Container>
    </ThemeProvider>
  );
};
