import { Box, Typography } from "@mui/material"
import MainNav from "../../components/main-nav/MainNav"
import { AuthForm } from "../../components/auth-forms/AuthForms"
import { FormFields, LoginUser } from "../../common-types"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { loginUser } from "../../api/auth/req-methods"
import { useAuth } from "../../context/AuthContext"
import { useSnackbar } from "../../context/SnackbarContext"

const loginFormFields: FormFields[] = [
    {
        name: "username",
        type: "text",
    },
    {
        name: "password",
        type: "password"
    }
]

export const Login = () => {
    const navigate = useNavigate()
    const { login } = useAuth()
    const { showSnackbar } = useSnackbar()

    const loginUserMutation = useMutation<any, unknown, any>({
        mutationFn: (formData: LoginUser) => loginUser(formData),
        onSuccess: (data) => {
            navigate("/restaurants")
            showSnackbar("Successfully logged in", "success")
            login(data.user)
        },
        onError: (error: any) => {
            showSnackbar(error.response.data.message, "error")
        }
    })

    return (
        <>
            <MainNav/>
             <Box
                sx={{
                    display: 'grid',
                    placeItems: 'center',
                    height: '100vh',
                }}
             >
                <Typography>Login Now!</Typography>
                <Box
                    sx={{
                    width: '50%',
                    padding: 4,
                    boxShadow: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    }}
                >
                    <AuthForm formFields={loginFormFields} handleMutation={loginUserMutation} formTitle={"Login"}/>
                </Box>
            </Box>
        </>
    )
}