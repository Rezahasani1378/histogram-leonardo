import { ChangeEventHandler } from "react";

interface Props {
  title: string;
  options: Array<string>;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
}

function Selector({ title, options, handleChange }: Props) {
  let test;
  return (
    <div className="px-2 my-1">
      <label htmlFor="countries" className="block mb-2 text-sm font-medium">
        {title}
      </label>
      <select
        onChange={handleChange}
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export { Selector };
