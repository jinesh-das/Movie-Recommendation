import React from 'react';

const Dropdown = ({ title, options, fn, value }) => {
  return (
    <div>
      <select 
        className='px-6 py-2 outline-none rounded-md' 
        value={value} // Bind the select value to the passed value prop
        onChange={fn} // Handle onChange to trigger the passed fn prop
      >
        <option value="0" disabled>{title}</option>
        {options.map((val) => (
          <option key={val} value={val}>
            {val.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
