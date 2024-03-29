import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface Props {
  title: string;
  value: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: HTMLInputTypeAttribute;
  pattern?: string;
}

function Input({ title, value, type = "text", onChange, pattern }: Props) {
  return (
    <div className="w-1/2 my-2 px-2">
      <label htmlFor="input" className="block mb-1 text-sm font-medium">
        {title}
      </label>
      <input
        pattern={pattern}
        type={type}
        id="input"
        onInput={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={value}
        required
      />
    </div>
  );
}

export { Input };
