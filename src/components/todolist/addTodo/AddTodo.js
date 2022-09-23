import className from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import ItemPriority from '../../filters/priority/item/ItemPriority';
import styles from './Add.module.scss';
import { optionSelector } from '../../../redux/selectors';
import TodosSlice from '../todosSlice';

const cx = className.bind(styles);

function AddTodo() {
    const [job, setJob] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [isFocus, setIsFocus] = useState(false);

    const inputRef = useRef();
    const priorityRef = useRef(null);

    const dispatch = useDispatch();

    const options = useSelector(optionSelector);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (e.path[0] !== priorityRef.current) {
                setIsFocus(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleAdd = () => {
        if (job.trim() !== '') {
            dispatch(
                TodosSlice.actions.addTodo({
                    id: uuidv4(),
                    name: job,
                    priority: priority,
                    isChecked: false,
                }),
            );
        }
        setJob('');
        inputRef.current.focus();
        setPriority('Medium');
    };

    const handleFocus = () => {
        setIsFocus(!isFocus);
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
                    <div className={cx('input-select')}>
                        <button className={cx('btn-select')}>
                            <ItemPriority optionName={priority} />
                        </button>
                        <FontAwesomeIcon className={cx('icon-down')} icon={faChevronDown} />
                    </div>
                    <div className={cx('cover-input-select')} onClick={handleFocus} ref={priorityRef}></div>
                    {isFocus && (
                        <div className={cx('list-priority')}>
                            {options.map((option) => (
                                <button className={cx('btn-priority-item')} onClick={() => handlePriority(option.name)}>
                                    <ItemPriority optionName={option.name} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button className={cx('btn')} onClick={handleAdd}>
                    Add
                </button>
            </div>
        </div>
    );
}

export default AddTodo;
