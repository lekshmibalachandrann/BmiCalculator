import './App.css';
import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InputLabel, Select, MenuItem } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

function App() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const calculateBmi = () => {
    if (weight && height && age) {
      const bmiValue = (weight / (height * height)).toFixed(2); 
      setBmi(bmiValue);
      classifyBmi(bmiValue);
    } else {
      toast.error("Please fill all fields");
    }
  };

  const classifyBmi = (bmiValue) => {
    const bmiNumber = parseFloat(bmiValue);
    if (bmiNumber < 18.5) {
      setBmiCategory("Underweight");
    } else if (bmiNumber >= 18.5 && bmiNumber < 24.9) {
      setBmiCategory("Normal");
    } else if (bmiNumber >= 25 && bmiNumber < 29.9) {
      setBmiCategory("Overweight");
    } else {
      setBmiCategory("Obese");
    }
  };

  const resetForm = () => {
    setAge("");
    setWeight("");
    setHeight("");
    setBmi(null);
    setBmiCategory("");
  };

  return (
    <>
      <div className='bg-light d-flex justify-content-center align-item-center' style={{ height: '100vh', width: '100%' }}>
        <div className='bg-secondary p-5 rounded-2' style={{ width: '500px' }}>
          <h1 className='text-dark'>BMI CALCULATOR</h1>
          <h3 className='text-dark'>
            Find your Body Mass Index
          </h3>
          <div className='bg-light p-3 mt-4 d-flex justify-content-center align-items-center rounded flex-column' style={{ height: '150px' }}>
            <h1>{bmi || "--"}</h1>
            <h3> {bmi
              ? `Your BMI is ${bmi} (${bmiCategory})`
              : "Body Mass Index"}</h3>
          </div>

          {/* Gender input box */}
          <div className='my-3'>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label" className='text-light'>Are you a?</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" className='text-light' />
                <FormControlLabel value="male" control={<Radio />} label="Male" className='text-light' />
                <FormControlLabel value="other" control={<Radio />} label="Other" className='text-light' />
              </RadioGroup>
            </FormControl>
          </div>

          {/* Age input box */}
          <div className='my-3'>
            <FormControl fullWidth>
              <InputLabel className='text-dark'>How Old are you?</InputLabel>
              <Select value={age} onChange={handleAgeChange}>
                {[...Array(120).keys()].map((age) => (
                  <MenuItem key={age + 1} value={age + 1}>
                    {age + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

         
          <div className='my-3'>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <div className='w-100'>
                <TextField
                  label="Enter your Weight"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: '100%' }}
                  slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                    },
                  }}
                  value={weight}
                  onChange={handleWeightChange}
                />
              </div>
            </Box>
          </div>

        
          <div className='my-3'>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <div className='w-100'>
                <TextField
                  label="Enter your Height"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: '100%' }}
                  slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start">Meter</InputAdornment>,
                    },
                  }}
                  value={height}
                  onChange={handleHeightChange}
                />
              </div>
            </Box>
          </div>

         
          <div className='my-3 d-flex justify-content-between'>
            <Button color='success' variant="contained" onClick={calculateBmi}>Calculate</Button>
            <Button className='text-light' color='dark' variant="outlined" onClick={resetForm}>Reset</Button>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' theme="colored" autoClose={2000} />
    </>
  );
}

export default App;
