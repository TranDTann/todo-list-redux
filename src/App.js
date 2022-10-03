import className from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import TodoList from './components/todolist/TodoList';
import Filter from './components/filters/Filters';
import styles from './App.module.scss';
import { fetchTodos } from './components/todolist/todosSlice';

const cx = className.bind(styles);

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTodos()); //Cai nay duoc goi 1 lan duy nhat khi component duoc mounted
    }, []);
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
