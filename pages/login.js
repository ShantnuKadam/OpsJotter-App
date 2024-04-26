import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { Container, TextField, Button, Typography, Alert, Toolbar, Checkbox, FormControlLabel, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logoImage from './post/image/Gmail_Logo.png';
import microsoft from './post/image/Microsoft.png';
import opsjotter from './post/image/OpsJotter2.png';

const Login = () => {
  const [accountId, setAccountId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { data } = useSession();
  console.log(data);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/auth/clientLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accountId, email, password })
    });

    if (response.ok) {
      router.push('/post/home'); // Redirect to home page after successful login
    } else {
      const result = await response.json();
      setError(result.message || 'Failed to log in');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

 
  const handleMicrosoftSignIn = async () => {
    await signIn('microsoft', { callbackUrl: '/post/home' });
  };

  const handleCreateAccount = () => {
    // Navigate to the create account page
    router.push('/newAccount');
  };

  return (
    <Container maxWidth="sm">
      <Toolbar style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image src={opsjotter} alt="Company Logo" style={{ width: '80%', maxWidth: '300px', height: 'auto' }} />
      </Toolbar>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleLogin}>
        <TextField
          label="Account ID"
          fullWidth
          variant="outlined"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          label="Email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mt: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
          Log In
        </Button>

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />

        <Button
          fullWidth
          variant="outlined"
          startIcon={<Image src={logoImage} alt="Google sign-in" style={{ height: '24px', width: '24px' }} />}
          onClick={()=>signIn("google")}
          sx={{ mt: 1, mb: 1, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}
        >
          Login With Gmail
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleMicrosoftSignIn}
          startIcon={<Image src={microsoft} alt="Microsoft sign-in" style={{ height: '30px', width: '30px' }} />}
          sx={{ mt: 1, mb: 1, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}
        >
          Login With Microsoft
        </Button>


        <Button
          fullWidth
          variant="text"
          sx={{ mt: 1, mb: 1 }}
          onClick={handleCreateAccount}
        >
          Create an Account
        </Button>
      </form>
    </Container>
  );
};

export default Login;
