import className from 'classnames/bind';

import TodoList from './components/todolist/TodoList';
import Filter from './components/filters/Filters';
import styles from './App.module.scss';

const cx = className.bind(styles);

function App() {
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
