import React, {useState} from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import {images} from '../images';
import Input from './input';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({theme}) => theme.itemBackground};
  opacity: ${({completed}) => (completed ? 0.5 : 1)};
  border-radius: 10px;
  padding: 5px;
  margin: 3px 0px;
`;

const Contents = styled.Text`
  flex: 1;
  font-size: 24px;
  color: ${({theme, completed}) => (completed ? theme.done : theme.text)};
  text-decoration-line: ${({completed}) =>
    completed ? 'line-through' : 'none'};
`;

const Task = ({item, deleteTask, toggleTask, updateTask}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);

  const _handleupdateButtonPress = () => {
    setIsEditing(!isEditing);
  };
  const _onChangeText = text => {
    setText(text);
  };
  const _onSubmitEditing = () => {
    if (isEditing) {
      const editedTask = Object.assign({}, item, {text});
      setIsEditing(false);
      updateTask(editedTask);
    }
  };

  return isEditing ? (
    <Input
      placeholder="Adit a Task"
      value={text}
      onChangeText={_onChangeText}
      onSubmitEditing={_onSubmitEditing}
    />
  ) : (
    <Container completed={item.completed}>
      <IconButton
        type={item.completed ? images.completed : images.uncompleted}
        id={item.id}
        onPressOut={toggleTask}
        completed={item.completed}
      />
      <Contents completed={item.completed}>{item.text}</Contents>
      <IconButton
        type={item.completed ? images.editOff : images.update}
        completed={item.completed}
        id={item.id}
        onPressOut={_handleupdateButtonPress}
      />
      <IconButton
        type={images.delete}
        id={item.id}
        onPressOut={deleteTask}
        completed={item.completed}
      />
    </Container>
  );
};

Task.propTypes = {
  item: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
};

export default Task;
