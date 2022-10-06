import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faFloppyDisk, faPen, faTrashCan, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Item.module.scss';
import { optionSelector, todoListSelector } from '../../../redux/selectors';
import ItemPriority from '../../filters/priority/item/ItemPriority';
import { checkTodo, deleteTodo, editTodo } from '../TodosSlice';

const cx = className.bind(styles);

function Item({ todo }) {
    const [isFocusMenu, setIsFocusMenu] = useState(false);
    const [isFocusEdit, setIsFocusEdit] = useState(false);
    const [isFocusEditPriority, setIsFocusEditPriority] = useState(false);
    const [textInput, setTextInput] = useState('');
    const [editPriority, setEditPriority] = useState(todo.priority);
    const inputRef = useRef();

    const todoList = useSelector(todoListSelector);
    const options = useSelector(optionSelector);

    const menuRef = useRef(null);
    const refPriority = useRef(null);

    useEffect(() => {
        setTextInput(todo.name);
        setEditPriority(todo.priority);
    }, [todo]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setIsFocusMenu(false);
            }
            if (!refPriority.current.contains(e.target)) {
                setIsFocusEditPriority(false);
            }
        };

        document.addEventListener('click', handleClickOutside, true);

        return () => document.removeEventListener('click', handleClickOutside, true);
    });

    const dispatch = useDispatch();

    const handleEdit = (e) => {
        inputRef.current.readOnly = false;
        inputRef.current.focus();
        setIsFocusEdit(!isFocusEdit);
    };

    const handleDelete = (id) => {
        // dispatch(TodosSlice.actions.deleteTodo(id));
        dispatch(deleteTodo(id));
    };

    const handleSave = (id, textInput, editPriority) => {
        if (todoList.filter((todo) => todo.name).includes(textInput)) {
            inputRef.current.readOnly = true;
            setIsFocusEdit(false);
        } else {
            inputRef.current.readOnly = true;
            // dispatch(TodosSlice.actions.todoSave({ textInput: textInput, id: id, editPriority: editPriority }));
            dispatch(editTodo({ textInput: textInput, id: id, editPriority: editPriority }));
            setIsFocusEdit(false);
        }
    };

    const handleCheck = (id) => {
        dispatch(checkTodo({ id, isChecked: !todo.isChecked }));
    };

    const handleMenu = () => {
        setIsFocusMenu(!isFocusMenu);
    };

    const handleFocusEditPriority = () => {
        setIsFocusEditPriority(!isFocusEditPriority);
    };

    const handleSetPriority = (value) => {
        setEditPriority(value);
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
                        className={cx('job-item', todo.isChecked ? 'job-complete' : '')}
                        readOnly
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        defaultChecked={true}
                    />
                    {todo.isChecked && <FontAwesomeIcon className={cx('icon-check')} icon={faCheck} />}
                </div>
                <div className={cx('after-input')}>
                    <div className={cx('priority')}>
                        <span
                            ref={refPriority}
                            onClick={handleFocusEditPriority}
                            className={cx(todo.isChecked ? 'job-complete' : '')}
                        >
                            <ItemPriority optionName={editPriority} />
                            {isFocusEditPriority && isFocusEdit && (
                                <div className={cx('edit-priority')}>
                                    {options.map((option) => (
                                        <div
                                            className={cx('item-priority')}
                                            onClick={() => handleSetPriority(option.name)}
                                        >
                                            <ItemPriority optionName={option.name} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </span>
                    </div>

                    {isFocusEdit && (
                        <FontAwesomeIcon
                            className={cx('icon-save')}
                            icon={faFloppyDisk}
                            onClick={() => handleSave(todo.id, textInput, editPriority)}
                        />
                    )}

                    <div onClick={handleMenu} ref={menuRef}>
                        {!isFocusEdit && (
                            <div className={cx('menu')}>
                                <FontAwesomeIcon className={cx('icon-menu')} icon={faEllipsisVertical} />
                                <div className={cx('cover-menu')}></div>
                            </div>
                        )}
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
