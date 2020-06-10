import React, { useState, useContext } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import facade from '../api/apiFacade';
import { AuthContext } from '../contexts/AuthContext';

export default function LogIn({ toggleModalLogin }) {
  const {
    auth: { isLoggedIn },
    login,
    logout
  } = useContext(AuthContext);
  let navigate = useNavigate();
  const init = { username: '', password: '' };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const handleLogout = () => {
    facade.logout();
    logout();
    toggleModalLogin();
    navigate('/');
  };

  const handleLogin = (user, pass) => {
    facade
      .login(user, pass)
      .then((response) => {
        facade.setToken(response.token);
        login({ username: response.username, roles: response.roles });
      })
      .catch(console.error);
    toggleModalLogin();
    navigate('/');
  };

  const performLogin = (evt) => {
    evt.preventDefault();
    handleLogin(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value
    });
  };

  return (
    <React.Fragment>
      {isLoggedIn ? (
        <LoggedIn handleLogout={handleLogout} />
      ) : (
        <LoggedOut change={onChange} performLogin={performLogin} />
      )}
    </React.Fragment>
  );
}

function LoggedOut({ performLogin, change }) {
  return (
    <div>
      <h2>Welcome back. Sign in below!</h2>
      <Form onSubmit={performLogin}>
        <Form.Field>
          <Input
            id='username'
            onChange={change}
            labelPosition='left corner'
            label='Username'
            placeholder='Username'
          />
        </Form.Field>
        <Form.Field>
          <Input
            id='password'
            onChange={change}
            labelPosition='left corner'
            label='Password'
            placeholder='Password'
          />
        </Form.Field>
        <Button type='submit'>Sign in</Button>
      </Form>
    </div>
  );
}

function LoggedIn({ handleLogout }) {
  return (
    <div>
      <h2>Logout</h2>
      <Button onClick={handleLogout}>Sign out</Button>
    </div>
  );
}
