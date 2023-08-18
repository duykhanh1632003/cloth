import React, { Component } from "react";
import { Table } from "react-bootstrap";
import MyForm from "./MyForm";
import "./TableUser.scss";
import { getAllUser, handleDeleteUser } from "../service/userService";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import "@mdi/font/css/materialdesignicons.min.css";
import ReactPaginate from 'react-paginate';
class TableUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUser: [],
      getIdEdit : '',
      currentPage: 0,
      itemsPerPage: 5, // Số mục trên mỗi trang
      didMount: false 
    };
  }
  async componentDidMount() {
    await this.getAllUsersFromServer();
  }

  async componentDidUpdate(prevprops) {
    if (!this.state.didMount) {
      try {
        const response = await getAllUser();
        if (response && response.errCode === 0) {
          this.setState({
            allUser: response.data.data,
            didMount: true // Set the flag to true
          });
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
  }

  getAllUsersFromServer = async () => {
    try {
      const response = await getAllUser();
        if (response && response.errCode === 0) {
          this.setState({
            allUser: response.data.data
          });
        }
      
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  handleEditUser = (id) => {
    this.setState({
      getIdEdit: id
    })
  };

  handleDeleteUser = async (id) => {
    try {
      const response = await handleDeleteUser(id);
      if (response && response.errCode === 0) {
        NotificationManager.success('Người dùng đã được xóa thành công.');
        // Gọi lại hàm để tải lại danh sách người dùng sau khi xóa
        await this.getAllUsersFromServer();
      } else {
        NotificationManager.error('Lỗi khi xóa người dùng.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      NotificationManager.error('Lỗi khi xóa người dùng.');
    }
  };

  handlePageClick = ({ selected }) => {
    this.setState({
      currentPage: selected
    });
  }

  render() {
    const { allUser, currentPage, itemsPerPage } = this.state;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const displayedUsers = allUser.slice(startIndex, endIndex);

    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Email</th>
              <th>Họ</th>
              <th>Tên</th>
              <th>Địa chỉ</th>
              <th>Chỉnh sửa</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((item, index) => (
              <tr key={index}>
                <td>{item.email}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.address}</td>
                <td>
                  <button className="edit-tableUser" onClick={() => this.handleEditUser(item.id)}>
                    <i className="mdi mdi-pencil"></i> {/* Biểu tượng Edit */}
                  </button>
                  <button className="delete-tableUser" onClick={() => this.handleDeleteUser(item.id)}>
                    <i className="mdi mdi-delete"></i> {/* Biểu tượng Delete */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ReactPaginate
          previousLabel={'< previous'}
          nextLabel={'next >'}
          breakLabel={'...'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          activeClassName={'active'}
          pageCount={Math.ceil(allUser.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={this.handlePageClick}
        />
        <MyForm getIdEdit={this.state.getIdEdit} />
        <NotificationContainer />
      </>
    );
  }
}

export default TableUser;
