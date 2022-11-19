import * as yup from 'yup';


export const userRegisterSchema = yup.object().shape({
    name: yup.string().required("Erro: Necessário preencher o campo nome"),
    email: yup.string().email().required("Erro: Necessário preencher o campo email"),
    password: yup.string().min(5).max(15).required("Erro: Necessário preencher o campo senha"),
    confirmPassword: yup.string().min(5).max(15).required("Erro: Necessário confirmar a senha")
});



export const userLoginSchema = yup.object().shape({
    email: yup.string().email().required("Erro: Necessário preencher o campo email"),
    password: yup.string().min(5).max(15).required("Erro: Necessário preencher o campo senha"),
});


export const FreelancerrRegisterSchema = yup.object().shape({
    name: yup.string().required("Erro: Necessário preencher o campo nome"),
    surname: yup.string().required("Erro: Necessário preencher o campo nome"),
    username: yup.string(),
    email: yup.string().email().required("Erro: Necessário preencher o campo email"),
    password: yup.string().min(5).max(15).required("Erro: Necessário preencher o campo senha"),
    confirmPassword: yup.string().min(5).max(15).required("Erro: Necessário confirmar a senha"),
    zip_code: yup.number().required().positive().integer(),
    address: yup.string().required(),
    city: yup.string().required(),
    country: yup.string().required(),
});

//await FreelancerrRegisterSchema.validate({ zip_code: "17033-800" });


