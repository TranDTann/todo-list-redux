import className from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import AddTodo from './addTodo/AddTodo';
import { filterObjectSelector, optionsSelected, todoListSelector } from '../../redux/selectors';
import styles from './TodoList.module.scss';
import Item from './item/Item';
import { useEffect } from 'react';
import { fetchTodos } from './TodosSlice';
import { todoFilter } from '../filters/filtersSlice';

const cx = className.bind(styles);

function TodoList() {
    const todoList = useSelector(todoListSelector);

    const filterObject = useSelector(filterObjectSelector);

    const prioritySelected = useSelector(optionsSelected);
    console.log(prioritySelected);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(todoFilter({ filterObject, prioritySelected }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterObject]);

    useEffect(() => {
        dispatch(fetchTodos());
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div className={cx('list')}>
                {todoList.map((todo, index) => (
                    <Item key={index} todo={todo} />
                ))}
            </div>
            <AddTodo todoList={todoList} />
        </div>
    );
}

export default TodoList;
