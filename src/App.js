import className from 'classnames/bind';
import Filter from './components/filters/Filters';
import TodoList from './components/todolist/TodoList';

import styles from './App.module.scss';
import { useState } from 'react';

const cx = className.bind(styles);

function App() {
    const [todos, setTodos] = useState([]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h1 className={cx('title')}>TODO LIST</h1>
                <Filter />
                <TodoList />
            </div>
        </div>
    );
}

export default App;
