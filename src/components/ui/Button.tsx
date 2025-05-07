import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className = '', children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`bg-white text-slate-800 text-sm font-medium px-6 py-2 rounded-full hover:opacity-90 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;