import * as React from 'react';
import './Button.css';

export default (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const className = ['Button', props.className].join(' ');
    return <button {...props} className={className} />;
};
