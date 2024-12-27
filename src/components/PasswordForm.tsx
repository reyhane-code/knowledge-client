import { useState } from "react";
import EditableInput from "./common/EditableInput"
import Modal from "./common/Modal"
import Button from "./common/Button";
import AppForm from "./common/AppForm";
import { HttpRequest } from "../helpers/http-request-class.helper";
import { ObjectSchema } from "yup";
import * as yup from "yup";

interface IProps {
    hasPassword: boolean
}

const PasswordForm = ({ hasPassword }: IProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const validationSchema1: ObjectSchema<any> = yup.object().shape({
        oldPassword: yup.string().required("Your previous password is required").min(6),
        password: yup.string().required('Password is required'),
        passwordConfirmation: yup.string()
            .oneOf([yup.ref('password')], 'Passwords must match')
    });

    const validationSchema2: ObjectSchema<any> = yup.object().shape({
        password: yup.string().required('Password is required'),
        passwordConfirmation: yup.string()
            .oneOf([yup.ref('password')], 'Passwords must match')
    });

    const onSubmit = async (data: any) => {
        try {
            const res = await HttpRequest.put('/v1/user/password', data)
            if (res.status == 200) {
                setIsOpen(false)
                return res.data
            }
        } catch (error) {
            return <p className="text-red-500 text-lg">could not set password.</p>
        }
    }

    return (<>
        <Button color="primary" className="text-lg m-2 text-blue-500" onClick={(e) => {
            setIsOpen(true)
        }}>
            {hasPassword ? 'Change Password' : 'Set Password'}
        </Button>

        <Modal isOpen={isOpen} title={hasPassword ? 'Change Password' : 'Set Password'} message="Please enter the required fields:" id="password-modal" onClose={() => setIsOpen(false)}>
            {hasPassword &&
                <AppForm onSubmit={onSubmit} validationSchema={validationSchema1}>
                    <EditableInput name="oldPassword" label="Previous Password" />
                    <EditableInput name="password" label="New Password" />
                    <EditableInput name="passwordConfirmation" label="Repeat Password" />
                    <Button type="submit"
                        color="primary"
                        className="text-lg m-2 text-blue-500"
                    >Change Password</Button>
                </AppForm>


            }

            {!hasPassword && (
                <AppForm onSubmit={onSubmit} validationSchema={validationSchema2} >
                    <EditableInput name="password" label="Password" />
                    <EditableInput name="passwordConfirmation" label="Repeat Password" />
                    <Button type="submit"
                        color="primary"
                        className="text-lg m-2 text-blue-500"
                    >Set Password</Button>
                </AppForm>
            )}

        </Modal>

    </>)
}

export default PasswordForm