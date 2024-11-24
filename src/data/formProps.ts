import { FormBaseTypes, LoginFormBaseTypes} from "@/app/types/formTypes";



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
