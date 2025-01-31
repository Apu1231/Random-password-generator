import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState('');

  // UseRef hook
  const passwordref = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllow) str += "0123456789";
    if (charAllow) str += "!@#$%&*()_-+=:;?/,.[]₹";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      setPassword(pass);
    }
  }, [length, numAllow, charAllow, setPassword]);


  const copyPasswordToClipboard = useCallback(() => {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllow, charAllow, setPassword])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center text-2xl my-3'>Random password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 bg-white text-2xl pb-0 '>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordref}
          />

          <button
            onClick={copyPasswordToClipboard}
            className='bg-blue-700 text-white px-4 py-1 shrink-0 transition-all duration-200 hover:bg-blue-800 active:scale-95 cursor-pointer'
          >
            Copy
          </button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numAllow}
              id='numInput'
              onChange={() => {
                setNumAllow((prev) => !prev)
              }}
            />
            <label htmlFor='numInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={charAllow}
              id='charInput'
              onChange={() => {
                setCharAllow((prev) => !prev)
              }}
            />
            <label htmlFor='charInput'>Charectrs</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
