import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faFloppyDisk, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Item.module.scss';
import { check, deleteTodo } from '../../../redux/actions';
import { todoListSelector } from '../../../redux/selectors';
import ItemPriority from '../../filters/priority/item/ItemPriority';

const cx = className.bind(styles);

function Item({ todo }) {
    const [isFocus, setIsFocus] = useState(false);
    const [textInput, setTextInput] = useState('');
    const inputRef = useRef();

    console.log(todo);
    const todoList = useSelector(todoListSelector);

    useEffect(() => {
        setTextInput(todo);
    }, [todo]);

    const dispatch = useDispatch();

    const handleEdit = () => {
        setIsFocus(!isFocus);
        inputRef.current.readOnly = false;
        inputRef.current.focus();
    };

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    };

    const handleSave = () => {
        setIsFocus(!isFocus);
        inputRef.current.readOnly = true;
    };
    const handleCheck = (id) => {
        let index = todoList.findIndex((item) => item.id === id);
        dispatch(check(index));
    };

    return (
        <div>
            <div className={cx('todo')}>
                <input
                    className={cx('check')}
                    type="checkbox"
                    checked={todo.isChecked}
                    onClick={() => handleCheck(todo.id)}
                />
                <input
                    ref={inputRef}
                    className={cx('job-item')}
                    readOnly
                    value={textInput.name}
                    onChange={(e) => setTextInput(e.target.value)}
                />
                <ItemPriority optionName={todo.priority} />
                <FontAwesomeIcon className={cx('icon-menu')} icon={faEllipsisVertical} />
                <div className={cx('option')}>
                    {!isFocus ? (
                        <FontAwesomeIcon className={cx('icon-edit')} icon={faPen} onClick={handleEdit} />
                    ) : (
                        <FontAwesomeIcon className={cx('icon-save')} icon={faFloppyDisk} onClick={handleSave} />
                    )}
                    <FontAwesomeIcon
                        className={cx('icon-trash')}
                        icon={faTrashCan}
                        onClick={() => handleDelete(todo.id)}
                    />
                </div>
            </div>
        </div>
    );
}

export default Item;
