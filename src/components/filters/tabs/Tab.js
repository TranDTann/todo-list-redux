import className from 'classnames/bind';
import styles from './Tab.module.scss';

const cx = className.bind(styles);

const tabs = [
    { id: 1, title: 'All' },
    { id: 2, title: 'Completed' },
    { id: 3, title: 'To Do' },
];

function Tab() {
    return (
        <div>
            <h5 className={cx('title')}>Filter By Status</h5>
            {tabs.map((tab) => (
                <button className={cx('btn-tab')}>{tab.title}</button>
            ))}
        </div>
    );
}

export default Tab;
