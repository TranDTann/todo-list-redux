import className from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './Tab.module.scss';
import { changeTab } from '../filtersSlice';

const cx = className.bind(styles);

const tabs = [
    { id: 1, title: 'All' },
    { id: 2, title: 'Completed' },
    { id: 3, title: 'To Do' },
];

function Tab() {
    const [currTab, setCurrTab] = useState(1);
    const dispatch = useDispatch();

    const handleTab = (tab) => {
        setCurrTab(tab.id);

        dispatch(changeTab(tab.title));
    };
    return (
        <div>
            <h5 className={cx('title')}>Filter By Status</h5>
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    className={cx('btn-tab')}
                    onClick={() => handleTab(tab)}
                    style={tab.id === currTab ? { backgroundColor: '#333', color: '#ffffffe6' } : {}}
                >
                    {tab.title}
                </button>
            ))}
        </div>
    );
}

export default Tab;
