import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";
import { Container } from "@mui/material";

function LoginLayout({ children }) {
    return (
        <>
            {/* <Navbar /> */}
            <Container sx={{ mt: 4 }}>
                <LoginForm>{children}</LoginForm>
            </Container>
        </>
    );
}

export default LoginLayout;