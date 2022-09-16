import className from 'classnames/bind';
import styles from './ItemPriority.module.scss';

const cx = className.bind(styles);

function itemPriority({ optionName }) {
    return (
        <div>
            <span
                className={cx('name-priority')}
                style={
                    optionName === 'High'
                        ? {
                              backgroundColor: '#fff1f0',
                              borderColor: '#ffa39e',
                              color: '#cf1322',
                          }
                        : optionName === 'Medium'
                        ? { backgroundColor: '#e6f7ff', borderColor: '#91d5ff', color: '#096dd9' }
                        : { backgroundColor: 'gray', borderColor: 'transparent', color: '#fff' }
                }
            >
                {optionName}
            </span>
        </div>
    );
}

export default itemPriority;
