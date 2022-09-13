import className from 'classnames/bind';

import styles from './Priority.module.scss';

const cx = className.bind(styles);

function Priority() {
    return (
        <div>
            <h5 className={cx('title')}>Filter By Priority</h5>
            <input className={cx('input-priority')} placeholder="Please select" />
        </div>
    );
}

export default Priority;
