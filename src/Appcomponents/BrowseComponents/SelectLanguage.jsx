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
    <select name="Languages" className='text-black md:text-white font-bold font-poppins  md:px-0 md:py-0 py-1 rounded-sm  bg-blue-400 md:bg-neutral outline-0 text-[10px] lg:-ml-3 xl:-ml-0 xl:text-lg'
    ref={languageRef}
    onChange={()=>handleLanguageOption()}
    >
         {
        supportedLanguages.map(lang=>{
            return (
                <option 
                key={lang.identifier}
                value={lang.identifier}
                className='text-black bg-blue-200   text-[8px] xl:text-sm  border-amber-200 font-poppins'
                >{lang.language}</option>
            )
        })
      }
    </select>
  )
}
export default SelectLanguage