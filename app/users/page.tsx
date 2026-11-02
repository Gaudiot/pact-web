"use client";

import { useEffect, useRef, useState } from "react";
import { AddUserDialog } from "@/components/add-user-dialog";

type User = { id: string; name: string; email?: string };

// Fictional examples until the paginated server endpoint is connected.
const mockUsers: User[] = [
  { id: "example-1", name: "Ana Exemplo" },
  { id: "example-2", name: "Bruno Exemplo" },
  { id: "example-3", name: "Carla Exemplo" },
  { id: "example-4", name: "Daniel Exemplo" },
  { id: "example-5", name: "Elisa Exemplo" },
  { id: "example-6", name: "Felipe Exemplo" },
  { id: "example-7", name: "Gabriela Exemplo" },
  { id: "example-8", name: "Henrique Exemplo" },
  { id: "example-9", name: "Isabela Exemplo" },
  { id: "example-10", name: "João Exemplo" },
  {
    id: "example-11",
    name: "Larissa Exemplo com um Nome Mais Longo para Demonstração",
  },
  { id: "example-12", name: "Marcos Exemplo" },
];

const pageSize = 5;
const searchDelay = 350;
const paginationButton =
  "inline-flex min-h-12 min-w-11 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent";

function normalizeName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

export default function Users() {
  const [allUsers, setAllUsers] = useState<User[]>(mockUsers);
  const [creating, setCreating] = useState(false);
  const [notification, setNotification] = useState("");
  const addButton = useRef<HTMLButtonElement>(null);
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [page, setPage] = useState(1);
  const resultsHeading = useRef<HTMLHeadingElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const pendingSearch = query !== appliedQuery;

  useEffect(() => {
    if (query === appliedQuery) return;
    const timeout = setTimeout(() => {
      setAppliedQuery(query);
      setPage(1);
    }, searchDelay);
    return () => clearTimeout(timeout);
  }, [query, appliedQuery]);

  const filteredUsers = allUsers.filter((user) =>
    normalizeName(user.name).includes(normalizeName(appliedQuery)),
  );
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const firstIndex = (page - 1) * pageSize;
  const users = filteredUsers.slice(firstIndex, firstIndex + pageSize);

  function changePage(nextPage: number) {
    if (
      pendingSearch ||
      nextPage < 1 ||
      nextPage > totalPages ||
      nextPage === page
    )
      return;
    setPage(nextPage);
    resultsHeading.current?.focus();
  }

  function clearSearch() {
    setQuery("");
    searchInput.current?.focus();
  }

  return (
    <main
      lang="pt-BR"
      className="min-h-screen bg-stone-50 px-4 py-8 font-sans text-stone-900 sm:px-8 sm:py-14 dark:bg-stone-950 dark:text-stone-100"
    >
      <div className="mx-auto w-full max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-700 dark:text-violet-300">
          PACT · Usuários
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Usuários
        </h1>
        <p className="mt-3 max-w-xl text-base leading-7 text-stone-600 dark:text-stone-300">
          Consulte a lista ou encontre um usuário pelo nome.
        </p>
        <button
          ref={addButton}
          type="button"
          aria-haspopup="dialog"
          onClick={() => {
            setNotification("");
            setCreating(true);
          }}
          className="mt-5 min-h-12 w-full rounded-xl bg-violet-700 px-5 text-sm font-semibold text-white hover:bg-violet-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:w-auto"
        >
          Adicionar usuário
        </button>
        <p
          role="status"
          className={
            notification
              ? "mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
              : "sr-only"
          }
        >
          {notification}
        </p>
        <p className="mt-5 max-w-2xl border-l-2 border-violet-300 pl-4 text-sm leading-6 text-stone-600 dark:border-violet-600 dark:text-stone-300">
          Dados de demonstração. Os nomes abaixo são fictícios. Novos cadastros
          são temporários e serão perdidos ao recarregar.
        </p>

        <section aria-label="Busca de usuários" className="mt-8">
          <form role="search" onSubmit={(event) => event.preventDefault()}>
            <label
              htmlFor="user-search"
              className="block text-sm font-semibold"
            >
              Buscar por nome
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                ref={searchInput}
                id="user-search"
                type="search"
                autoComplete="off"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Digite um nome"
                aria-describedby="user-search-hint"
                aria-controls="user-results"
                className="min-h-12 w-full min-w-0 rounded-xl border border-stone-300 bg-white px-4 text-base text-stone-900 placeholder:text-stone-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-400"
              />
              <button
                type="button"
                disabled={!query}
                onClick={clearSearch}
                className={`${paginationButton} shrink-0 border-stone-300 hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800`}
              >
                Limpar busca
              </button>
            </div>
            <p
              id="user-search-hint"
              className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300"
            >
              A lista é atualizada quando você para de digitar. Busque pelo nome
              completo ou parte dele.
            </p>
          </form>
        </section>

        <section
          id="user-results"
          aria-labelledby="user-results-heading"
          className="mt-6 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900"
        >
          <div className="flex flex-col gap-2 border-b border-stone-200 bg-stone-50/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 dark:border-stone-800 dark:bg-stone-900">
            <h2
              ref={resultsHeading}
              id="user-results-heading"
              tabIndex={-1}
              className="text-lg font-semibold focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600"
            >
              Lista de usuários
            </h2>
            <p
              role="status"
              className="text-sm leading-6 text-stone-600 dark:text-stone-300"
            >
              {pendingSearch
                ? "Atualizando busca..."
                : filteredUsers.length === 0
                  ? "Nenhum usuário encontrado"
                  : `Exibindo ${firstIndex + 1}–${firstIndex + users.length} de ${filteredUsers.length} usuários · Página ${page} de ${totalPages}`}
            </p>
          </div>
          <div aria-busy={pendingSearch}>
            {users.length > 0 ? (
              <ul className="divide-y divide-stone-200 dark:divide-stone-800">
                {users.map((user) => (
                  <li
                    key={user.id}
                    className="break-words px-5 py-5 text-base font-medium leading-7 sm:px-7 sm:py-6"
                  >
                    {user.name}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-5 py-12 text-center sm:px-7">
                <p className="text-lg font-semibold">
                  Nenhum resultado para esta busca
                </p>
                <p className="mt-2 text-base leading-7 text-stone-600 dark:text-stone-300">
                  Tente outro nome ou limpe a busca para ver todos os usuários.
                </p>
              </div>
            )}
          </div>
          {filteredUsers.length > 0 && (
            <footer className="flex flex-col gap-4 border-t border-stone-200 bg-stone-50 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 dark:border-stone-800 dark:bg-stone-900">
              <p className="text-center text-sm font-medium text-stone-600 dark:text-stone-300">
                Página {page} de {totalPages}
              </p>
              <nav
                aria-label="Paginação dos usuários"
                className="grid min-w-0 grid-cols-2 items-center gap-2 sm:flex sm:flex-wrap sm:justify-end"
              >
                <button
                  type="button"
                  disabled={pendingSearch || page === 1}
                  onClick={() => changePage(page - 1)}
                  className={`${paginationButton} row-start-1 border-stone-300 hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800`}
                >
                  Anterior
                </button>
                <div className="col-span-2 row-start-2 flex min-w-0 flex-wrap justify-center gap-2 sm:contents">
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((number) => (
                    <button
                      key={number}
                      type="button"
                      disabled={pendingSearch}
                      aria-label={`Página ${number}`}
                      aria-current={number === page ? "page" : undefined}
                      onClick={() => changePage(number)}
                      className={`${paginationButton} ${number === page ? "border-violet-700 bg-violet-700 text-white" : "border-stone-300 hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800"}`}
                    >
                      {number}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  disabled={pendingSearch || page === totalPages}
                  onClick={() => changePage(page + 1)}
                  className={`${paginationButton} col-start-2 row-start-1 border-stone-300 hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800`}
                >
                  Próxima
                </button>
              </nav>
            </footer>
          )}
        </section>
        {creating && (
          <AddUserDialog
            onClose={() => {
              setCreating(false);
              addButton.current?.focus();
            }}
            onCreate={(user) => {
              setAllUsers((current) => [
                { ...user, id: crypto.randomUUID() },
                ...current,
              ]);
              setQuery("");
              setAppliedQuery("");
              setPage(1);
              setNotification(
                "Usuário adicionado à demonstração. O cadastro será perdido ao recarregar a página.",
              );
            }}
          />
        )}
      </div>
    </main>
  );
}
