import className from 'classnames/bind';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import ItemPriority from '../../filters/priority/item/ItemPriority';
import { addTodo } from '../../../redux/actions';
import styles from './Add.module.scss';
import { optionSelector } from '../../../redux/selectors';

const cx = className.bind(styles);

// const options = [
//     { id: 1, name: 'High' },
//     { id: 2, name: 'Medium' },
//     { id: 3, name: 'Low' },
// ];

function AddTodo({ todoList }) {
    const [job, setJob] = useState('');
    const [priority, setPriority] = useState('Medium');

    const inputRef = useRef();

    const dispatch = useDispatch();

    const options = useSelector(optionSelector);

    const handleAdd = () => {
        dispatch(
            addTodo({
                id: uuidv4(),
                name: job,
                priority: priority,
                isChecked: false,
            }),
        );
        setJob('');
        inputRef.current.focus();
    };

    const handlePriority = (value) => {
        setPriority(value);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('action-add')}>
                <input
                    className={cx('input-add')}
                    ref={inputRef}
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                    placeholder="Add job..."
                />

                <div className={cx('select-priority')}>
                    <input className={cx('input-select')} defaultValue="Medium" readOnly value={priority} />
                    <FontAwesomeIcon className={cx('icon-down')} icon={faChevronDown} />
                    <div className={cx('list-priority')}>
                        {options.map((option) => (
                            <button className={cx('btn-priority-item')} onClick={() => handlePriority(option.name)}>
                                <ItemPriority optionName={option.name} />
                            </button>
                        ))}
                    </div>
                </div>

                <button className={cx('btn')} onClick={handleAdd}>
                    Add
                </button>
            </div>
        </div>
    );
}

export default AddTodo;
