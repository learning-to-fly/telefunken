import React from 'react';

const form = () => {
   return( <div className="first_form">
    <form id="first_form">
      <div className="form_line">
        <label>Enter title</label>
        <div className="input">
          <input type="text" />
        </div>
      </div>
      <div className="form_line">
        <label>Enter text</label>
        <div className="textarea">
          <textarea></textarea>
        </div>
        </div>
        <div className="form_line">
          <div className="submit">
            <button type="submit" form="first_form">Submit</button>
          </div>
        </div>           
    </form>
  </div> 
   )};
export default form;