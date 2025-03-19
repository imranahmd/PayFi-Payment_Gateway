import React from 'react'
export default function FileUpload() {
  return (
    <div>
        <div className='fileUploadContainer'>
            <label>
              <input  type="file" accept=".jpg, .jpeg, .pdf" />
            </label>
          </div>
    </div>
    
  )
}


