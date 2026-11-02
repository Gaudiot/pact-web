"use client";

import { useEffect, useRef, useState } from "react";

export type PlanInput = { title: string; description: string; price: number };

type FormErrors = { title?: string; price?: string };

const fieldClass =
  "mt-2 min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 aria-invalid:border-red-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100";
const buttonClass =
  "min-h-12 rounded-xl px-5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600";

function parsePrice(value: string): number | null {
  const normalized = value.trim().replace(",", ".");
  if (!/^\d+(?:\.\d{1,2})?$/.test(normalized)) return null;
  const [whole, fraction = ""] = normalized.split(".");
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  if (!Number.isSafeInteger(cents)) return null;
  const amount = cents / 100;
  // Reject values that would display a different cent after number conversion.
  const expected = `${Number(whole)}.${fraction.padEnd(2, "0")}`;
  const displayed = amount.toLocaleString("en-US", {
    useGrouping: false,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return displayed === expected ? amount : null;
}

export function AddPlanDialog({
  onCreate,
  onClose,
}: {
  onCreate: (plan: PlanInput) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleInput = useRef<HTMLInputElement>(null);
  const priceInput = useRef<HTMLInputElement>(null);
  const submitted = useRef(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitted.current) return;
    const parsedPrice = parsePrice(price);
    const nextErrors: FormErrors = {};
    if (!title.trim()) nextErrors.title = "Informe o título do plano.";
    if (parsedPrice === null)
      nextErrors.price =
        "Informe um preço válido, com até duas casas decimais.";
    setErrors(nextErrors);
    if (nextErrors.title) {
      titleInput.current?.focus();
      return;
    }
    if (parsedPrice === null) {
      priceInput.current?.focus();
      return;
    }
    submitted.current = true;
    onCreate({
      title: title.trim(),
      description: description.trim(),
      price: parsedPrice,
    });
    dialog.current?.close();
  }

  return (
    <dialog
      ref={dialog}
      aria-labelledby="add-plan-title"
      aria-describedby="add-plan-hint"
      onClose={onClose}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-stone-200 bg-white p-0 font-sans text-stone-900 shadow-xl backdrop:bg-stone-950/60 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
    >
      <div className="p-5 sm:p-7">
        <h2
          id="add-plan-title"
          className="text-2xl font-semibold tracking-tight"
        >
          Adicionar plano
        </h2>
        <p
          id="add-plan-hint"
          className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300"
        >
          Este plano será adicionado à demonstração e será perdido ao recarregar
          a página.
        </p>
        <form onSubmit={submit} noValidate className="mt-6 space-y-5">
          <div>
            <label htmlFor="new-plan-title" className="text-sm font-semibold">
              Título{" "}
              <span className="font-normal text-stone-500 dark:text-stone-400">
                (obrigatório)
              </span>
            </label>
            <input
              ref={titleInput}
              id="new-plan-title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setErrors((current) => ({ ...current, title: undefined }));
              }}
              required
              aria-invalid={Boolean(errors.title)}
              aria-describedby={
                errors.title ? "new-plan-title-error" : undefined
              }
              className={fieldClass}
            />
            {errors.title && (
              <p
                id="new-plan-title-error"
                role="alert"
                className="mt-2 text-sm leading-6 text-red-700 dark:text-red-300"
              >
                {errors.title}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="new-plan-description"
              className="text-sm font-semibold"
            >
              Descrição{" "}
              <span className="font-normal text-stone-500 dark:text-stone-400">
                (opcional)
              </span>
            </label>
            <textarea
              id="new-plan-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              className={`${fieldClass} resize-y`}
            />
          </div>
          <div>
            <label htmlFor="new-plan-price" className="text-sm font-semibold">
              Preço em reais{" "}
              <span className="font-normal text-stone-500 dark:text-stone-400">
                (obrigatório)
              </span>
            </label>
            <input
              ref={priceInput}
              id="new-plan-price"
              inputMode="decimal"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
                setErrors((current) => ({ ...current, price: undefined }));
              }}
              required
              aria-invalid={Boolean(errors.price)}
              aria-describedby={`new-plan-price-hint${errors.price ? " new-plan-price-error" : ""}`}
              className={fieldClass}
            />
            <p
              id="new-plan-price-hint"
              className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300"
            >
              Use vírgula ou ponto, sem separador de milhar. Exemplo: 99,90.
            </p>
            {errors.price && (
              <p
                id="new-plan-price-error"
                role="alert"
                className="mt-2 text-sm leading-6 text-red-700 dark:text-red-300"
              >
                {errors.price}
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
              Adicionar plano
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
