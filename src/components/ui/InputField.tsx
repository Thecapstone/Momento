"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

type InputProps = {
  label: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  encrypt?: boolean;
};

export const InputField = ({
  label,
  type = "text",
  defaultValue = "",
  placeholder,
  encrypt = false,
}: InputProps) => {
  const [show, setShow] = useState(false);

  const isPassword = encrypt;
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="w-full">
      <p className="font-bold text-capsule_amber_200 mb-2">{label}</p>

      <div className="relative">
        <input
          type={inputType}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="w-full border border-capsule_amber_200/40 rounded-lg p-2 pl-3 pr-10 bg-capsule_amber text-capsule_amber_200 outline-none"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-capsule_amber_200"
          >
            {show ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
