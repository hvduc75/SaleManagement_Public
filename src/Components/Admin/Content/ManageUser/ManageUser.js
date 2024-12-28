import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageUser.module.scss';
import { FcPlus } from 'react-icons/fc';
import ModalCreateUser from './AddUser/ModalCreateUser';
import TableUserPaginate from './TableUser/TableUserPaginate';
import { getUserWithPaginate } from '../../../../service/userApiService';
import ModalUpdateUser from './UpdateUser/ModalUpdateUser';
import ModalDeleteUser from './DeleteUser/ModalDeleteUser';

const cx = classNames.bind(styles);

function ManageUser(props) {
    const LIMIT_USER = 6;
    const [listUsers, setListUsers] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    useEffect(() => {
        fetchListUsersWithPaginate(1);
    }, []);

    const fetchListUsersWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            setListUsers(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    };

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    };

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user);
    };

    const resetUpdateData = () => {
        setDataUpdate({});
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Manage User</div>
            <div className={cx('user-content')}>
                <div className={cx('btn-add-new')}>
                    <button className={cx('btn btn-primary')} onClick={() => setShowModalCreateUser(true)}>
                        <div className={cx('btn-add')}>
                            <FcPlus className={cx('icon_plus')} />
                            <span>Add new user</span>
                        </div>
                    </button>
                </div>
                <div className={cx('table-user-container')}>
                    <TableUserPaginate
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        // handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    //   fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    resetUpdateData={resetUpdateData}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    dataDelete={dataDelete}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default ManageUser;
