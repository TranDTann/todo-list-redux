import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import className from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Tab from './tabs/Tab';
import styles from './Filters.module.scss';
import Priority from './priority/Priority';
import { searchInput } from './filtersSlice';

const cx = className.bind(styles);

function Filter() {
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();

    const handleSearchText = (e) => {
        setSearchText(e.target.value);
        dispatch(searchInput(e.target.value));
    };

    return (
        <div className={cx('filter')}>
            <h5 className={cx('title')}>Search</h5>
            <div className={cx('search')}>
                <input
                    className={cx('input-search')}
                    placeholder="Search"
                    value={searchText}
                    onChange={handleSearchText}
                />
                <FontAwesomeIcon className={cx('icon-search')} icon={faMagnifyingGlass} />
            </div>
            <Tab />
            <Priority />
            <hr className={cx('horizontal-line')} />
        </div>
    );
}

export default Filter;
