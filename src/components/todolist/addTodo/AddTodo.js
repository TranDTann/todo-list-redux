import className from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { addTodo } from '../../../redux/actions';
import styles from './Add.module.scss';

const cx = className.bind(styles);

function AddTodo() {
    const [job, setJob] = useState('');
    const [priority, setPriority] = useState('Medium');

    const dispatch = useDispatch();

    const handleAdd = () => {
        dispatch(
            addTodo({
                id: uuidv4(),
                name: job,
                priority: priority,
                completed: false,
            }),
        );
    };

    const handlePriority = (value) => {
        setPriority(value);
    };

    return (
        <div className={cx('wrapper')}>
            <input
                className={cx('input-add')}
                value={job}
                onChange={(e) => setJob(e.target.value)}
                placeholder="Add job..."
            />
            <input className={cx('input-select')} value={priority} onChange={handlePriority} />
            <button className={cx('btn')} onClick={handleAdd}>
                Add
            </button>
        </div>
    );
}

export default AddTodo;
