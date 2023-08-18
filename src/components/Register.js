import './Register.scss';
import React, { useState, useEffect } from 'react';
import { handleLoginApi, createNewUserData, getDetailUser } from '../service/userService';
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useNavigate } from 'react-router-dom';
import "./Register.scss";
import { useSelector } from 'react-redux';

const Register = (props) => {

  const account = useSelector(state => state.user.account)

	const navigate = useNavigate()	
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [keyGender, setKeyGender] = useState('');
  const [keyPosition, setKeyPosition] = useState('');
  const [keyRole, setKeyRole] = useState('');
  const [listGender, setListGender] = useState([]);
  const [listPosition, setListPosition] = useState([]);
  const [listRole, setListRole] = useState([]);
  const [gender, setGender] = useState('');
  const [position, setPosition] = useState('');
  const [role, setRole] = useState('');
  const [isUserEdit, setIsUserEdit] = useState(false);

  const handleOnChangeSelect = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'gender':
        setGender(value);
        break;
      case 'position':
        setPosition(value);
        break;
      case 'role':
        setRole(value);
        break;
      default:
        break;
    }
  };

  useEffect(()=>{
    if(account && account.auth === true){
      navigate('/')
    }
  },[account])

  const buildDataInput = (inputData, type) => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await handleLoginApi();
        let allGender, allPosition, allRole = '';
        if (response && response.errCode === 0) {
          const getDataAllcode = response.data.allcode;
          allGender = buildDataInput(getDataAllcode, 'GENDER');
          allPosition = buildDataInput(getDataAllcode, 'POSITION');
          allRole = buildDataInput(getDataAllcode, 'ROLE');
          setListGender(allGender);
          setListPosition(allPosition);
          setListRole(allRole);
          setGender(allGender.length > 0 ? allGender[0].value : '');
          setPosition(allPosition.length > 0 ? allPosition[0].value : '');
          setRole(allRole.length > 0 ? allRole[0].value : '');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreateNewUser = async (event) => {
    event.preventDefault();

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
        keyRole: 'R3'
      };

      const response = await createNewUserData(data);

      if (response.errCode === 0) {
        NotificationManager.success('Lưu thành công!');
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setAddress('');
        setKeyGender('');
        setKeyPosition('');
        setKeyRole('');
        setGender(listGender.length > 0 ? listGender[0].value : '');
        setPosition(listPosition.length > 0 ? listPosition[0].value : '');
      } else {
        NotificationManager.error('Lưu thất bại! Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Error creating new user:', error);
      NotificationManager.error('Lỗi từ phía máy chủ! Vui lòng thử lại sau.');
    }
  };

  const handleGoBack = () => {
    navigate('/login')
  }

  return (
    <div className="container-Register">
      <div className='title-register'>Đăng ký</div>
      <form>
        <div className="form-row">
          <div className="group col-md-6">
            <label className='form-register' htmlFor="inputEmail4">Email</label>
            <input type="email" id="inputEmail4" placeholder="Email" value={email} name='email' onChange={handleOnChangeSelect} />
          </div>
          <div className="group col-md-6">
            <label className='form-register' htmlFor="inputPassword4">Password</label>
            <input type="password" id="inputEmail4" placeholder="password" value={password} name='password' onChange={handleOnChangeSelect} />
          </div>
        </div>
        <div className="form-row">
          <div className="group col-md-3">
            <label className='form-register' htmlFor="inputEmail4">First Name</label>
            <input type="text" id="inputEmail4" value={firstName} name='firstName' onChange={handleOnChangeSelect} />
          </div>
          <div className="group col-md-3">
            <label className='form-register' htmlFor="inputEmail4">Last Name</label>
            <input type="text" id="inputEmail4" value={lastName} name='lastName' onChange={handleOnChangeSelect} />
          </div>
          <div className="group col-md-3">
            <label className='form-register' htmlFor="inputEmail4">Số điện thoại</label>
            <input type="text" id="inputEmail4" value={phoneNumber} name='phoneNumber' onChange={handleOnChangeSelect} />
          </div>
          <div className="group col-md-3">
            <label className='form-register' htmlFor="inputEmail4">Địa chỉ</label>
            <input type="text" id="inputEmail4" value={address} name='address' onChange={handleOnChangeSelect} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label className='form-register' htmlFor="inputState1">Gender</label>
            <select id="inputState1" className="form-control" name="gender" onChange={handleOnChangeSelect} value={gender}>
              {listGender.map((gender) => (
                <option key={gender.key} value={gender.value} data-key={gender.key}>
                  {gender.value}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-6">
            <label className='form-register' htmlFor="inputState2">Position</label>
            <select id="inputState2" className="form-control" name="position" onChange={handleOnChangeSelect} value={position}>
              {listPosition.map((position) => (
                <option key={position.key} value={position.value} data-key={position.key}>
                  {position.value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="submit-register" onClick={handleCreateNewUser}>
          Đăng ký
        </button>
      </form>
      <div className="go-back">
        <i className="mdi mdi-chevron-left"></i>
        <span onClick={handleGoBack}>Đăng nhập</span>
      </div>
      <NotificationContainer />
    </div>
  );
}

export default Register;
