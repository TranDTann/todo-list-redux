import { useSelector } from 'react-redux';
import className from 'classnames/bind';

import AddTodo from './addTodo/AddTodo';
import { todoListSelector } from '../../redux/selectors';
import styles from './TodoList.module.scss';

const cx = className.bind(styles);

function TodoList() {
    const todoList = useSelector(todoListSelector);
    console.log(todoList);
    return (
        <div>
            {todoList.map((todo) => (
                <input className={cx('job-item')} readOnly value={todo.name} />
            ))}
            <AddTodo />
        </div>
    );
}

export default TodoList;
