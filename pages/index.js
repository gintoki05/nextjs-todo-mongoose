import Head from 'next/head';
import { useEffect, useState } from 'react';
import Header from '../components/header';
import AddTodo from '../containers/addTodo';
import TodoList from '../containers/todoList';
import axios from 'axios';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(async () => {
    setIsLoading(true);

    const result = await axios.get('http://localhost:3000/api/todo');
    setTodos(result.data.data);

    setIsLoading(false);
  }, []);

  const addTodo = async (todoText) => {
    if (todoText && todoText.length > 0) {
      const result = await axios.post('http://localhost:3000/api/todo', {
        todoText,
      });
      setTodos([...todos, result?.data.data]);
    }
  };

  const editTodoItem = async (todo) => {
    const newTodoText = prompt('Enter new todo text or description:');
    if (newTodoText != null) {
      const result = await axios.put(
        'http://localhost:3000/api/todo/' + todo._id,
        {
          todoText: newTodoText,
        }
      );
      const moddedTodos = todos.map((_todo) => {
        if (_todo._id === todo._id) {
          return result?.data.data;
        } else {
          return _todo;
        }
      });
      setTodos(moddedTodos);
    }
  };

  const deleteTodoItem = async (todo) => {
    if (confirm('Do you really want to delete this item?')) {
      await axios.delete('http://localhost:3000/api/todo/' + todo._id);
      const newTodos = todos.filter((_todo) => _todo._id !== todo._id);
      setTodos(newTodos);
    }
  };

  return (
    <div>
      <Head>
        <title>ToDo app</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      {isLoading === true ? (
        '...Loading'
      ) : (
        <main className='main'>
          <AddTodo addTodo={addTodo} />
          <TodoList
            todos={todos}
            deleteTodoItem={deleteTodoItem}
            editTodoItem={editTodoItem}
          />
        </main>
      )}
    </div>
  );
}
