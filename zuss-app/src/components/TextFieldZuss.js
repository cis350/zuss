import { styled } from '@mui/system';
import {TextField} from '@mui/material';
import { alpha } from '@mui/material/styles';

export default function TextFieldZuss(props){
    const CustomTextField = styled((props) => (
        <TextField InputProps={{ disableUnderline: true }} {...props} />
      ))(({ theme }) => ({
        '& .MuiFilledInput-root': {
          overflow: 'hidden',
          borderRadius: 4,
          backgroundColor: 'white',
          border: '1px solid',
          borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
          
          '&.Mui-focused': {
            backgroundColor: 'white',
          },
        },
      }));
    return (<CustomTextField value={props.value} onChange={props.onChange} label={props.label} variant={props.variant} style={props.style}/>)
}


