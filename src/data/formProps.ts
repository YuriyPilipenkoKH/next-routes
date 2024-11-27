import { FormBaseTypes, AuthFormBaseTypes} from "@/types/formTypes";



export const AddNewCollectionFormProps: FormBaseTypes = {
  formName: 'AddNewCollectionForm',
  dimentions: ['300px', '170px','420px','250px'],
  title: '',
  text: '',
};

export const LoginFormProps: AuthFormBaseTypes = {
  titleLabel: 'LogIn',
  welcomeMsg: 'Welcome Back!',
  backButtonLabel: 'Need an account?',
  backButtonHref: '/register',
  showSocial: true,
};
export const RegisterFormProps: AuthFormBaseTypes = {
  titleLabel: 'SignUp',
  welcomeMsg: 'Hi there!',
  backButtonLabel: 'Already have an account?',
  backButtonHref: '/login',
  showSocial: false,
};
