function TableUser(props) {
    const { listUsers } = props;
    return (
      <>
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Email</th>
              <th scope="col">Username</th>
              <th scope="col">Address</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listUsers &&
              listUsers.length > 0 &&
              listUsers.map((item, index) => {
                return (
                  <tr key={`table-users-${index}`}>
                    <td>{index + 1}</td>
                    <td>{item.email}</td>
                    <td>{item.username}</td>
                    <td>{item.address}</td>
                    <td>{item.Group.name}</td>
                    <td>
                      <button className="btn btn-secondary" onClick={() => props.handleClickBtnView(item)}>View</button>
                      <button className="btn btn-warning mx-3" onClick={() => props.handleClickBtnUpdate(item)}>Update</button>
                      <button className="btn btn-danger" onClick={() => props.handleClickBtnDelete(item)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            {listUsers && listUsers.length === 0 && (
              <tr>
                <td colSpan={"4"}>Not found data</td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  }
  
  export default TableUser;
  