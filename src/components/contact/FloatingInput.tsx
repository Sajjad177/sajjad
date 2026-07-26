"use client";

import type { LucideIcon } from "lucide-react";

type FloatingInputProps = {
  id: string;
  label: string;
  icon: LucideIcon;
  type?: string;
  value: string;
  onChange: (value: string) => void;
};

export const FloatingInput = ({
  id,
  label,
  icon: Icon,
  type = "text",
  value,
  onChange,
}: FloatingInputProps) => (
  <div className="relative z-0 w-full mb-10 group">
    <Icon className="absolute top-3 left-0 w-5 h-5 text-white/50 transition-colors group-focus-within:text-white" />
    <input
      type={type}
      id={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="block py-3 px-0 pl-10 w-full text-lg text-white bg-transparent border-0 border-b border-white/30 appearance-none focus:outline-none focus:ring-0 focus:border-white peer transition-all duration-300"
      placeholder=" "
      required
      suppressHydrationWarning
    />
    <label
      htmlFor={id}
      className="absolute text-lg text-white/60 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:pl-10 peer-focus:pl-0 peer-focus:font-medium peer-focus:text-white peer-focus:-translate-y-7 peer-focus:scale-75"
    >
      {label}
    </label>
    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
  </div>
);
