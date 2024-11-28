type FieldErrors<T> = Partial<{
  [K in keyof T]: {
    type?: string;
    message?: string;
  };
}>;

//---------
type Errors<T> = Partial<{
  [K in keyof T]: {
    type?: string;
    message?: string;
  };
}>;

type LogInput = { email: string; password: string };
type RegInput = { name: string; email: string; password: string };

const isRegisterErrors = (
  errors: Errors<LogInput | RegInput>
): errors is Errors<RegInput> => {
  return 'name' in errors;
};
