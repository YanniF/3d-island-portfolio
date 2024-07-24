import {Suspense, useRef, useState} from "react";
import emailjs from '@emailjs/browser'
import {Canvas} from "@react-three/fiber";
import Loader from "../components/Loader.jsx";
import Fox from "../models/Fox.jsx";
import useAlert from "../hooks/useAlert.js";

const Contact = () => {
  const formRef = useRef()

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [currentAnimation, setCurrentAnimation] = useState('idle')

  const { alert, showAlert, hideAlert } = useAlert()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleFocus = () => setCurrentAnimation('walk')
  const handleBlur = () => setCurrentAnimation('idle')

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsLoading(true)
    setCurrentAnimation('hit')

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        form_name: form.name,
        to_name: 'Yanni',
        from_email: form.email,
        to_email: import.meta.env.VITE_APP_EMAILJS_EMAIL_TO,
        message: form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setIsLoading(false)

      showAlert({ text: 'Message sent successfully.' })

      setForm({ name: '', email: '', message: '' })

      setTimeout(() => {
        setCurrentAnimation('idle')
        hideAlert()
      }, 5000)
    }).catch((error) => {
      setIsLoading(false)
      setCurrentAnimation('idle')

      console.error(error)

      showAlert({ text: 'Message failed.', type: 'danger' })
    })
  }

  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>Get in Touch</h1>

        <form
          className='w-full flex flex-col gap-7 mt-14'
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <label className='text-black-500 font-semibold'>Name {' '}
            <input
              type='text'
              name='name'
              className='input'
              placeholder='Your Name'
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className='text-black-500 font-semibold'>Email {' '}
            <input
              type='email'
              name='email'
              className='input'
              placeholder='email@email.com'
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className='text-black-500 font-semibold'>Message {' '}
            <textarea
              name='message'
              rows={4}
              className='textarea'
              placeholder='Let me know how I can help you'
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button
            type='submit'
            className='btn'
            disabled={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            { isLoading ? 'Sending...' : 'Send Message' }
          </button>
        </form>
      </div>
      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000
        }}
        >
          <Suspense fallback={<Loader/>}>
            <directionalLight position={[0, 0, 1]} intensity={2.5}/>
            <ambientLight intensity={0.5}/>
            <Fox
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
              currentAnimation={currentAnimation}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Contact
