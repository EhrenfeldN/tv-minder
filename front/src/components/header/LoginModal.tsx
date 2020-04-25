import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/core';
import { emailRegex } from 'utils/constants';
import { DisclosureProps } from 'utils/commonTypes';

interface Props {
  disclosureProps: DisclosureProps;
}

type FormData = {
  email: string;
  password: string;
};

const inputValidations = {
  email: {
    required: { value: true, message: 'Email is required' },
    pattern: { value: emailRegex, message: 'Please enter a valid email' },
  },
  password: {
    required: 'Password is required',
  },
};

const LoginModal = ({ disclosureProps }: Props) => {
  const { isOpen, onClose } = disclosureProps;
  const { handleSubmit, errors, register, formState } = useForm<FormData>();

  const onSubmit = handleSubmit(({ email, password }) => {
    console.log(email, password);
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <Box as="form" onSubmit={onSubmit}>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isInvalid={Boolean(errors.email)}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input name="email" placeholder="Email" ref={register(inputValidations.email)} />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isInvalid={Boolean(errors.password)}>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  ref={register(inputValidations.password)}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variantColor="teal" mr={3} isLoading={formState.isSubmitting} type="submit">
                Login
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;