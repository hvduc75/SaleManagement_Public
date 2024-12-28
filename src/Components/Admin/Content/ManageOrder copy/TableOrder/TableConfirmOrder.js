import { toast } from 'react-toastify';
import {confirmOrder} from "../../../../../service/orderApiService"
import ReactPaginate from 'react-paginate';

function TableConfirmOrder(props) {
    const { listOrdersConfirm, pageCountConfirm } = props;

    const handlePageClick = (event) => {
        props.setCurrentPage(+event.selected + 1);
        props.fetchListOrdersConfirmWithPaginate(+event.selected + 1);
    };

    const formatPrice = (price) => {
        if (typeof price !== 'number') {
            return '0';
        }
        return price.toLocaleString('vi-VN');
    };

    const handleConfirmOrder = async (item) => {
        let data = await confirmOrder(item.id);
        if(data.EC === 0){
            toast.success("Confirm Order Success");
            props.fetchListOrdersConfirmWithPaginate(props.currentPage );
        }
    }

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">ID</th>
                        <th scope="col">Order Date</th>
                        <th scope="col">Delivery Date</th>
                        <th scope="col">Receive Date</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Order Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listOrdersConfirm &&
                        listOrdersConfirm.length > 0 &&
                        listOrdersConfirm.map((item, index) => {
                            return (
                                <tr key={`table-banners-${index}`}>
                                    <td>{index + 1 + (props.currentPage - 1) * listOrdersConfirm.length}</td>
                                    <td>{item.id}</td>
                                    <td>{item.order_date}</td>
                                    <td>{item.delivery_date ? item.delivery_date : "Chưa có"}</td>
                                    <td>{item.receive_date ? item.receive_date : "Chưa có"}</td>
                                    <td>{formatPrice(+item.total_price)}<sup>đ</sup></td>
                                    <td>{item.order_status}</td>
                                    <td>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => props.handleClickBtnView(item)}
                                        >
                                            View
                                        </button>
                                       <button
                                            className="ms-3 btn btn-primary"
                                            onClick={() => handleConfirmOrder(item)}
                                        >
                                            Confirm
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    {listOrdersConfirm && listOrdersConfirm.length === 0 && (
                        <tr>
                            <td colSpan={'6'}>Not found data</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCountConfirm}
                    previousLabel="< Prev"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />
            </div>
        </>
    );
}

export default TableConfirmOrder;
