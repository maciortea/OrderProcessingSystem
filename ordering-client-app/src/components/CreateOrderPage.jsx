import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid'

const CreateOrderPage = ({ placeOrder }) => {
  const formik = useFormik({
    initialValues: {
      productName: '',
      quantity: 1,
      addressLine: '',
      city: '',
    },
    validationSchema: Yup.object({
      productName: Yup.string().required('Product name is required'),
      quantity: Yup.number()
        .min(1, 'Quantity cannot be less than one')
        .required('Quantity is required'),
      addressLine: Yup.string().required('Address is required'),
      city: Yup.string().required('City is required'),
    }),
    onSubmit: (values) => {
      const order = {
        ...values,
        id: uuidv4(),
      }

      placeOrder(order)
      formik.resetForm()
    },
  })

  return (
    <>
      <h4>Create new order</h4>
      <form onSubmit={formik.handleSubmit}>
        <div className='form-row'>
          <div className='form-group col-md-6'>
            <label htmlFor='productName'>Product</label>
            <input
              type='text'
              className='form-control'
              id='productName'
              autoComplete='off'
              {...formik.getFieldProps('productName')}
            />
            {formik.touched.productName && formik.errors.productName ? (
              <div className='is-invalid'>{formik.errors.productName}</div>
            ) : null}
          </div>
          <div className='form-group col-md-6'>
            <label htmlFor='quantity'>Quantity</label>
            <input
              type='number'
              className='form-control'
              id='quantity'
              min={1}
              {...formik.getFieldProps('quantity')}
            />
            {formik.touched.quantity && formik.errors.quantity ? (
              <div className='is-invalid'>{formik.errors.quantity}</div>
            ) : null}
          </div>
        </div>
        <div className='form-row'>
          <div className='form-group col-md-6'>
            <label htmlFor='addressLine'>Address</label>
            <input
              type='text'
              className='form-control'
              id='addressLine'
              autoComplete='off'
              {...formik.getFieldProps('addressLine')}
            />
            {formik.touched.addressLine && formik.errors.addressLine ? (
              <div className='is-invalid'>{formik.errors.addressLine}</div>
            ) : null}
          </div>
          <div className='form-group col-md-6'>
            <label htmlFor='city'>City</label>
            <input
              type='text'
              className='form-control'
              id='city'
              autoComplete='off'
              {...formik.getFieldProps('city')}
            />
            {formik.touched.city && formik.errors.city ? (
              <div className='is-invalid'>{formik.errors.city}</div>
            ) : null}
          </div>
        </div>
        <button type='submit' className='btn btn-primary'>
          Place order
        </button>
      </form>
    </>
  )
}

export default CreateOrderPage
