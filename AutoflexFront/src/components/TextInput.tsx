type InputProps = {
  value: string;
  onChange: (value: string) => void;
  readonly?: boolean;
  label?: string;
  placeholder?: string;
  type?: string;
  error?: boolean;
  errorMessage?: string;
};

export default function TextInput({
  value,
  onChange,
  readonly = false,
  label,
  placeholder,
  type = 'text',
  error = false,
  errorMessage = '',
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className={error ? 'text-red-500' : 'text-gray-600'}>
          {label}
        </label>
      )}

      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        readOnly={readonly}
        type={type}
        placeholder={placeholder}
        className={`
          rounded-xl p-3 w-full border
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${readonly ? 'bg-gray-300' : 'bg-#242424'}
        `}
      />

      {error && (
        <p className="text-red-500 text-sm">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
