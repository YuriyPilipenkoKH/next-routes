type FieldErrors<T> = Partial<{
  [K in keyof T]: {
    type?: string;
    message?: string;
  };
}>;
