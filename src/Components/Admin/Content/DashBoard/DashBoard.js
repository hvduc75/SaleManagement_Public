import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import Chart from 'chart.js/auto';
import DatePicker from 'react-datepicker';
import { startOfWeek } from 'date-fns';

import styles from './DashBoard.module.scss';
import { getWeeklyRevenue } from '../../../../service/orderApiService';
import { FaCalendarAlt } from 'react-icons/fa';
import BoxStatistic from './BoxStatistic/BoxStatistic';
import ListOrder from './ListOrder/ListOrder';

const cx = classNames.bind(styles);

function DashBoard(props) {
    const [listOrdersInWeek, setListOrdersInWeek] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [startOfWeekDate, setStartOfWeekDate] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const handleWeekChange = (date) => {
        if (date instanceof Date && !isNaN(date)) {
            setStartDate(date);
            setStartOfWeekDate(startOfWeek(date, { weekStartsOn: 1 }));
        }
        setIsDatePickerOpen(false);
    };

    useEffect(() => {
        fetchListOrdersInWeek(startOfWeekDate);
    }, [startOfWeekDate]);

    useEffect(() => {
        drawChart();
    }, [listOrdersInWeek]);

    const fetchListOrdersInWeek = async (startDate) => {
        let data = await getWeeklyRevenue(startDate);
        if (data.EC === 0) {
            setListOrdersInWeek(data.DT);
        }
    };

    const formatPrice = (price) => {
        if (typeof price !== 'number') {
            return '0';
        }
        return price.toLocaleString('vi-VN');
    };

    const drawChart = () => {
        const ctx = chartRef.current.getContext('2d');

        // Xóa biểu đồ cũ nếu đã tồn tại
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
        const dataPerDay = Array(7).fill(0);
        let totalRevenue = 0;

        listOrdersInWeek.forEach((order) => {
            const date = new Date(order.order_date).toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
            const vietnamDate = new Date(date);

            let dayIndex = vietnamDate.getDay() - 1;
            if (dayIndex < 0) dayIndex = 6;
            dataPerDay[dayIndex] += +order.total_price;
            totalRevenue += +order.total_price;
        });
        setTotalPrice(totalRevenue);

        // Tạo biểu đồ mới và lưu vào ref
        chartInstanceRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: days,
                datasets: [
                    {
                        label: 'Doanh thu theo ngày',
                        data: dataPerDay,
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    };

    return (
        <div className={cx('wrapper')}>
            <BoxStatistic
                listOrders={listOrdersInWeek}
                formatPrice={formatPrice}
                totalRevenue={totalPrice}
                startDate={startOfWeekDate}
            />
            <div className={cx('content_statistic')}>
                <ListOrder listOrders={listOrdersInWeek} formatPrice={formatPrice} />
                <div className={cx('graph')}>
                    <div className={cx('date_container')}>
                        <div className={cx('graph_title')}>Doanh Thu Theo Tuần</div>
                        <div className={cx('input_week')}>
                            <div className={cx('calendar')}>
                                <DatePicker
                                    className={cx('searchDate')}
                                    selected={startDate}
                                    onChange={handleWeekChange}
                                    open={isDatePickerOpen}
                                    onClickOutside={() => setIsDatePickerOpen(false)}
                                    dateFormat="dd/MM/yyyy"
                                />
                                <FaCalendarAlt
                                    className={cx('icon_calendar')}
                                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                                />
                            </div>
                        </div>
                    </div>
                    <canvas ref={chartRef} width="400" height="200"></canvas>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
