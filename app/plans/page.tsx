"use client";

import { useRef, useState } from "react";

type Plan = {
  id: string;
  title: string;
  description: string;
  price: number;
};

// Temporary examples. Replace with a paginated server response when available.
const mockPlans: Plan[] = [
  { id: "example-1", title: "Plano Essencial", description: "Descrição de exemplo para apresentar as informações do plano Essencial.", price: 99.9 },
  { id: "example-2", title: "Plano Intermediário", description: "Descrição de exemplo para apresentar as informações do plano Intermediário.", price: 149.9 },
  { id: "example-3", title: "Plano Completo", description: "Descrição de exemplo para apresentar as informações do plano Completo.", price: 199.9 },
  { id: "example-4", title: "Plano Personalizado", description: "Uma descrição mais extensa para demonstrar como a lista acomoda informações adicionais sobre um plano, inclusive em telas menores.", price: 249.9 },
  { id: "example-5", title: "Plano Complementar", description: "Descrição de exemplo para apresentar as informações do plano Complementar.", price: 79.9 },
  { id: "example-6", title: "Plano Especial", description: "Descrição de exemplo para apresentar as informações do plano Especial.", price: 299.9 },
  { id: "example-7", title: "Plano Alternativo", description: "Descrição de exemplo para apresentar as informações do plano Alternativo.", price: 129.9 },
];

const pageSize = 3;
const priceFormatter = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const paginationButton = "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:cursor-not-allowed disabled:opacity-40";

export default function Plans() {
  const [page, setPage] = useState(1);
  const heading = useRef<HTMLHeadingElement>(null);
  const totalPages = Math.ceil(mockPlans.length / pageSize);
  const firstIndex = (page - 1) * pageSize;
  const plans = mockPlans.slice(firstIndex, firstIndex + pageSize);

  function changePage(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
    setPage(nextPage);
    heading.current?.focus();
  }

  return (
    <main lang="pt-BR" className="min-h-screen bg-stone-50 px-4 py-10 text-stone-900 sm:px-8 sm:py-14 dark:bg-stone-950 dark:text-stone-100">
      <div className="mx-auto w-full max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-700 dark:text-violet-300">PACT · Planos</p>
        <h1 ref={heading} tabIndex={-1} className="mt-3 text-3xl font-semibold tracking-tight focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600 sm:text-4xl">Planos de pagamento</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600 dark:text-stone-400">Consulte os planos disponíveis e seus valores.</p>
        <p className="mt-5 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm leading-6 text-violet-900 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-200">Dados de demonstração. Os títulos, descrições e preços abaixo são exemplos temporários.</p>

        <section aria-label="Lista de planos" className="mt-8 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 px-5 py-4 dark:border-stone-800 sm:px-7">
            <h2 className="text-base font-semibold">Planos disponíveis</h2>
            <p role="status" className="text-sm text-stone-500 dark:text-stone-400">Exibindo {firstIndex + 1}–{firstIndex + plans.length} de {mockPlans.length} planos · Página {page} de {totalPages}</p>
          </div>
          <ul className="divide-y divide-stone-200 dark:divide-stone-800">
            {plans.map(plan => (
              <li key={plan.id} className="flex flex-col gap-4 px-5 py-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8 sm:px-7 sm:py-7">
                <div className="min-w-0">
                  <h3 className="break-words text-lg font-semibold">{plan.title}</h3>
                  <p className="mt-2 max-w-xl break-words text-sm leading-6 text-stone-600 dark:text-stone-400">{plan.description}</p>
                </div>
                <div className="shrink-0 sm:text-right">
                  <p className="text-xs text-stone-500 dark:text-stone-400">Preço</p>
                  <p className="mt-1 text-xl font-semibold tracking-tight text-violet-700 dark:text-violet-300">{priceFormatter.format(plan.price)}</p>
                </div>
              </li>
            ))}
          </ul>
          <nav aria-label="Paginação dos planos" className="flex flex-wrap items-center justify-center gap-2 border-t border-stone-200 bg-stone-50 px-4 py-4 dark:border-stone-800 dark:bg-stone-900 sm:justify-end sm:px-7">
            <button type="button" disabled={page === 1} onClick={() => changePage(page - 1)} className={`${paginationButton} border-stone-300 hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800`}>Anterior</button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => (
              <button key={number} type="button" aria-label={`Página ${number}`} aria-current={number === page ? "page" : undefined} onClick={() => changePage(number)} className={`${paginationButton} ${number === page ? "border-violet-700 bg-violet-700 text-white" : "border-stone-300 hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800"}`}>{number}</button>
            ))}
            <button type="button" disabled={page === totalPages} onClick={() => changePage(page + 1)} className={`${paginationButton} border-stone-300 hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800`}>Próxima</button>
          </nav>
        </section>
      </div>
    </main>
  );
}
