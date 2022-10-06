import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faX } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import styles from './Priority.module.scss';
import ItemPriority from './item/ItemPriority';
import { optionSelector, optionsSelected } from '../../../redux/selectors';
import { prioritySearch } from '../filtersSlice';

const cx = className.bind(styles);

function Priority() {
    const [isFocusPriority, setIsFocusPriority] = useState(false);
    const refPriority = useRef(null);
    const [currPriority, setCurrPriority] = useState([]);

    const options = useSelector(optionSelector);
    const selectedOptions = useSelector(optionsSelected);

    console.log('allOption', options);
    console.log('selectedOption', selectedOptions);

    const dispatch = useDispatch();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (e.path[0] !== refPriority.current) {
                setIsFocusPriority(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handlePrioritySearch = (e, name) => {
        e.stopPropagation();
        let updateCurrPriority = [...currPriority];
        if (updateCurrPriority.includes(name)) {
            updateCurrPriority = updateCurrPriority.filter((prevItem) => prevItem !== name);
        } else {
            updateCurrPriority.push(name);
        }

        setCurrPriority(updateCurrPriority);
        console.log('updateCurrPriority', updateCurrPriority);
        // dispatch(FiltersSlice.actions.prioritySearch(name));
        dispatch(prioritySearch(updateCurrPriority));
    };

    // const handleFocusPriority = () => {
    //     setIsFocusPriority(!isFocusPriority);
    // };

    return (
        <div className={cx('wrapper')}>
            <h5 className={cx('title')}>Filter By Priority</h5>
            <div className={cx('select')} onClick={() => setIsFocusPriority(!isFocusPriority)}>
                {!isFocusPriority && !selectedOptions.length ? (
                    <span className={cx('tittle-box-priority')}>Please select</span>
                ) : (
                    <div className={cx('list-priority')}>
                        {selectedOptions.map((item, index) => (
                            <div className={cx('itemOption')} key={index}>
                                <ItemPriority optionName={item.name} />
                                <FontAwesomeIcon
                                    className={cx('icon-x')}
                                    icon={faX}
                                    onClick={(e) => handlePrioritySearch(e, item.name)}
                                />
                            </div>
                        ))}
                    </div>
                )}
                <div
                    className={cx(isFocusPriority ? '' : 'cover-select')}
                    //handleFocusPriority
                    ref={refPriority}
                ></div>
            </div>

            {isFocusPriority && (
                <div className={cx('list')}>
                    {options.map((option) => (
                        <div
                            className={cx('item')}
                            onClick={(e) => handlePrioritySearch(e, option.name)}
                            style={
                                currPriority.includes(option.name)
                                    ? {
                                          backgroundColor: '#e6f7ff',
                                      }
                                    : {}
                            }
                        >
                            <ItemPriority optionName={option.name} />
                            {currPriority.includes(option.name) && (
                                <FontAwesomeIcon icon={faCheckCircle} className={cx('icon-check')} />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Priority;
