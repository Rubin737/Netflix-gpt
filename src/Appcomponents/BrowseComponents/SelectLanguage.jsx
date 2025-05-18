import React, { useRef } from 'react'
import { supportedLanguages } from '@/utils/suportedLanguages';
import { useDispatch } from 'react-redux';
import { changeLanguage } from '@/utils/Slices/languageSlice';


const SelectLanguage = () => {

    const languageRef = useRef(null);
    const dispatch = useDispatch()
    
    const handleLanguageOption = ()=>{
     dispatch(changeLanguage(languageRef.current.value))
    }

   

  return (
    <select name="Languages" className='text-white font-bold font-poppins outline-blue-300 focus'
    ref={languageRef}
    onChange={()=>handleLanguageOption()}
    >
         {
        supportedLanguages.map(lang=>{
            return (
                <option 
                key={lang.identifier}
                value={lang.identifier}
                className='text-black bg-blue-200 px-5  text-sm border-amber-200 font-poppins'
                >{lang.language}</option>
            )
        })
      }
    </select>
  )
}

export default SelectLanguage