import ReactPaginate from 'react-paginate';

function TableProductPaginate(props) {
    const { listProducts, pageCount } = props;

    const handlePageClick = (event) => {
        props.setCurrentPage(+event.selected + 1);
        props.fetListProductsWithPaginate(+event.selected + 1);
    };

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Sale</th>
                        <th scope="col">Quantity</th>
                        <th style={{ textAlign: 'center' }} scope="col">
                            Background
                        </th>
                        <th style={{ textAlign: 'center' }} scope="col">
                            Image
                        </th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listProducts &&
                        listProducts.length > 0 &&
                        listProducts.map((item, index) => {
                            let imageSrc = '';
                            if (item.image) {
                                const byteArray = new Uint8Array(item.image.data);
                                let binary = '';
                                byteArray.forEach((byte) => (binary += String.fromCharCode(byte)));
                                const base64String = window.btoa(binary);
                                imageSrc = `data:image/jpeg;base64,${base64String}`;
                            }
                            let backgroundSrc = '';
                            if (item.background) {
                                const byteArray = new Uint8Array(item.background.data);
                                let binary = '';
                                byteArray.forEach((byte) => (binary += String.fromCharCode(byte)));
                                const base64String = window.btoa(binary);
                                backgroundSrc = `data:image/jpeg;base64,${base64String}`;
                            }
                            return (
                                <tr key={`table-banners-${index}`}>
                                    <td>{(index + 1) + (props.currentPage - 1) * listProducts.length}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.sale}</td>
                                    <td>{item.quantity_current}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <img
                                            style={{ width: '60px', objectFit: 'contain' }}
                                            src={backgroundSrc}
                                            alt="PrevBackground"
                                        />
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <img
                                            style={{ width: '60px', objectFit: 'contain' }}
                                            src={imageSrc}
                                            alt="PrevImage"
                                        />
                                    </td>
                                    <td style={{width: "200px"}}>
                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => props.handleClickBtnUpdate(item)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => props.handleClickBtnDelete(item)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    {listProducts && listProducts.length === 0 && (
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

export default TableProductPaginate;
