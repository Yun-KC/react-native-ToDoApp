import React, {useState} from 'react';
import styled, {ThemeProvider} from 'styled-components/native';
import {theme as themes} from './theme';
import {StatusBar, Dimensions} from 'react-native';
import Input from './components/input';
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
  const [tasks, setTasks] = useState({});

  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: {id: ID, text: newTask, completed: false},
    };
    setTasks({...tasks, ...newTaskObject});
    setNewTask('');
  };
  const _deleteTask = id => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    setTasks(currentTasks);
  };
  const _toggleTask = id => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id].completed = !currentTasks[id].completed;
    setTasks(currentTasks);
  };
  const _updateTask = item => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    setTasks(currentTasks);
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
          {Object.values(tasks)
            .reverse()
            .map(item => (
              <Task
                item={item}
                key={item.id}
                deleteTask={_deleteTask}
                toggleTask={_toggleTask}
                updateTask={_updateTask}
              />
            ))}
        </List>
      </Container>
    </ThemeProvider>
  );
};
