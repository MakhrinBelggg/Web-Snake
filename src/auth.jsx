import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'

//CSS
import '../src/styles/font.css';
//import '../src/styles/buttonRGB.css';
import '../src/styles/buttons.css';
import '../src/styles/colors.css';
import '../src/styles/text.css';
import './styles/authPage.css';

//Data
import '../src/userdata.json';

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const goToGame = () => {
    navigate('/game');
  };

 const handlePlayClick = () => {
    if (!username || !password) {
      setError("Пожалуйста, заполни все поля")
    }
    else
    {
      goToGame();
      console.log('Username:', username);
      console.log('Login:', login);
      console.log('Password:', password);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const toggleRegistration = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="container">
      <div className="auth-form-container">
        <div className="h1" style={{ verticalAlign: "center", justifyContent: "center" }}>Добро пожаловать</div>
        <div className='h4' style={{ marginTop: "5px" }}>Пожалуйста пройди аутентификацию перед началом игры</div>

        <form className="auth-form">
          <div className="form-group">
            <label className="switch" style={{ marginBottom: "20px" }}>
              <input type="checkbox" checked={isRegistering} onChange={toggleRegistration} />
              <span className="slider">
                <span className="text-off">Войти</span>
                <span className="text-on">Регистрация</span>
              </span>
            </label>
          </div>

          {isRegistering && (
            <div className="form-group">
              <input type="text" id="username" className="inputBox" placeholder="Никнейм" value={username} onChange={handleUsernameChange} />
            </div>
          )}

          <div className="form-group">
            <input type="text" id="login" className="inputBox" placeholder="Логин" value={login} onChange={handleLoginChange} />
          </div>

          <div className="form-group">
            <input type="password" id="password" className="inputBox" placeholder="Пароль" value={password} onChange={handlePasswordChange} />
          </div>

          <div>
            <button onClick={(e) => {
              e.preventDefault();
              handlePlayClick();
            }} type="submit" className="buttonGreen" style={{ marginTop: "30px" }}>Играть</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;