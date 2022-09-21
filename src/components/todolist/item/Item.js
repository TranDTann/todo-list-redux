import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faFloppyDisk, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Item.module.scss';
import { check, deleteTodo, todoSave } from '../../../redux/actions';
import { todoListSelector } from '../../../redux/selectors';
import ItemPriority from '../../filters/priority/item/ItemPriority';

const cx = className.bind(styles);

function Item({ todo }) {
    const [isFocusMenu, setIsFocusMenu] = useState(false);
    const [isFocusEdit, setIsFocusEdit] = useState(false);
    const [textInput, setTextInput] = useState('');
    const inputRef = useRef();
    const todoList = useSelector(todoListSelector);

    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setIsFocusMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside, true);

        return () => document.removeEventListener('click', handleClickOutside, true);
    });

    useEffect(() => {
        setTextInput(todo);
    }, [todo]);

    const dispatch = useDispatch();

    const handleEdit = (e) => {
        inputRef.current.readOnly = false;
        inputRef.current.focus();
        setIsFocusEdit(!isFocusEdit);
    };

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    };

    const handleSave = (id, textInput) => {
        if (todoList.filter((todo) => todo.name).includes(textInput)) {
            inputRef.current.readOnly = true;
            setIsFocusEdit(false);
        } else {
            inputRef.current.readOnly = true;
            dispatch(todoSave({ value: textInput, id: id }));
            setIsFocusEdit(false);
        }
    };
    const handleCheck = (id) => {
        let index = todoList.findIndex((item) => item.id === id);
        dispatch(check(index));
    };

    const handleMenu = () => {
        setIsFocusMenu(!isFocusMenu);
    };

    return (
        <div>
            <div className={cx('todo')}>
                <div className={cx('input')}>
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
                    {isFocusEdit && (
                        <FontAwesomeIcon
                            className={cx('icon-save')}
                            icon={faFloppyDisk}
                            onClick={() => handleSave(todo.id, textInput)}
                        />
                    )}
                </div>
                <div className={cx('after-input')}>
                    <ItemPriority optionName={todo.priority} />
                    <div onClick={handleMenu} ref={menuRef}>
                        <div className={cx('menu')}>
                            <FontAwesomeIcon className={cx('icon-menu')} icon={faEllipsisVertical} />
                            <div className={cx('cover-menu')}></div>
                        </div>

                        {isFocusMenu && (
                            <div className={cx('option')}>
                                <button className={cx('btn-edit')} onClick={(e) => handleEdit(e)}>
                                    <p className={cx('title-btn-edit')}>Edit</p>
                                    <FontAwesomeIcon className={cx('icon-edit')} icon={faPen} />
                                </button>
                                <button className={cx('btn-delete')} onClick={() => handleDelete(todo.id)}>
                                    <p className={cx('title-btn-delete')}>Delete</p>
                                    <FontAwesomeIcon className={cx('icon-trash')} icon={faTrashCan} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Item;
