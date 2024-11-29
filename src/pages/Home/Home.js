import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Home.module.scss';
import { Line } from 'react-chartjs-2';
// import { Chart } from 'chart.js/auto';
import * as request from '~/utils/request';

import { BankCartIcon, CartAdminIcon, OrderProcessingIcon, RoudedIcon, StackIcon, TickIcon } from '~/components/Icons';

const cx = className.bind(styles);

function Home() {
    const navigate = useNavigate();
    const [allOrder, setAllOrder] = useState();
    const [processingOrder, setProcessingOrder] = useState();
    const [deliveringOrder, setDeliveringOrder] = useState();
    const [completeOrder, setCompleteOrder] = useState();
    const [orderDetailCountsPerMonth, setOrderDetailCountsPerMonth] = useState();
    const months = [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ];
    const data = {
        labels: months,
        datasets: [
            {
                label: 'Số đơn',
                data: orderDetailCountsPerMonth,
                fill: false,
                borderColor: '#5ece98',
                tension: 0.1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                type: 'linear',
                position: 'left',
            },
        },
    };

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await request.get(`/Admin/get-number-order`);
                setAllOrder(res.all);
                setProcessingOrder(res.processing);
                setDeliveringOrder(res.delivering);
                setCompleteOrder(res.complete);
            } catch (error) { if (error.response.status === 401) navigate('/login'); }
        };

        fetchApi();
    }, [navigate]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await request.get(`/Admin/order-statistics`);
                setOrderDetailCountsPerMonth(res.orderDetailCountsPerMonth);
            } catch (error) { if (error.response.status === 401) navigate('/login'); }
        };

        fetchApi();
    }, [navigate]);

    return (
        <div className={cx('container_m')}>
            <div className={cx('mt-4', 'mb-4', 'pd-top-40px')}>
                <div className={cx('content-page')}>
                    <div className={cx('row')}>
                        <div className={cx('col', 'col-2-4', 'col-4', 'col-6', 'col-12', 'mb-24')}>
                            <div className={cx('statistical-wrap', 'today')}>
                                <div className={cx('icon-stack')}>
                                    <StackIcon />
                                </div>
                                <div className={cx('order-admin')}>
                                    <h6 className={cx('total-order-title')}>Hôm nay</h6>
                                    <p className={cx('total')}>{0}$</p>
                                </div>
                            </div>
                        </div>

                        <div className={cx('col', 'col-2-4', 'col-4', 'col-6', 'col-12', 'mb-24')}>
                            <div className={cx('statistical-wrap', 'yesterday')}>
                                <div className={cx('icon-stack')}>
                                    <StackIcon />
                                </div>
                                <div className={cx('order-admin')}>
                                    <h6 className={cx('total-order-title')}>Hôm qua</h6>
                                    <p className={cx('total')}>{0}$</p>
                                </div>
                            </div>
                        </div>

                        <div className={cx('col', 'col-2-4', 'col-4', 'col-6', 'col-12', 'mb-24')}>
                            <div className={cx('statistical-wrap', 'week')}>
                                <div className={cx('icon-cart-sta')}>
                                    <CartAdminIcon />
                                </div>
                                <div className={cx('order-admin')}>
                                    <h6 className={cx('total-order-title')}>Tuần này</h6>
                                    <p className={cx('total')}>{0}$</p>
                                </div>
                            </div>
                        </div>

                        <div className={cx('col', 'col-2-4', 'col-4', 'col-6', 'col-12', 'mb-24')}>
                            <div className={cx('statistical-wrap', 'month')}>
                                <div className={cx('icon-bank-cart')}>
                                    <BankCartIcon />
                                </div>
                                <div className={cx('order-admin')}>
                                    <h6 className={cx('total-order-title')}>Tháng này</h6>
                                    <p className={cx('total')}>{0}$</p>
                                </div>
                            </div>
                        </div>

                        <div className={cx('col', 'col-2-4', 'col-4', 'col-6', 'col-12', 'mb-24')}>
                            <div className={cx('statistical-wrap', 'last-month')}>
                                <div className={cx('icon-bank-cart')}>
                                    <BankCartIcon />
                                </div>
                                <div className={cx('order-admin')}>
                                    <h6 className={cx('total-order-title')}>Tháng trước</h6>
                                    <p className={cx('total')}>{0}$</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('content-page')}>
                    <div className={cx('row')}>
                        <div className={cx('col', 'col-3', 'col-4', 'col-6', 'col-12', 'mb-24')}>
                            <div className={cx('total-order-wrap')}>
                                <div className={cx('icon-cart')}>
                                    <CartAdminIcon width="20" />
                                </div>
                                <div className={cx('order-admin')}>
                                    <h6 className={cx('total-order-title')}>Tổng đơn hàng</h6>
                                    <p className={cx('total')}>{allOrder || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className={cx('col', 'col-3', 'col-4', 'col-6', 'col-12', 'mb-24')}>
                            <div className={cx('total-order-wrap')}>
                                <div className={cx('icon-rouded')}>
                                    <RoudedIcon width="20" />
                                </div>
                                <div className={cx('order-admin')}>
                                    <h6 className={cx('total-order-title')}>Đang xử lý</h6>
                                    <p className={cx('total')}>{processingOrder || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className={cx('col', 'col-3', 'col-4', 'col-6', 'col-12', 'mb-24')}>
                            <div className={cx('total-order-wrap')}>
                                <div className={cx('icon-processing')}>
                                    <OrderProcessingIcon width="20" />
                                </div>
                                <div className={cx('order-admin')}>
                                    <h6 className={cx('total-order-title')}>Đang giao</h6>
                                    <p className={cx('total')}>{deliveringOrder || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className={cx('col', 'col-3', 'col-4', 'col-6', 'col-12', 'mb-24')}>
                            <div className={cx('total-order-wrap')}>
                                <div className={cx('icon-tick')}>
                                    <TickIcon width="20" />
                                </div>
                                <div className={cx('order-admin')}>
                                    <h6 className={cx('total-order-title')}>Đã hoàn thành</h6>
                                    <p className={cx('total')}>{completeOrder || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className={cx('order-statistics')}>
                    <p className={cx('order-statistics-title')}>Thống kê đơn hàng</p>
                    <Line data={data} options={options} />
                </div> */}
            </div>
        </div>
    );
}

export default Home;
