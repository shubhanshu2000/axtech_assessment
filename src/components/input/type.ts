export interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  showToggle?: boolean;
  showValue?: boolean;
  onToggle?: () => void;
}
