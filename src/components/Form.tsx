interface FormProps {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  buttonText?: string;
  setError?: (message: string) => void;
}

export default function Form({ children, onSubmit }: FormProps): JSX.Element {
  return (
    <form action="" onSubmit={onSubmit} className="space-y-6 w-full" data-testid="form">
      {children}
    </form>
  );
}
