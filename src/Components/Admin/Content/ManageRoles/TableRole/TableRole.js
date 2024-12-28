import React, { forwardRef, useImperativeHandle } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';

import styles from './TableRole.module.scss';
import { deleteRole } from '../../../../../service/roleApiService';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaPencilAlt } from 'react-icons/fa';

const cx = classNames.bind(styles);

const TableRole = forwardRef((props, ref) => {
    const { listRoles, getAllRoles, handleEditRole } = props;

    useImperativeHandle(ref, () => ({
        fetListRolesAgain() {
            getAllRoles();
        },
    }));

    const handleDeleteRole = async (roleId) => {
        let data = await deleteRole(roleId);
        if (data && +data.EC === 0) {
            toast.success(data.EM);
            await getAllRoles();
        }
    };

    return (
        <div className={cx('table-role')}>
            <table className={cx('table', 'table-bordered', 'table-hover')}>
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">URL</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listRoles && listRoles.length > 0 ? (
                        <>
                            {listRoles.map((item, index) => {
                                return (
                                    <tr key={`row-${index}`}>
                                        <td>{listRoles.length-index}</td>
                                        <td>{item.url}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <span
                                                title="edit"
                                                className={cx('edit')}
                                                onClick={() => handleEditRole(item)}
                                            >
                                                <FaPencilAlt />
                                            </span>
                                            <span
                                                title="delete"
                                                className={cx('delete')}
                                                onClick={() => handleDeleteRole(item.id)}
                                            >
                                                <FaRegTrashAlt />
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </>
                    ) : (
                        <>
                            <tr>
                                <td colSpan={4}>Not Found Roles</td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
});

export default TableRole;
