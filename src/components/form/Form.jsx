import React, { useState } from 'react'
import Select from 'react-select'
import './Form.css'

function Form() {


  const [isValid, setIsValid] = useState(false)

  const [user, setUser] = useState({
    fullname: '',
    photo: '',
    date: '',
    gender: '',
    phone: '',
    service: '',
    account: '',
    documents: [],
    documentfile: [],
  })

  const options = [
    { value: 'Adhar Card', label: 'Adhar Card' },
    { value: 'Pan Card', label: 'Pan Card' },
    { value: 'Voter ID', label: 'Voter ID' }
  ]

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }
  const handleDocumentSelect = (selectedOptions) => {
    const documentsData = selectedOptions.map((option) => option.value)
    setUser({ ...user, documents: documentsData });
  }
  const handlePhotoUpload = (e) => {
    const files = e.target.files;
    const uploadPhotos = Object.keys(files).map((key)=>URL.createObjectURL(files[key]))
    setUser({ ...user, documentfile: uploadPhotos });
  }

  const handleImage = (e) => {
    const file = e.target.files[0];
    setUser({ ...user, photo: URL.createObjectURL(file) });
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = {}
    const numberPattern = /^[0-9]{10}$/;
    const namePattern = /^[A-Za-z\s]{3,}[/.]{0,1}[A-Za-z\s]{0,16}$/;

    if (user.fullname === '') {
      errors.fullname = '* Enter your name'
    }
    else if (!namePattern.test(user.fullname)) {
      errors.fullname = '* Name should be 3-16 characters, dont add any symbol or number'
    }
    if (user.phone === '') {
      errors.phone = '* Enter your number'
    }
    else if (!numberPattern.test(user.phone)) {
      errors.phone = '* Please enter 10 digit Mobile Number'
    }

    if (user.account === '') {
      errors.account = '* Please select your account'
    }

    if (user.gender === '') {
      errors.gender = '* Please select your gender'
    }

    if (user.date === '') {
      errors.date = '* please selcet your DOB'
    }
    if (user.photo === '') {
      errors.photo = '* please upload your photo'
    }
    if (user.service === '') {
      errors.service = '* please select your service'
    }
    if (user.documents.length === 0) {
      errors.documents = '* please select at least one document'
    }
    if (user.documentfile.length === 0) {
      errors.documentfile = '* please upload at least one photo'
    }
    setErrors(errors)
    console.log(user);

    if (Object.keys(errors).length === 0) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  return (
    <>
      <div className='container'>
        <h1 className='heading'>Bank Account Application</h1>
        <div className='form-items'>
          <form onSubmit={handleSubmit}>
            <div className='name'>
              <label className='fullname'>
                Full Name:
                <input type="text" name='fullname' value={user.fullname} onChange={handleChange} />
                {errors.fullname && <span>{errors.fullname}</span>}
              </label>
              <label>
                Photo:
                <input className='photo' type="file" name='photo' onChange={handleImage} />
                {errors.photo && <span>{errors.photo}</span>}
              </label>
            </div>
            <div className='date' >
              <label>
                DOB:
                <input type="date" name='date' value={user.date} onChange={handleChange} />
                {errors.date && <span>{errors.date}</span>}
              </label>
            </div>
            <div className='gender'>
              <label htmlFor="">
                Gender:
                <input type="radio" value='Male' checked={user.gender === 'Male'} name='gender' onChange={handleChange} /> Male
                <input type="radio" value='Female' checked={user.gender === 'Female'} name='gender' onChange={handleChange} /> Female
                {errors.gender && <span>{errors.gender}</span>}
              </label>
            </div>
            <div className='phone'>
              <label htmlFor="">
                Phone Number:
                <input type="text" name='phone' value={user.phone} onChange={handleChange} />
                {errors.phone && <span>{errors.phone}</span>}
              </label>
            </div>
            <div className='services'>
              <label htmlFor="">
                Services:
                <input type="checkbox" name="service" value='ATM' checked={user.service === 'ATM'} onChange={handleChange} /> ATM
                <input type="checkbox" name="service" value='Online Banking' checked={user.service === 'Online Banking'} onChange={handleChange} /> Online Banking
                {errors.service && <span>{errors.service}</span>}
              </label>
            </div>
            <div className='account'>
              <label>
                Account:
                <select value={user.account} name='account' onChange={handleChange}>
                  <option value=''>Select</option>
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                </select>
                {errors.account && <span>{errors.account}</span>}
              </label>
            </div>
            <div className='document'>
              <label>
                Selected Document :
              </label>
              <Select className='selectedDocument' isMulti options={options} name='documents' onChange={handleDocumentSelect} value={options.filter((option) => user.documents.includes(option.value))} />
            </div>
            {errors.documents && <span>{errors.documents}</span>}
            <div className='documentUpload'>
              <label>
                Document Upload :
                <input type="file" name='documentfile' accept='application/pdf,image/*' onChange={handlePhotoUpload} multiple />
                {errors.documentfile && <span>{errors.documentfile}</span>}
              </label>
            </div>
            <div className='button'>
              <button type='submit'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {isValid &&
        <div className='user-container'>
          <h1 className='heading'>User Details</h1>
          <div className='form'>
            <div className='image'>
              <img src={user.photo} alt="" />
            </div>
            <div className='user-details'>
              <h4>Full Name : {user.fullname} </h4>
              <h4>Date of Birth : {user.date} </h4>
              <h4>Gender : {user.gender} </h4>
              <h4>Phone Number : {user.phone} </h4>
              <h4>Services : {user.service} </h4>
              <h4>Account : {user.account} </h4>
              <h4>Selected Documents :
                <ul>
                  <li>
                    {user.documents.join(', ')}
                  </li>
                </ul>
              </h4>
              <h4>Document Upload :
                <ol>
                  <li>
                    <img src={user.documentfile} alt='' />
                  </li>
                </ol>
              </h4>
            </div>
          </div>
        </div>}
    </>
  )
}

export default Form