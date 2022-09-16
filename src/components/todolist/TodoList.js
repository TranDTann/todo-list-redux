import className from 'classnames/bind';
import { useSelector } from 'react-redux';

import AddTodo from './addTodo/AddTodo';
import { todosRemaining } from '../../redux/selectors';
import styles from './TodoList.module.scss';
import Item from './item/Item';

const cx = className.bind(styles);

function TodoList() {
    const todoList = useSelector(todosRemaining);
    return (
        <div>
            <div className={cx('list')}>
                {todoList.map((todo) => (
                    <Item todo={todo} />
                ))}
            </div>
            <AddTodo todoList={todoList} />
        </div>
    );
}

export default TodoList;
