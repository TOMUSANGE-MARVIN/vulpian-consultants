"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

const PasswordInput: React.FC<{
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    autoComplete?: string;
    required?: boolean;
    autoFocus?: boolean;
    className?: string;
}> = ({ value, onChange, placeholder, autoComplete, required, autoFocus, className = "" }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="relative">
            <input
                type={visible ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                autoComplete={autoComplete}
                required={required}
                autoFocus={autoFocus}
                className={`${className} pr-11`}
            />
            <button
                type="button"
                onClick={() => setVisible(!visible)}
                aria-label={visible ? "Hide password" : "Show password"}
                title={visible ? "Hide password" : "Show password"}
                className="absolute right-0 top-0 h-full w-11 flex items-center justify-center text-gray-400 hover:text-gray-700 transition cursor-pointer"
            >
                <Icon icon={visible ? "mdi:eye-off-outline" : "mdi:eye-outline"} width="20" height="20" />
            </button>
        </div>
    );
};

export default PasswordInput;
