import axios from 'axios';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import className from 'classnames/bind';
import styles from './Orders.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const cx = className.bind(styles);

function Orders() {
    const token = Cookies.get('tokenAdmin');
    const navigate = useNavigate();
    const [orderList, setOrderList] = useState([]);
    const [pageCount, setPageCount] = useState('');

    const postsPerPage = 12;

    const getOrder = (currenPage) => {
        const api = axios.create({
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        api.get(`${process.env.REACT_APP_BASE_URL}/Admin/get-orders?page=${currenPage}&limit=${postsPerPage}`)
            .then((res) => {
                setOrderList(res.data.orderDetails);
                setPageCount(res.data.countProduct);
            })
            .catch((error) => {
                if (error.response.status === 401) navigate('/login');
            });
    };

    const updateStatusOrder = (event, dataId) => {
        const status = event.target.value;
        const orderDetailId = dataId;
        const api = axios.create({
            headers: {
                'Content-Type': 'application/json',
                cookies: token,
            },
        });

        api.put(`${process.env.REACT_APP_BASE_URL}/Admin/update-status-order/${orderDetailId}`, { status })
            .then((res) => {
                getOrder(1);
            })
            .catch((error) => {
                if (error.response.status === 401) navigate('/login');
            });
    };

    useEffect(() => {
        const api = axios.create({
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        api.get(`${process.env.REACT_APP_BASE_URL}/Admin/get-orders?page=1&limit=${postsPerPage}`)
            .then((res) => {
                setOrderList(res.data.orderDetails);
                setPageCount(res.data.countProduct);
            })
            .catch((error) => {
                if (error.response.status === 401) navigate('/login');
            });
    }, [token, navigate]);

    const handlePageClick = (event) => {
        let currenPage = event.selected + 1;
        getOrder(currenPage);
    };

    return (
        <div className={cx('container_m')}>
            <div className={cx('mt-4', 'mb-4', 'pd-top-10px')}>
                <div className={cx('table-wrap', 'mt-4')}>
                    <div className={cx('table-container')}>
                        <table className={cx('table')}>
                            <thead>
                                <tr>
                                    <th scope="col" style={{ textAlign: 'center' }}>
                                        Mã
                                    </th>
                                    <th scope="col" style={{ textAlign: 'center' }}>
                                        Khách hàng
                                    </th>
                                    <th scope="col" style={{ textAlign: 'center' }}>
                                        Thanh toán
                                    </th>
                                    <th scope="col" style={{ textAlign: 'center' }}>
                                        Trạng thái
                                    </th>
                                    <th scope="col" style={{ textAlign: 'center' }}>
                                        Hành động
                                    </th>
                                    <th scope="col" style={{ textAlign: 'center' }}>
                                        Ngày tạo
                                    </th>
                                    <th scope="col" style={{ textAlign: 'center' }}>
                                        Tổng tiền
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderList.length > 0 ? (
                                    orderList.map((result) => (
                                        <tr key={result.orderDetailId}>
                                            <td>
                                                <p style={{ textAlign: 'center' }}>#{result.orderDetailId}</p>
                                            </td>
                                            <td>
                                                <p style={{ textAlign: 'center' }}>{result.fullName}</p>
                                            </td>
                                            <td style={{ textAlign: 'center' }}>{result.paymentStatus}</td>
                                            <td style={{ textAlign: 'center' }}>{result.status}</td>
                                            <td style={{ textAlign: 'center' }} data-id={result.orderDetailId}>
                                                <select
                                                    disabled={
                                                        result.status === 'Đã hủy' || result.status === 'Hoàn thành'
                                                    }
                                                    onChange={(event) => updateStatusOrder(event, result.orderDetailId)}
                                                    className={cx('select-status')}
                                                    defaultValue={result.status}
                                                >
                                                    <option>Đang chờ</option>
                                                    <option>Đang giao</option>
                                                    <option>Hoàn thành</option>
                                                    <option>Đã hủy</option>
                                                </select>
                                            </td>
                                            <td style={{ textAlign: 'center' }}>{result.createDate}</td>
                                            <td
                                                style={{ textAlign: 'center' }}
                                                className={cx('')}
                                                data-total={result.orderDetailId}
                                            >
                                                {result.total}$
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className={cx('text-center')}>
                                            Chưa có đơn hàng nào để xử lý. Hãy kiên nhẫn chờ nhá !!!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {pageCount && (
                    <div className={styles['pagination-container']}>
                        <ReactPaginate
                            onPageChange={handlePageClick}
                            previousLabel={'<'}
                            breakLabel={'...'}
                            nextLabel={'>'}
                            pageCount={pageCount}
                            marginPagesDisplayed={3}
                            pageRangeDisplayed={3}
                            containerClassName={'paginationn'}
                            pageClassName={'page-itemm'}
                            pageLinkClassName={'page-linkk'}
                            previousClassName={'page-itemm'}
                            previousLinkClassName={'page-linkk'}
                            nextClassName={'page-itemm'}
                            nextLinkClassName={'page-linkk'}
                        />
                    </div>
                )}
            </div>
           
        </div>
    );
}

export default Orders;
