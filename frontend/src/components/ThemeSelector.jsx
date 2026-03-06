import { PaletteIcon } from 'lucide-react'
import React from 'react'
import { useTheme } from '../store/useTheme';
import{THEMES} from '../constants/index.js';

const ThemeSelector = () => {
  const {theme,setTheme}=useTheme();
    
  return (
    <div className='dropdown dropdown-end'>
      <button className="btn btn-ghost btn-circle"><PaletteIcon className="size-5" /></button>
      <div className="dropdown-content bg-primary p-2 rounded-box w-52 flex flex-col gap-2 max-h-72 overflow-y-auto">
        {/* <button onClick={() => setTheme('coffee')} className="btn btn-sm">Coffee</button>
        <button onClick={() => setTheme('forest')} className="btn btn-sm">Forest</button>
        <button onClick={() => setTheme('light')} className="btn btn-sm">Light</button> */}
        {THEMES.map((themeOption) => (
          <button 
            key={themeOption.label}
            onClick={() => setTheme(themeOption.name)}
            className={`btn btn-sm ${theme === themeOption.name ? "": 'btn-primary' }`}
          >
            <div className='flex items-center justify-between w-full'>
              {themeOption.label}
              <div className='flex items-center gap-1'>
              <span className={`size-2 rounded-full inline-block `} style={{ backgroundColor: themeOption.colors[0] }}></span>
              <span className={`size-2 rounded-full inline-block `} style={{ backgroundColor: themeOption.colors[1] }}></span>
              <span className={`size-2 rounded-full inline-block `} style={{ backgroundColor: themeOption.colors[2] }}></span>
              </div>
            </div>

          </button>
        ))
        }

      </div>
    </div>
  )
}

export default ThemeSelector
