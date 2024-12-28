import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

import styes from './AddRole.module.scss';
import { FaPlusCircle } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import { createAddRole, fetchAllRole } from '../../../../../service/roleApiService';
import TableRole from '../TableRole/TableRole';
import ModalUpdateRole from '../EditRole/EditRole';

const cx = classNames.bind(styes);

function AddRole(props) {
    const dataChildDefault = { url: '', description: '', isValidUrl: true };
    const childRef = useRef();
    const [listRoles, setListRoles] = useState([]);
    const [showModalUpdateRole, setShowModalUpdateRole] = useState(false);
    const [roleEdit, setRoleEdit] = useState({});
    const [listChilds, setListChilds] = useState({
        child1: dataChildDefault,
    });

    useEffect(() => {
        getAllRoles();
    }, []);

    const getAllRoles = async () => {
        let data = await fetchAllRole();
        if (data && +data.EC === 0) {
            setListRoles(data.DT);
        }
    };

    const handleOnChangInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[key][name] = value;
        if (value && name === 'url') {
            _listChilds[key]['isValidUrl'] = true;
        }
        setListChilds(_listChilds);
    };

    const handleAddNewInput = () => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`child-${uuidv4()}`] = dataChildDefault;
        setListChilds(_listChilds);
    };

    const handleDeleteInput = (key) => {
        let _listChilds = _.cloneDeep(listChilds);
        delete _listChilds[key];
        setListChilds(_listChilds);
    };

    const buildDataToPersist = () => {
        let result = [];
        Object.entries(listChilds).map(([key, child], index) => {
            result.push({
                url: child.url,
                description: child.description,
            });
        });
        return result;
    };

    const handleSave = async () => {
        let invalidObj = Object.entries(listChilds).find(([key, child], index) => {
            return child && !child.url;
        });

        if (!invalidObj) {
            let data = buildDataToPersist();
            let res = await createAddRole(data);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                childRef.current.fetListRolesAgain();
            }
        } else {
            toast.error('Input URL must not be empty');
            let _listChilds = _.cloneDeep(listChilds);
            const key = invalidObj[0];
            _listChilds[key]['isValidUrl'] = false;
            setListChilds(_listChilds);
        }
    };

    const handleEditRole = (item) => {
        setRoleEdit(item);
        setShowModalUpdateRole(true);
    };

    const resetDataUpdate = () => {
        setRoleEdit({});
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('mt-3 adding-roles')}>
                    <div className={cx('title-role')}>
                        <h4>Add a new role ...</h4>
                    </div>
                    <div className={cx('role-parent')}>
                        {Object.entries(listChilds).map(([key, child], index) => {
                            return (
                                <>
                                    <div className={cx('row role-child')} key={`child-${key}`}>
                                        <div className={cx('col-5 form-group')}>
                                            <label>URL:</label>
                                            <input
                                                type="text"
                                                className={
                                                    child.isValidUrl
                                                        ? cx('form-control')
                                                        : cx('form-control is-invalid')
                                                }
                                                value={child.url}
                                                onChange={(event) => handleOnChangInput('url', event.target.value, key)}
                                            />
                                        </div>
                                        <div className={cx('col-5 form-group')}>
                                            <label>Description:</label>
                                            <input
                                                type="text"
                                                className={cx('form-control')}
                                                value={child.description}
                                                onChange={(event) =>
                                                    handleOnChangInput('description', event.target.value, key)
                                                }
                                            />
                                        </div>
                                        <div className={cx('col-2', 'mt-4')}>
                                            <FaPlusCircle
                                                className={cx('add', 'actions')}
                                                onClick={() => handleAddNewInput()}
                                            />
                                            {index >= 1 && (
                                                <FaRegTrashAlt
                                                    className={cx('delete', 'actions')}
                                                    onClick={() => handleDeleteInput(key)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                        <div>
                            <button className={cx('btn', 'btn-success', 'mt-3')} onClick={() => handleSave()}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className={cx('mt-3')}>
                    <h4>List Current Roles</h4>
                    <TableRole
                        listRoles={listRoles}
                        handleEditRole={handleEditRole}
                        getAllRoles={getAllRoles}
                        ref={childRef}
                    />
                </div>
                <ModalUpdateRole
                    show={showModalUpdateRole}
                    setShow={setShowModalUpdateRole}
                    dataUpdate={roleEdit}
                    resetDataUpdate={resetDataUpdate}
                    getAllRoles={getAllRoles}
                />
            </div>
        </div>
    );
}

export default AddRole;
