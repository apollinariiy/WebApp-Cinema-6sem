import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SessionsContainer from './SessionsContainer';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { createTheme } from '@mui/material/styles'
import { Box } from '@mui/material';

function DatePickerValue() {

    const [value, setValue] = React.useState(dayjs());

    useEffect(() => {
        setValue(value);
    }, [value]);

    if (value === undefined) {
        return (
            <Box sx={{ border: 2, borderColor: '#FFFFFF', width: '500px', margin: 'auto' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker MuiDateCalendar-root
                        label="Выберите дату"
                        sx={{
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width: '500px',
                        }}
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                    />
                </LocalizationProvider></Box>
        )
    }
    return (
        <div>
            <Box sx={{ border: 2, borderColor: '#FFFFFF', width: '500px', margin: 'auto' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker MuiDateCalendar-root
                        label="Выберите дату"
                        sx={{
                            '& input': { color: '#FFFFFF', borderColor: '#FF0000' },
                            '& button': { color: '#FFFFFF' },
                            '& div': { color: '#FFFFFF', borderColor: '#FF0000' },
                            '& label': { color: '#FFFFFF' },
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width: '500px',
                        }}
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                    />
                </LocalizationProvider></Box>
            <SessionsContainer date={value} ></SessionsContainer></div>
    );
}
export default observer(DatePickerValue);