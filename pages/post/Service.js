import React, { useState } from 'react';
import { Button, TextField, Box, Container, Grid } from '@mui/material';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    providerName: '',
    theyProvid: '',
    terms: '',
    salePrice: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    // Process form data here or send to an API
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', '& .MuiTextField-root': { m: 1, width: '75ch' } }}>
          {/* Similar TextField components as before, with added onChange */}
          <TextField label="Service Provider Name" variant="outlined" name="providerName" value={formData.providerName} onChange={handleChange} />
          <TextField label="Service they Provide" variant="outlined" name="theyProvid" value={formData.theyProvid} onChange={handleChange} />
          <TextField label="Terms" variant="outlined" name="terms" value={formData.terms} onChange={handleChange} />
          <TextField label="Sale Price" variant="outlined" name="salePrice" value={formData.salePrice} onChange={handleChange} />

          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button type="button" variant="outlined" color="primary">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  );
};

export default FormComponent;
