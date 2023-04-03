import { useState } from 'react';
import './Login.scss'

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");

    const handleLogin = () => {
        alert('Login')
    }

    return (
        <div className="login-container">
            <div className='header'>
                Don`t have an account yet ?
            </div>

            <div className='title col-4 mx-auto'>
         
                HoiDanIT & 
            </div>

            <div className='welcome col-4 mx-auto'>
                <div className='form-group'>
                <label>Email</label>
                <input 
                type={"email"}
                 className="form-control" 
                 value={email}
                 onChange={(event) => setEmail(event.target.value)}
                 />
                </div>
      
            </div>

            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Mật Khẩu</label>
                    <input 
                    type={"password"} 
                    className="form-control" 
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <span className='forgot-password'>Bạn quên mật khẩu ?</span>
                <div>
                <button
                 className='btn-submit'
                 onClick={() => handleLogin()}
                 >Đăng Nhập Quizz Huflit</button>
                </div>
                
            </div>

        </div>
    )
}

export default Login;