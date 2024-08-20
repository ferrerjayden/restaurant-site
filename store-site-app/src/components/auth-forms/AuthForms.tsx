import _ from "lodash"
import { Button, FormControl, TextField } from "@mui/material";
import { FormFields } from "../../common-types";
import { useState } from "react";

export const AuthForm = ({ formFields, handleMutation, formTitle}: {formFields: FormFields[], handleMutation: any, formTitle: string}) => {

    const [formData, setFormData] = useState({})

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const { name, value } = event.target
         setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

     const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleMutation.mutate(formData)
    };

    return (
        <form style={{ width: '100%' }} onSubmit={handleFormSubmit}>
             <FormControl
                sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                }}
            >
                {formFields.map((formField) => {
                    return (<TextField key={formField.name} label={_.capitalize(formField.name)} type={formField.type} onChange={handleChange} name={formField.name} fullWidth/>)
                })}
            </FormControl>
            <Button type="submit" sx={{ mt: 2, width: '100%', backgroundColor: '#403d3d', color: "white", fontWeight: 800 }}>
                {formTitle}
            </Button>
         </form>
    )
}