// import { createStore } from 'redux'

// const add = document.getElementById("add");
// const minus = document.getElementById("minus");
// const number = document.querySelector("span");

// // constant로 정의해놓는 이유는 action.type에 직접 string을 줬을때 잘못된 이름을주면 에러가 나지 않아 찾기힘들다. 
// // 정의를 해놓으면 오타가났을시 const is not define 이라는 에러를 알려줘서 금방 고칠수있다.
// const ADD = 'ADD';
// const MINUS = 'MINUS';

// // reduser는 함수이고 state를 modify한다. data modifiyer라고 생각하면됨. mutation같은?
// // return 값이 state가 된다.
// // action : reduser와 소통하는(어떤걸 return해야하는지...) 함수?
// const countModifier = (state = 0, action) => {
//   switch(action.type) {
//     case 'ADD': return state+1;
//     case 'MINUS': return state-1;
//     default: return state;
//   }
// }

// const countStore = createStore(countModifier);

// const onChange = () => {
//   number.innerText = countStore.getState();
// }

// // countStore를 구독한다. Store에 변화가일어났을때 실행할 함수를 인자로 보내준다.
// countStore.subscribe(onChange);

// // reducer에게 어떤 action을 취할지 message를 보낸다고 생각하면됨. !객체형식을 보내줘야한다.
// // countStore.dispatch({type: 'ADD'});

// const handleAdd = () => {
//   countStore.dispatch({type:ADD});
// }

// const handleMinus = () => {
//   countStore.dispatch({type:MINUS});
// }

// add.addEventListener('click', handleAdd);
// minus.addEventListener('click', handleMinus);

// console.log(countStore.getState());

import { createStore } from 'redux';

const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
const li = document.querySelector('li');

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';

const todoReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO': 
      return [...state, {todo: action.payload, id: Date.now()}];
    case 'DELETE_TODO':
      return state.filter(todoItem => todoItem.id !== action.payload);
    default: return [...state]
  }
}

const todoStore = createStore(todoReducer);

const addTodo = (todo) => {
  return {
    type: ADD_TODO,
    payload: todo
  }
}

const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: id
  }
}

const handleDelete = e => {
  const id = parseInt(e.target.parentNode.id);
  todoStore.dispatch(deleteTodo(id));
}

const onChange = () => {
  const todos = todoStore.getState();
  ul.innerHTML = '';
  todos.forEach(todo => {
    const li  = document.createElement('li');
    const btn = document.createElement('button');
    btn.addEventListener('click', handleDelete);
    btn.innerText = 'DELETE';
    li.id = todo.id
    li.innerText = todo.todo
    li.appendChild(btn);
    ul.appendChild(li);
  })
}

todoStore.subscribe(onChange);

const handleSubmit = e => {
  e.preventDefault();
  const todo = input.value;
  input.value = '';
  todoStore.dispatch(addTodo(todo));
}



form.addEventListener('submit', handleSubmit);