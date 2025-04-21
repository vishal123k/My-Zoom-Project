import * as React from 'react';
import {
  AppBar, Toolbar, Avatar, Button, CssBaseline, TextField,
  Paper, Box, Grid, Snackbar, Typography, InputAdornment, IconButton
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';

const theme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        const result = await handleRegister(name, username, password);
        setUsername('');
        setPassword('');
        setName('');
        setMessage(result);
        setOpen(true);
        setError('');
        setFormState(0);
      }
    } catch (err) {
      const message = err?.response?.data?.message || 'An error occurred';
      setError(message);
    }
  };

  return (
    <div style={{justifyItems: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', height: '100vh'}}>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Navbar */}
      <AppBar
        position="sticky"
        elevation={3}
        sx={{
          background: 'linear-gradient(to right, #3f51b5, #1a237e)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 80 } }}>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: 1,
              color: '#fff',
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            My ZOOM
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Auth UI */}
      <Grid container component="main" sx={{ height: 'calc(100vh - 64px)' }}>
        {/* Left Background */}
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage:
              'url("https://images.pexels.com/photos/1111360/pexels-photo-1111360.jpeg")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(2px)',
            }
          }}
        />

        {/* Right Panel - Centered Form */}
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={0} square>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: 2,
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: 400,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: { xs: 3, sm: 5 },
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                animation: 'fadeInUp 0.8s ease',
                '@keyframes fadeInUp': {
                  from: { opacity: 0, transform: 'translateY(20px)' },
                  to: { opacity: 1, transform: 'translateY(0)' }
                }
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: '#3f51b5' }}>
                <LockOutlinedIcon />
              </Avatar>

              <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
                {formState === 0 ? 'Sign In to Apna Video Call' : 'Register Your Account'}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, my: 3 }}>
                <Button
                  variant={formState === 0 ? 'contained' : 'outlined'}
                  onClick={() => setFormState(0)}
                  sx={{
                    textTransform: 'none',
                    minWidth: 100,
                    borderRadius: '8px',
                    fontWeight: 600,
                    boxShadow: 'none',
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant={formState === 1 ? 'contained' : 'outlined'}
                  onClick={() => setFormState(1)}
                  sx={{
                    textTransform: 'none',
                    minWidth: 100,
                    borderRadius: '8px',
                    fontWeight: 600,
                    boxShadow: 'none',
                  }}
                >
                  Sign Up
                </Button>
              </Box>

              <Box component="form" noValidate sx={{ width: '100%' }}>
                {formState === 1 && (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Full Name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{
                      '& .MuiInputBase-root': {
                        backgroundColor: '#fff',
                        borderRadius: 2,
                      }
                    }}
                  />
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{
                    '& .MuiInputBase-root': {
                      backgroundColor: '#fff',
                      borderRadius: 2,
                    }
                  }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((show) => !show)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      backgroundColor: '#fff',
                      borderRadius: 2,
                    }
                  }}
                />

                {error && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {error}
                  </Typography>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    background: 'linear-gradient(45deg, #3f51b5 30%, #1a237e 90%)',
                    color: '#fff',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 20px rgba(63, 81, 181, 0.3)',
                    transition: 'transform 0.2s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      background: 'linear-gradient(45deg, #303f9f 30%, #0d47a1 90%)',
                      boxShadow: '0px 6px 30px rgba(48, 63, 159, 0.4)',
                    }
                  }}
                  onClick={handleAuth}
                >
                  {formState === 0 ? 'Login' : 'Register'}
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Snackbar
          open={open}
          autoHideDuration={4000}
          message={message}
          onClose={() => setOpen(false)}
        />
      </Grid>
    </ThemeProvider>
    </div>
  );
}
