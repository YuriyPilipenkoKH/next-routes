import { FormBaseTypes, LoginFormBaseTypes} from "@/types/formTypes";



export const AddNewCollectionFormProps: FormBaseTypes = {
  formName: 'AddNewCollectionForm',
  dimentions: ['300px', '170px','420px','250px'],
  title: '',
  text: '',
};

export const LoginFormProps: LoginFormBaseTypes = {
  titleLabel: 'Welcome Back!',
  backButtonLabel: 'Need an account?',
  backButtonHref: '/register',
  showSocial: true,
};
export const RegisterFormProps: LoginFormBaseTypes = {
  titleLabel: 'Hi!',
  backButtonLabel: 'Already have an account?',
  backButtonHref: '/login',
  showSocial: false,
};
