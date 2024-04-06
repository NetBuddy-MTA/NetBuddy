interface InputProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  setValue?: (value: string) => void;
}

const Input = ({label, type, id, placeholder, setValue}: InputProps) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between">
        <label htmlFor={id} className="font-semibold capitalize">
          {label}
        </label>
      </div>
      <input
        id={id}
        type={type}
        className="w-full p-5 font-medium border rounded-md border-slate-300 placeholder:opacity-60"
        placeholder={placeholder}
        onChange={(e) => setValue && setValue(e.target.value)}
      />
    </div>
  );
}

export default Input;