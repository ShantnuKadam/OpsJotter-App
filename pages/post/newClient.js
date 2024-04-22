import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router'; // Assuming you're using react-router

export default function NewClient() {
  const [client, setClient] = useState({
     firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    customerDisplayName: '',
    companyName: '',
    email: '',
    phone: '',
    fax: '',
    abnNumber: '',
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    state: '',
    postCode: '',
    country: '',
  });
  const [error, setError] = useState('');
  const router = useRouter(); // For navigating to another page

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient(prev => ({ ...prev, [name]: value }));
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/createClient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Client created:', data);
      // setClient({ name: '', location: '', status: '' }); // Reset form
      router.push('/post/clientList');
    } else {
      console.error('Failed to create client');
    }
  };

  return (    
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ '& .MuiTextField-root': { m: 1 } }}>
      {error && <Typography color="error">{error}</Typography>}
      <div>
      <TextField id="firstName" label="First Name" name="firstName" required autoFocus sx={{ width: '29ch' }} value={client.firstName} onChange={handleChange} />
      <TextField id="middleName" label="Middle Name" name="middleName" sx={{ width: '29ch' }} value={client.middleName} onChange={handleChange} />
      <TextField id="lastNameName" label="Last Name" name="lastName" sx={{ width: '29ch' }} value={client.lastName} onChange={handleChange} />
      <TextField id="suffix" label="Suffix" name="suffix" sx={{ width: '29ch' }} value={client.suffix} onChange={handleChange} />
      </div>
      <div>
      <TextField id="customerDisplayName" label="Customer Display Name" name="customerDisplayName" sx={{ width: '60ch' }} value={client.customerDisplayName} onChange={handleChange} />
      <TextField id="companyName" label="Company Name" name="companyName" sx={{ width: '60ch' }} value={client.companyName} onChange={handleChange} />
      </div>
      <div>
      <TextField id="email" label="Email" name="email" sx={{ width: '60ch' }} value={client.email} onChange={handleChange} />
      <TextField id="phone" label="Phone" name="phone" sx={{ width: '60ch' }} value={client.phone} onChange={handleChange} />
      </div>
      <div>
      <TextField id="fax" label="FAX" name="fax" sx={{ width: '60ch' }} value={client.fax} onChange={handleChange} />
      <TextField id="abnNumber" label="ABN Number" name="abnNumber" sx={{ width: '60ch' }} value={client.abnNumber} onChange={handleChange} />
      </div>
      <Typography variant="h5" component="h1" gutterBottom>
      Primary Address details
      </Typography>
      <div>
      <TextField id="streetAddress1" label="Street Address 1" name="streetAddress1" sx={{ width: '60ch' }} value={client.streetAddress1} onChange={handleChange} />
      <TextField id="streetAddress2" label="Street Address 2" name="streetAddress2" sx={{ width: '60ch' }} value={client.streetAddress2} onChange={handleChange} />
      </div>
      <div>
      <TextField id="city" label="City" name="city" sx={{ width: '60ch' }} value={client.city} onChange={handleChange} />
      <TextField id="state" label="State" name="state" sx={{ width: '60ch' }} value={client.state} onChange={handleChange} />
      </div>
      <div>
      <TextField id="postCode" label="Post Code" name="postCode" sx={{ width: '60ch' }} value={client.postCode} onChange={handleChange} />
      <TextField id="country" label="Country" name="country" sx={{ width: '60ch' }} value={client.country} onChange={handleChange} />
      </div>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Save Client
      </Button>
    </Box>
  );
}
