import React from 'react'
import styled from 'styled-components'

import { useDispatch } from 'react-redux'
import { saveData } from '../store/dataSlice'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useHistory } from 'react-router-dom'

const InsertData = () => {
  const history = useHistory()

  const dispatch = useDispatch()

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .max(20, 'حداکثر 20 کاراکتر ')
      .required('پر کردن این فیلد الزامیست'),
    lastName: yup
      .string()
      .max(20, 'حداکثر 20 کاراکتر ')
      .required('پر کردن این فیلد الزامیست'),
    fatherName: yup.string().max(20, 'حداکثر 20 کاراکتر '),
    nationalId: yup
      .string()
      .matches(/\b\d{10}\b/, {
        message: 'کد ملی باید شامل 10 عدد باشد',
        excludeEmptyString: true,
      })
      .required('پر کردن این فیلد الزامیست'),

    date: yup.string().max(2, 'حداکثر 2 کاراکتر '),
    month: yup.string().max(2, 'حداکثر 2 کاراکتر '),
    year: yup.string().max(2, 'حداکثر 2 کاراکتر '),
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const submitHandler = () => {
    history.push('/confirmeddata')

    dispatch(
      saveData({
        firstName: watch('firstName'),
        lastName: watch('lastName'),
        fatherName: watch('fatherName'),
        nationalId: watch('nationalId'),
      })
    )
  }
  return (
    <Container>
      <FormBox>
        <form
          style={{ width: '100%' }}
          onSubmit={handleSubmit(() => submitHandler())}
        >
          <Row>
            <FormControl>
              <Label htmlFor=''>نام</Label>
              <Input type='text' {...register('firstName')} />
              <ErrorMsg>{errors.firstName?.message}</ErrorMsg>
            </FormControl>

            <FormControl>
              <Label htmlFor=''>نام خانوادگی</Label>
              <Input type='text' {...register('lastName')} />
              <ErrorMsg>{errors.lastName?.message}</ErrorMsg>
            </FormControl>
          </Row>

          <Row>
            <FormControl>
              <Label htmlFor=''>نام پدر</Label>
              <Input type='text' {...register('fatherName')} />
              <ErrorMsg>{errors.fatherName?.message}</ErrorMsg>
            </FormControl>

            <FormControl>
              <Label htmlFor=''>کد ملی</Label>
              <Input type='text' {...register('nationalId')} />
              <ErrorMsg>{errors.nationalId?.message}</ErrorMsg>
            </FormControl>
          </Row>

          <Row>
            <FormControl>
              <Label htmlFor=''>تاریخ تولد</Label>
              <DateBox>
                <DateInput
                  type='text'
                  placeholder='روز'
                  {...register('date')}
                />
                <span>/</span>
                <DateInput
                  type='text'
                  placeholder='ماه'
                  {...register('month')}
                />
                <span>/</span>
                <DateInput
                  type='text'
                  placeholder='سال'
                  {...register('year')}
                />
              </DateBox>

              <ErrorMsg>
                {errors.date?.message ||
                  errors.month?.message ||
                  errors.year?.message}
              </ErrorMsg>
            </FormControl>
          </Row>

          <Row btnBox>
            <Button>لغو</Button>
            <Button next type='submit'>
              مرحله‌ی بعد
            </Button>
          </Row>
        </form>
      </FormBox>
    </Container>
  )
}
export default InsertData

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: var(--clr-black);
  display: flex;
  justify-content: center;
  align-items: center;
`
const FormBox = styled.div`
  border: 1px solid var(--clr-primary);
  border-radius: 0.4rem;
  width: 40rem;
  height: 45rem;
  padding: 4rem 2rem;
  display: flex;
`
const Row = styled.div`
  margin-bottom: ${(props) => (props.btnBox ? '0' : '2rem')};
  display: flex;
  justify-content: ${(props) => (props.btnBox ? 'flex-end' : 'space-between')};
  align-items: center;
`
const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const Input = styled.input`
  with: 15rem;
  height: 4rem;
  padding-right: 0.8rem;
  border: 2px solid var(--clr-primary);
  border-radius: 0.4rem;
  background: var(--clr-black);
  color: var(--clr-primary);
  outline: none;
`
const Label = styled.label`
  font-size: 1.5rem;
  color: var(--clr-primary);
  padding: 0 0.2rem 0.5rem;
`
const DateBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
const DateInput = styled.input`
  width: 4rem;
  height: 4rem;
  border: 2px solid var(--clr-primary);
  border-radius: 0.4rem;
  background: var(--clr-black);
  color: var(--clr-primary);
  outline: none;
  text-align: center;
  & ~ span {
    font-size: 1.5rem;
    color: var(--clr-primary);
    padding: 0 0.5rem;
  }
`
const ErrorMsg = styled.p`
  font-size: 1rem;
  color: red;
`
const Button = styled.button`
  width: 13rem;
  height: 5rem;
  font-family: Vazir;
  font-size: 1.4rem;
  border: none;
  border-radius: 0.4rem;
  color: ${(props) => (props.next ? 'var(--clr-black)' : 'var(--clr-primary)')};
  background: ${(props) =>
    props.next ? 'var(--clr-secondary)' : 'var(--clr-black)'};
`
