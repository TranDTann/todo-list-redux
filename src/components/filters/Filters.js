import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import className from 'classnames/bind';

import Tab from './tabs/Tab';
import Priority from './priority/Priority';
import styles from './Filters.module.scss';

const cx = className.bind(styles);

function Filter() {
    return (
        <div className={cx('filter')}>
            <h5 className={cx('title')}>Search</h5>
            <div className={cx('search')}>
                <input className={cx('input-search')} placeholder="Search" />
                <FontAwesomeIcon className={cx('icon-search')} icon={faMagnifyingGlass} />
            </div>
            <Tab />
            <Priority />
            <hr className={cx('horizontal-line')} />
        </div>
    );
}

export default Filter;
