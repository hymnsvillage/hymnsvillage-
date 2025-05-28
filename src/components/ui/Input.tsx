import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full px-4 py-2 rounded-full focus:outline-none text-sm text-white${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;

