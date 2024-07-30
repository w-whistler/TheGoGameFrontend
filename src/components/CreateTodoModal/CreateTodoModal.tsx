import { Button, Input } from '@components';
import { ITodoItemFormValue } from '@models/Todo';
import { createTodoItem } from '@store/slices/todoItems';
import { useAppDispatch } from '@store/store';
import { Formik } from 'formik';
import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import * as Yup from 'yup';

type CreateTodoModalProps = {
  visible: boolean;
  onClose: () => void;
};

const initialValues: ITodoItemFormValue = {
  title: '',
  description: '',
};

export const CreateTodoModal = ({ visible, onClose }: CreateTodoModalProps) => {
  const dispatch = useAppDispatch();

  const onSubmit = (data: ITodoItemFormValue) => {
    dispatch(createTodoItem(data));
    onClose();
  };

  return (
    <View>
      <Modal
        animationType="slide"
        visible={visible}
        onDismiss={onClose}
        transparent
        onRequestClose={onClose}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Create Todo</Text>

          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              title: Yup.string().required('Required'),
              description: Yup.string(),
            })}
            onSubmit={onSubmit}>
            {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
              <>
                <Input
                  placeholder="Enter Title"
                  value={values.title}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  error={errors.title}
                  wrapperStyle={styles.formField}
                />
                <Input
                  placeholder="Enter Description"
                  value={values.description}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  error={errors.description}
                  wrapperStyle={styles.formField}
                />
                <Button
                  style={styles.createButton}
                  onPress={() => handleSubmit()}>
                  Create
                </Button>
                <Button style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Button>
              </>
            )}
          </Formik>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    marginVertical: 'auto',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 24,
  },
  formField: {
    width: '100%',
    marginBottom: 12,
  },
  createButton: {
    width: '100%',
    marginBottom: 12,
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#003689',
    width: '100%',
  },
  cancelButtonText: {
    color: '#003689',
    borderColor: '#003689',
    textAlign: 'center',
  },
});
