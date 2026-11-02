"use client";

import { useEffect, useRef, useState } from "react";

export type UserInput = { name: string; email: string };
type FormErrors = { name?: string; email?: string };

const fieldClass =
  "mt-2 min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 aria-invalid:border-red-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100";
const buttonClass =
  "min-h-12 rounded-xl px-5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600";

export function AddUserDialog({
  onCreate,
  onClose,
}: {
  onCreate: (user: UserInput) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const submitted = useRef(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitted.current) return;
    const nextErrors: FormErrors = {};
    if (!name.trim()) nextErrors.name = "Informe o nome do usuário.";
    if (!email.trim() || !emailInput.current?.validity.valid)
      nextErrors.email = "Informe um e-mail válido.";
    setErrors(nextErrors);
    if (nextErrors.name) {
      nameInput.current?.focus();
      return;
    }
    if (nextErrors.email) {
      emailInput.current?.focus();
      return;
    }
    submitted.current = true;
    onCreate({ name: name.trim(), email: email.trim() });
    dialog.current?.close();
  }

  return (
    <dialog
      ref={dialog}
      aria-labelledby="add-user-title"
      aria-describedby="add-user-hint"
      onClose={onClose}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-stone-200 bg-white p-0 font-sans text-stone-900 shadow-xl backdrop:bg-stone-950/60 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
    >
      <div className="p-5 sm:p-7">
        <h2
          id="add-user-title"
          className="text-2xl font-semibold tracking-tight"
        >
          Adicionar usuário
        </h2>
        <p
          id="add-user-hint"
          className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300"
        >
          Este cadastro ficará apenas na demonstração e será perdido ao
          recarregar a página. Somente o nome será exibido na lista.
        </p>
        <form onSubmit={submit} noValidate className="mt-6 space-y-5">
          <div>
            <label htmlFor="new-user-name" className="text-sm font-semibold">
              Nome{" "}
              <span className="font-normal text-stone-500 dark:text-stone-400">
                (obrigatório)
              </span>
            </label>
            <input
              ref={nameInput}
              id="new-user-name"
              autoComplete="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setErrors((current) => ({ ...current, name: undefined }));
              }}
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "new-user-name-error" : undefined}
              className={fieldClass}
            />
            {errors.name && (
              <p
                id="new-user-name-error"
                role="alert"
                className="mt-2 text-sm leading-6 text-red-700 dark:text-red-300"
              >
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="new-user-email" className="text-sm font-semibold">
              E-mail{" "}
              <span className="font-normal text-stone-500 dark:text-stone-400">
                (obrigatório)
              </span>
            </label>
            <input
              ref={emailInput}
              id="new-user-email"
              type="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrors((current) => ({ ...current, email: undefined }));
              }}
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "new-user-email-error" : undefined
              }
              className={fieldClass}
            />
            {errors.email && (
              <p
                id="new-user-email-error"
                role="alert"
                className="mt-2 text-sm leading-6 text-red-700 dark:text-red-300"
              >
                {errors.email}
              </p>
            )}
          </div>
          <div className="flex flex-col-reverse gap-3 border-t border-stone-200 pt-5 sm:flex-row sm:justify-end dark:border-stone-700">
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className={`${buttonClass} border border-stone-300 hover:bg-stone-100 dark:border-stone-600 dark:hover:bg-stone-800`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`${buttonClass} bg-violet-700 text-white hover:bg-violet-800`}
            >
              Adicionar usuário
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
