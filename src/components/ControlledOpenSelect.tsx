import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import {FormHelperText} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
);

interface Option {
  value: number | string
}

const ControlledOpenSelect = <T extends Option>(
    { option, options, setOption, setError=() => {}, error=false, label="", required=false }:
    { option: T,
      options: [T, ...T[]],
      setOption: (arg0: T) => void,
      setError?: (arg0: boolean) => void,
      label?: string,
      error?: boolean,
      required?: boolean }
    ) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <div>
      <FormControl required={required} color="secondary" className={classes.formControl}>
        <InputLabel>{label}</InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={option}
          onChange={e => {setError(false); setOption(e.target.value as T)}}
          error={error}
        >
          {
            options.map(option => (
                <MenuItem
                    key={option.value}
										value={option.value}
                >
                  {option.value}
                </MenuItem>
            ))
          }
        </Select>
        <FormHelperText error={error}>{error ? "Error: select a value" : ""}</FormHelperText>
      </FormControl>
    </div>
  );
}
export default ControlledOpenSelect