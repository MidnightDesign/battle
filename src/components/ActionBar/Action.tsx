import * as React from 'react';
import {ReactNode} from 'react';
import './Action.css';

interface ActionProps {
    keyboardShortcut: string;
    icon?: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

export default ({keyboardShortcut, disabled, onClick, icon, className}: ActionProps) => {
    const Button = ({children}: { children: ReactNode }) => onClick !== undefined
        ? <button disabled={disabled} onClick={onClick}>{children}</button>
        : <>{children}</>;
    const classNames = ['Action', className];
    if (disabled) {
        classNames.push('disabled');
    }
    return (
        <li className={classNames.join(' ')}>
            <Button>
                <span className="shortcut">{keyboardShortcut}</span>
                <img src={icon} className="icon"/>
            </Button>
        </li>
    );
};
