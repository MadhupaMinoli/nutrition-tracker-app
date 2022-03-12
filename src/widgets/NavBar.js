import {DatePicker, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Avatar, TextField } from '@mui/material';
import {useState} from 'react';

function NavBar() {
    const [value, setValue] = useState(Date.now());

    return (
        <div className='nav-bar'>
            <span>Nutrition Tracker</span>

            <Avatar src='/avatar.jpeg' alt="Remy Sharp" sx={{ width: 40, height: 40 }}></Avatar>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    value={value}
                    onChange={(newValue) => {
                        console.log(newValue)
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </div>
    )
}

export default NavBar;