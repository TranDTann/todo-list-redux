import className from 'classnames/bind';

import styles from './Priority.module.scss';
import ItemPriority from './item/ItemPriority';
import { useSelector } from 'react-redux';
import { optionSelector } from '../../../redux/selectors';

const cx = className.bind(styles);

function Priority() {
    const options = useSelector(optionSelector);
    return (
        <div>
            <h5 className={cx('title')}>Filter By Priority</h5>
            <input className={cx('input-priority')} placeholder="Please select" />
            <div className={cx('list')}>
                {options.map((option) => (
                    <div className={cx('item')}>
                        <ItemPriority optionName={option.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Priority;
