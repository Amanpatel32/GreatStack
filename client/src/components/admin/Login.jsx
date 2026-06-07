// import React, { useState } from 'react'
// import { useAppContext } from '../../context/appContext'
// import { Axios } from 'axios';
// import toast from 'react-hot-toast';

// const Login = () => {

//   const{axios,setToken} = useAppContext();

//   const [email,setEmail]=useState('')
//   const [password,setPassword]=useState('')

//   const handleSubmit =async (e) => {
//     e.preventDefault()

//     try {
//       const {data}= await axios.post('/api/admin/login',{email,password})
//       if(data.success){
//         setToken(data.token)
//         localStorage.setItem('token',data.token)
//         Axios.defaults.headers.common['Authorization']=data.token;
//       }
//       else{
//         toast.error(data.message)

//       }
//     }
//     catch(error){
//       toast.error(error.message)

//     }
//   }
//   return (
//     <div className='flex items-center justify-center h-screen'>
//       <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lh'>
//         <div className='flex flex-col items-center justify-center'>
//           <div className='w-full py-6 text-center'>
//             <h1 className='text-3xl font-bold'><span className='text-primary'>Admin</span>Login</h1>
//              <p className='font-light'>Enter your credentials to access the admin panel</p>
//           </div>
//           <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>

//               <div  className='flex flex-col'>
//                  <label>Email</label>
//                  <input onChange={e=>setEmail(e.target.value) } value={email}
//                   className='border-b-2 border-gray-300 p-2 outline-none mb-6' type='email' required placeholder='Your Email ID'/>
//               </div>
//              <div  className='flex flex-col'>
//                  <label>Password</label>
//                  <input  onChange={e=>setPassword(e.target.value) } value={password}
//                  className='border-b-2 border-gray-300 p-2 outline-none mb-6' type='Password' required placeholder='Enter your Password'/>
//               </div>
//               <button className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all' type='submit'>Login</button>

//           </form>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login


import React, { useState } from 'react'
import { useAppContext } from '../../context/appContext'
import axios from 'axios'; // Fixed: Standard lower-case axios import
import toast from 'react-hot-toast';

const Login = () => {

  const { setToken } = useAppContext(); // Context se sirf setToken nikal rahe hain

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // FIX: Forcefully pushing directly to your backend vercel deployment URL
      const { data } = await axios.post('https://great-stack-server.vercel.app/api/admin/login', { email, password })
      
      if (data.success) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
        
        // Fixed: Standard lower-case global default authorization token mapping
        axios.defaults.headers.common['Authorization'] = data.token;
      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      // Pro-tip: Capturing backend sent custom message if available
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      {/* Fixed: Changed rounded-lh to rounded-lg */}
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'><span className='text-primary'>Admin</span>Login</h1>
             <p className='font-light'>Enter your credentials to access the admin panel</p>
          </div>
          <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>

              <div className='flex flex-col'>
                 <label>Email</label>
                 <input onChange={e => setEmail(e.target.value)} value={email}
                  className='border-b-2 border-gray-300 p-2 outline-none mb-6' type='email' required placeholder='Your Email ID'/>
              </div>
             <div className='flex flex-col'>
                 <label>Password</label>
                 <input onChange={e => setPassword(e.target.value)} value={password}
                 className='border-b-2 border-gray-300 p-2 outline-none mb-6' type='password' required placeholder='Enter your Password'/>
              </div>
              <button className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all' type='submit'>Login</button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Login