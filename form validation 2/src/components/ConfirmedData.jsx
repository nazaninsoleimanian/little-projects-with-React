import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { selectData } from '../store/dataSlice'
const ConfirmedData = () => {
  const { firstName, lastName, fatherName } = useSelector(selectData)
  return (
    <Container>
      <FormBox>
        <FormControl>
          <H5>نام:</H5>
          <P>{firstName}</P>
        </FormControl>
        <Hr></Hr>
        <FormControl>
          <H5>نام خانوادگی:</H5>
          <P>{lastName}</P>
        </FormControl>
        <Hr></Hr>
        {fatherName ? (
          <FormControl>
            <H5>نام پدر:</H5>
            <P>{fatherName}</P>
          </FormControl>
        ) : null}
      </FormBox>
    </Container>
  )
}

export default ConfirmedData

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
  height: 40rem;
  padding: 4rem 2rem;
`
const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const H5 = styled.h5`
  with: 15rem;
  height: 4rem;
  font-size: 1.6rem;
  padding-right: 0.8rem;
  background: var(--clr-black);
  color: var(--clr-primary);
  outline: none;
`
const P = styled.p`
  font-size: 1.5rem;
  color: var(--clr-primary);
  padding: 0 0.2rem 0.5rem;
`
const Hr = styled.hr`
  background: var(--clr-primary);
  width: 90%;
  text-align: center;
  margin: 2rem auto;
`
