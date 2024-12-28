import ReactPaginate from 'react-paginate';

function TableConfirmOrder(props) {
    const { listOrders, pageCount } = props;

    const handlePageClick = (event) => {
        props.setCurrentPage(+event.selected + 1);
        props.fetchListOrdersWithPaginate(+event.selected + 1);
    };

    const formatPrice = (price) => {
        if (typeof price !== 'number') {
            return '0';
        }
        return price.toLocaleString('vi-VN');
    };

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
                    {listOrders &&
                        listOrders.length > 0 &&
                        listOrders.map((item, index) => {
                            return (
                                <tr key={`table-banners-${index}`}>
                                    <td>{index + 1 + (props.currentPage - 1) * listOrders.length}</td>
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
                                    </td>
                                </tr>
                            );
                        })}
                    {listOrders && listOrders.length === 0 && (
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
                    pageCount={pageCount}
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
