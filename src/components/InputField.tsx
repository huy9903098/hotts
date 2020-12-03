import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea
} from "@chakra-ui/core";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  textarea?: boolean;
  size?:string;
  height?:number;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size,
  height,
  ...props
}) => {
  let InputOrTextarea = Input;

  if (textarea) {
    InputOrTextarea = Textarea;
  }
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor="name">{label}</FormLabel>}
      <InputOrTextarea height={height} size="lg"  {...field} {...props} id={field.name} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
