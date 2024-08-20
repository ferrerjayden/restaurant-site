import { Box, Typography } from "@mui/material"
import { AuthForm } from "../../components/auth-forms/AuthForms"
import { FormFields, RegisterUser } from "../../common-types"
import MainNav from "../../components/main-nav/MainNav"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { registerUser } from "../../api/auth/req-methods"


const registerFormFields: FormFields[] = [
    {
        name: "email",
        type: "text",
    },
    {
        name: "username",
        type: "text",
    },
    {
        name: "password",
        type: "password"
    }
]

export const Register = () => {

    const navigate = useNavigate()

    const registerUserMutation = useMutation<any, unknown, any>({
        mutationFn: (formData: RegisterUser) => registerUser(formData),
        onSuccess: () => {
            navigate("/login")
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
            <Typography>Register Now!</Typography>
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
                <Typography>Register</Typography>
                <AuthForm formFields={registerFormFields} handleMutation={registerUserMutation} formTitle="Register"/>
            </Box>
        </Box>
        </>
    )
}