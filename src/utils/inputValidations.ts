import { ChangeEvent } from 'react'
import { inputValidation } from '../interfaces/interface';

const phoneValidation = ({e, setIsError, isError}: inputValidation) => {
    const reg = new RegExp("^(9|8).{7,7}$");
    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,8)
    setIsError({
        ...isError,
        phone_number: !reg.test(e.target.value)
    })
};

const nameValidation = ({e, setIsError, isError}: inputValidation) => {
    e.target.value = e.target.value.toString().slice(0,10)

    setIsError({
        ...isError,
        name: (e.target.value.length >= 6 && e.target.value.length <= 10)? false: true
    })
};

const emailValidation = ({e, setIsError, isError}: inputValidation) => {
    const reg = new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}");
    setIsError({
        ...isError,
        email_address: !reg.test(e.target.value)
    })
};

const descriptionValidation = ({e, setIsError, isError}: inputValidation) => {
    e.target.value = e.target.value.toString().slice(0,256)

    setIsError({
        ...isError,
        description: (e.target.value.length > 256)? true: false
    })
};

const validations = {
    phoneValidation: phoneValidation,
    nameValidation: nameValidation,
    emailValidation: emailValidation,
    descriptionValidation: descriptionValidation
}
export default validations;