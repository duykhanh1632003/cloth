import './MyForm.scss';
import React, { Component } from 'react';
import { handleLoginApi, createNewUserData , getDetailUser , handleEditAUser} from '../service/userService';
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName : '',
      lastName: '',
      phoneNumber: '',
      address: '',
      keyGender: '',
      keyPosition: '',
      keyRole: '',

      getDataAllcode: [],
      listGender: [],
      listPosition: [],
      listRole: [],
      gender: '',
      position: '',
      role: '',


      getIdEdit: '',
      isUserEdit: false,
      getAUserById : {}
    };

    this.handleOnChangeSelect = this.handleOnChangeSelect.bind(this);
  }

  buildDataInput = (inputData, type) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.forEach((item) => {
        if (item.type === type) {
          let object = {
            value: item.value,
            id: item.id,
            key: item.key
          };
          result.push(object);
        }
      });
    }
    return result;
  };

  async componentDidUpdate(prevprops){
    let {getIdEdit} = this.props
    if(prevprops.getIdEdit !== this.props.getIdEdit){
      await this.getAUserFromServer(getIdEdit)
      // break
    }
  }
  getAUserFromServer = async (id) =>{
    let response =await getDetailUser(id)
    if(response && response.errCode ===0){
      let getAUserById = response.data
      this.setState({
        isUserEdit: true,
        email: getAUserById.email,
        firstName: getAUserById.firstName,
        lastName: getAUserById.lastName,
        address:getAUserById.address,
        phoneNumber: getAUserById.phonenumber,
        gender: getAUserById.genderData.value,
        role: getAUserById.roleData.value,
        position: getAUserById.positionData.value
      })
    }
    console.log("CHEckl state",this.state)
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    try {
      const response = await handleLoginApi();
      let allGender, allPosition, allRole = '';

      if (response && response.errCode === 0) {
        const getDataAllcode = response.data.allcode;
        allGender = this.buildDataInput(getDataAllcode, 'GENDER');
        allPosition = this.buildDataInput(getDataAllcode, 'POSITION');
        allRole = this.buildDataInput(getDataAllcode, 'ROLE');

        this.setState({
          listGender: allGender,
          listPosition: allPosition,
          listRole: allRole,
          gender: allGender.length > 0 ? allGender[0].value : '',
          position: allPosition.length > 0 ? allPosition[0].value : '',
          role: allRole.length > 0 ? allRole[0].value : ''
        });
      } else {
        // Handle error case
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  handleOnChangeSelect(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    let {listGender , listPosition ,listRole} = this.state
    if(name ===  "role"){
      listRole.map((item) =>{
       if(item.value === value){
        this.setState({keyRole: item.key})
        return
       }
      })
    }
    if(name ===  "gender"){
      listGender.map((item) =>{
       if(item.value === value){
        this.setState({keyGender: item.key})
         return
       }
      })
    }
    if(name ===  "position"){
      listPosition.map((item) =>{
       if(item.value === value){
        this.setState({keyPosition: item.key})
        return
       }
      })
    }
  }

  handleCreateNewUser = async (event) => {
    event.preventDefault();
    const {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      keyGender,
      keyPosition,
      keyRole,
      listGender,
      listPosition,
      listRole
    } = this.state;

    if (!email || !password || !firstName || !lastName || !phoneNumber || !address) {
      NotificationManager.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      const data = {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        address,
        keyGender: keyGender || 'M',
        keyPosition: keyPosition || 'P0',
        keyRole: keyRole || 'R1'
      };

      const response = await createNewUserData(data);

      if (response.errCode === 0) {
        NotificationManager.success('Lưu thành công!');
        this.setState({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          address: '',
          keyGender: '',
          keyPosition: '',
          keyRole: '',
          gender: listGender.length > 0 ? listGender[0].value : '',
          position: listPosition.length > 0 ? listPosition[0].value : '',
          role: listRole.length > 0 ? listRole[0].value : ''
        });
      } else {
        NotificationManager.error('Lưu thất bại! Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Error creating new user:', error);
      NotificationManager.error('Lỗi từ phía máy chủ! Vui lòng thử lại sau.');
    }
  };


  handleChangeInforUser =async (e) =>{
    e.preventDefault();
    const {
      firstName,
      lastName,
      phoneNumber,
      address,
      keyGender,
      keyPosition,
      keyRole,
      listGender,
      listPosition,
      listRole
    } = this.state;
    try {
      let {getIdEdit} = this.props
      const data = {
        id: getIdEdit,
        firstName,
        lastName,
        phoneNumber,
        address,
        keyGender: keyGender || 'M',
        keyPosition: keyPosition || 'P0',
        keyRole: keyRole || 'R1'
      };
      
      const response = await handleEditAUser(data);

      if (response.errCode === 0) {
        NotificationManager.success('Lưu thành công!');
        this.setState({
          isUserEdit: false,  
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          address: '',
          keyGender: '',
          keyPosition: '',
          keyRole: '',
          gender: listGender.length > 0 ? listGender[0].value : '',
          position: listPosition.length > 0 ? listPosition[0].value : '',
          role: listRole.length > 0 ? listRole[0].value : ''
        });
      } else {
        NotificationManager.error('Lưu thất bại! Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Error creating new user:', error);
      NotificationManager.error('Lỗi từ phía máy chủ! Vui lòng thử lại sau.');
    }
  }

  

  render() {
    let {listGender , listPosition ,listRole , isUserEdit} = this.state
    

    return (
      <div className="container-Myform">
        <form>
          <div className="form-row">
              <div className="group col-md-6">
                  <label htmlFor="inputEmail4">Email</label>
                 {isUserEdit === false ?  <input type="email" className="form-control" id="inputEmail4" placeholder="Email"
                    value={this.state.email}
                    name='email'
                    onChange={(event) => {this.handleOnChangeSelect(event)}}
                  />:
                  <input type="email" className="form-control" id="inputEmail4" 
                  value={this.state.email}
                  disabled
                />
                  }
              </div>
              {isUserEdit === false ?  <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Password</label>
              <input type="password" className="form-control" id="inputEmail4" placeholder="password"
                    value={this.state.password}
                    name='password'
                    onChange={(event) => {this.handleOnChangeSelect(event)}}
                  />
            </div>:
             <div className="form-group col-md-6">
             <label htmlFor="inputPassword4">Password</label>
             <input type="password" className="form-control" id="inputEmail4" placeholder="password"
                   value={this.state.password}
                   disabled
                 />
           </div>
           }
          </div>
          <div className="form-row">
          <div className="group col-md-3">
                  <label htmlFor="inputEmail4">First Name</label>
                  <input type="text" className="form-control" id="inputEmail4"
                    value={this.state.firstName}
                    name='firstName'
                    onChange={(event) => {this.handleOnChangeSelect(event)}}
                  />
              </div>
              <div className="group col-md-3">
                  <label htmlFor="inputEmail4">Last Name</label>
                  <input type="text" className="form-control" id="inputEmail4"
                    value={this.state.lastName}
                    name='lastName'
                    onChange={(event) => {this.handleOnChangeSelect(event)}}
                  />
              </div>
              <div className="group col-md-3">
                  <label htmlFor="inputEmail4">Số điện thoại</label>
                  <input type="text" className="form-control" id="inputEmail4"
                    value={this.state.phoneNumber}
                    name='phoneNumber'
                    onChange={(event) => {this.handleOnChangeSelect(event)}}
                  />
              </div>
              <div className="group col-md-3">
                  <label htmlFor="inputEmail4">Địa chỉ</label>
                  <input type="text" className="form-control" id="inputEmail4" 
                    value={this.state.address}
                    name='address'  
                    onChange={(event) => {this.handleOnChangeSelect(event)}}
                  />
              </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label htmlFor="inputState1">Gender</label>
              <select
                id="inputState1"
                className="form-control"
                name="gender"
                onChange={this.handleOnChangeSelect}
                value={this.state.gender}
              >
                {this.state.listGender.map((gender) => (
                  <option key={gender.key} value={gender.value} data-key={gender.key}>
                    {gender.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="inputState2">Position</label>
              <select
                id="inputState2"
                className="form-control"
                name="position"
                onChange={this.handleOnChangeSelect}
                value={this.state.position}
              >
                {this.state.listPosition.map((position) => (
                  <option key={position.key} value={position.value} data-key={position.key}>
                    {position.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="inputState3">Role</label>
              <select
                id="inputState3"
                className="form-control"
                name="role"
                onChange={this.handleOnChangeSelect}
                value={this.state.role}
              >
                {this.state.listRole.map((role) => (
                  <option key={role.key} value={role.value} data-key={role.key}>
                    {role.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="inputZip">Zip</label>
              <input type="text" className="form-control" id="inputZip" />
            </div>
          </div>
          {isUserEdit === false ? 
        <button type="submit" className="btn btn-primary" onClick={(e) => this.handleCreateNewUser(e)}>
        Sign in
      </button>:
      <button type="submit" className="btn btn-warning" onClick={(e) => this.handleChangeInforUser(e)}>
      Change Infor
    </button>  
        }
        </form>
        <NotificationContainer />
      </div>
    );
  }
}

export default MyForm;
