import { useState } from "react";
import TextInput from "./common/TextInput";
import Button from "./common/Button";
import { HttpRequest } from "../helpers/http-request-class.helper";
import AppForm from "./common/AppForm";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useAuthStore from "../auth.store";


enum AuthStep {
  PHONE = 1,
  CODE = 2,
  PASSWORD = 3
}

interface Props {
  callback?: () => void
}
export const LoginForm = ({ callback }: Props) => {
  const [error, setError] = useState('')
  const [step, setStep] = useState<AuthStep>(AuthStep.PHONE);
  const [validationToken, setValidationToken] = useState("");
  const [hasPassword, setHasPassword] = useState(false)
  const [phone, setPhone] = useState('')
  const { setTokens } = useAuth();
  const navigate = useNavigate();
  const loginCallBack = useAuthStore((s) => s.loginCallBack);


  const validationRequest = async (phone: string, forceSendSms: boolean) => {
    try {
      const response = await HttpRequest.post("/v1/auth/get-validation-token", {
        phone,
        forceSendSms,
      });
      return response.data

    } catch (error) {
      console.log("error", error)
    }
  }

  const getValidationToken = async (data: any, forceSendSms: boolean) => {
    const res = await validationRequest(data.phone, forceSendSms)
    if (res.hasPassword == true && !forceSendSms) {
      setStep(AuthStep.PASSWORD)
      setHasPassword(true)
    } else if (res.validationToken) {
      setValidationToken(res.validationToken);
      setStep(AuthStep.CODE); // Update step based on previous state
    } else {
      setError('Internal server error')
    }
  };



  const loginOrRegister = async (data: any) => {
    const response = await HttpRequest.post("/v1/auth/login-or-register", {
      validationToken,
      code: data.code,
    });
    if (response?.data) {
      const { accessToken, refreshToken } = response.data;
      setTokens(accessToken, refreshToken);
      if (typeof loginCallBack == 'function') {
        loginCallBack()
      }

      if (typeof callback == 'function') { callback() } else navigate("/");
    }
  };

  const loginWithPassword = async (data: any) => {
    const response = await HttpRequest.post("/v1/auth/login", {
      phone,
      password: data.password
    });
    if (response?.data) {
      const { accessToken, refreshToken } = response.data;
      setTokens(accessToken, refreshToken);
      if (typeof loginCallBack == 'function') {
        loginCallBack()
      }

      if (typeof callback == 'function') { callback() } else navigate("/");
    }
    if (response.status == 404) {
      setError('password is incorrect!')
      return
    }
  }

  const onSubmit = async (data: any) => {
    if (data.phone) setPhone(data.phone)

    if (step == AuthStep.PHONE) {
      getValidationToken(data, false);

    } else if (step == AuthStep.CODE) {
      loginOrRegister(data);
    } else if (step == AuthStep.PASSWORD) {
      loginWithPassword(data)
    }
  };

  const handleEditPhone = () => {
    setStep(AuthStep.PHONE)
  }

  const handleUseCode = async (e: any) => {
    e.stopPropagation()
    setStep(AuthStep.CODE)
    await getValidationToken({ phone }, true)
  }
  // Validation schema for step 1 (phone)
  const step1ValidationSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number must be digits only")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be at most 15 digits"),
  });

  // Validation schema for step 2 (code)
  const step2ValidationSchema = Yup.object().shape({
    code: Yup.string()
      .required("Code is required")
      .length(4, "Code must be exactly 4 characters"),
  });

  const passwordValidationSchema = Yup.object().shape({
    password: Yup.string().required('Password is required')
  })

  return (
    <div
      className="w-[90vw] sm:w-[30rem] flex justify-center items-center mx-auto my-5"
      key={step}
    >
      <AppForm
        onSubmit={onSubmit}
        validationSchema={
          step == AuthStep.PHONE ? step1ValidationSchema :
            step == AuthStep.CODE ? step2ValidationSchema : passwordValidationSchema
        }
      >

        <div className="flex flex-col gap-y-2">
          {step == AuthStep.PHONE ? (
            <TextInput
              name="phone"
              type="text"
              placeholder="Enter your phone number"
            />
          ) :
            step == AuthStep.CODE ?
              (
                <>
                  <div className="flex items-center justify-between">
                    <p className="py-3 text-lg">The code was sent to {phone}</p>
                    <button
                      className="text-blue-500 rounded px-4 py-2 mx-4"
                      onClick={() => {

                      }}>Edit number</button>
                  </div>
                  <div className="flex w-full items-center">
                    <TextInput
                      name="code"
                      type="text"
                      placeholder="Enter the given code"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <p className="py-3 text-lg">You are loging in with {phone}</p>
                    <button
                      className="text-blue-500 rounded px-4 py-2 mx-4"
                      onClick={handleEditPhone}>Edit number</button>
                  </div>

                  <TextInput
                    name="password"
                    type="passowrd"
                    placeholder="Enter your password"
                  />

                </>
              )}
          <Button color="primary" type="submit">
            Confirm
          </Button>
          {(step == AuthStep.CODE && hasPassword) && <span className="text-blue-500 cursor-pointer w-1/2 mt-2 text-sm" onClick={() => setStep(AuthStep.PASSWORD)}>Use password to Login</span>}
          {step == AuthStep.PASSWORD && <span className="text-blue-500 cursor-pointer w-1/2 mt-2 text-sm" onClick={handleUseCode}>Use Code to Login</span>}
        </div>

      </AppForm>
    </div>
  );
};

export default LoginForm;
