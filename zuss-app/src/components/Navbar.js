import {
    AppBar, Toolbar, Typography, Button
} from '@mui/material';
import { styled } from '@mui/system';



export default function NavBar(props) {
    const StyledAppBar = styled(AppBar)({
        backgroundColor: '#123456',
        color: 'white',
      });
      
      const StyledToolbar = styled(Toolbar)({
        justifyContent: 'space-between',
      });
      
      const Title = styled(Typography)({
        flexGrow: 1,
        textAlign: 'center',
      });
      
      const StyledButton = styled(Button)({
        margin: '0 12px',
      });


    return (
        <StyledAppBar position="static">
        <StyledToolbar>
          <StyledButton color="inherit" onClick={props.handleRegisterEvent}>
            Register Event
          </StyledButton>
          <StyledButton color="inherit" onClick={props.handleHomepage}>
            Dashboard
          </StyledButton>
          <StyledButton color="inherit" onClick={props.handleLogout}>
            Logout
          </StyledButton>
        </StyledToolbar>
      </StyledAppBar>
    )

}