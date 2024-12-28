import ReactPaginate from 'react-paginate';

function TableBannerPaginate(props) {
    const { listBanners, pageCount } = props;

    const handlePageClick = (event) => {
        props.setCurrentPage(+event.selected + 1);
        props.fetchListBannersWithPaginate(+event.selected + 1);
    };

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th style={{ textAlign: 'center' }} scope="col">
                            Image
                        </th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listBanners &&
                        listBanners.length > 0 &&
                        listBanners.map((item, index) => {
                            let imageSrc = '';
                            if (item.image) {
                                const byteArray = new Uint8Array(item.image.data);
                                let binary = '';
                                byteArray.forEach((byte) => (binary += String.fromCharCode(byte)));
                                const base64String = window.btoa(binary);
                                imageSrc = `data:image/jpeg;base64,${base64String}`;
                            }
                            return (
                                <tr key={`table-banners-${index}`}>
                                    <td>{(index + 1) + (props.currentPage - 1) * listBanners.length}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.status ? 'ON' : 'OFF'}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <img
                                            style={{ width: '100px', objectFit: 'contain' }}
                                            src={imageSrc}
                                            alt="PrevImage"
                                        />
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => props.handleClickBtnView(item)}
                                        >
                                            View
                                        </button>
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
                    {listBanners && listBanners.length === 0 && (
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

export default TableBannerPaginate;
