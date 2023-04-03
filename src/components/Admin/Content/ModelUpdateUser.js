
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import {  toast } from 'react-toastify';
import { putUpdateNewUser } from '../../../services/apiService';
import _ from 'lodash';

const ModalUpdateUser = (props) => {
  const { show, setShow , dataUpdate} = props;
  const handleClose = () => {
    setShow(false)
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreviewImage("");
    props.resetUpdateData();
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if(!_.isEmpty(dataUpdate)){
        //update state
        setEmail(dataUpdate.email);
        setUsername(dataUpdate.username);
        setRole(dataUpdate.role);
        setImage("");
        if(dataUpdate.image){
            setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
        }

    }
  },[props.dataUpdate]);

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0])
    } else {
      // setPreviewImage("");
    }
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmitCreateUser = async () => {
    //validate

    const isValidEmail= validateEmail(email);

    if(!isValidEmail){
      toast.error('Invalid email')
      return;
    }
    //call apis
    //let data = {
    //email: email,
    //password: password,
    //username: username,
    //role: role,
    //userImage: image
    //}
    //console.log(data)

    

    let data = await putUpdateNewUser( dataUpdate.id,username, role, image);
    console.log("component res:",data)
    if(data && data.EC === 0){
      toast.success(data.EM);
      handleClose();
      await props.fetchListUsers();
    }

    if(data && data.EC !== 0){
      toast.error(data.EM);
    }
  }

  //Design Model heading 64
  return (
    <>


      <Modal
        show={show}
        onHide={handleClose}
        size='xl'
        backdrop="static"
        className='modal-add-user'
      >

        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                disabled
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                disabled
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />

            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select className="form-select" onChange={(event) => setRole(event.target.value)}
                value={role}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className='col-md-12'>
              <label className="form-label label-upload" htmlFor='labelUpload'>
                <FcPlus /> Upload File Image
              </label>
              <input
                type="file"
                id="labelUpload" hidden
                onChange={(event) => handleUploadImage(event)}
              />
            </div>

            <div className='col-md-12 img-preview'>
              {previewImage ?
                <img src={previewImage} />
                :
                <span> Preview Image </span>
              }

            </div>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateUser;