import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'; // Import useRouter
import { signIn } from 'next-auth/react';
import logoImage from './post/image/Gmail_Logo.png';
import microsoft from './post/image/Microsoft.png';
import opsjotter from './post/image/OpsJotter2.png';
import { Button, Container, TextField, Checkbox, FormControlLabel, Toolbar, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    // try {
    //   const result = await signIn('google', { redirect: false });
    //   if (result.ok && result.url) {
    //     // Redirect to the dashboard page
    //     router.push('/post/home');
    //   }
    // } catch (error) {
    //   console.error('Error signing in with Google:', error);
    //   // Handle errors here
    // }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image src={opsjotter} alt="Company Logo" style={{ width: '80%', maxWidth: '300px', height: 'auto' }} />
      </Toolbar>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="current-password"
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
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Login
      </Button>
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button
        fullWidth
        variant="outlined"
        startIcon={<Image src={logoImage} alt="Google sign-in" style={{ height: '24px', width: '24px' }} />}
        onClick={handleGoogleSignIn}
        sx={{ mt: 1, mb: 1, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}
      >
        Login With Gmail
      </Button>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<Image src={microsoft} alt="Microsoft sign-in" style={{ height: '30px', width: '30px' }} />}
        sx={{ mt: 1, mb: 1, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}
      >
        Login With Microsoft
      </Button>
      <Button
        fullWidth
        variant="text"
        sx={{ mt: 1, mb: 1 }}
      >
        Create an Account
      </Button>
    </Container>
  );
};

export default LoginPage;
