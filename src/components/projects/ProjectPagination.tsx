"use client";

import { motion, useReducedMotion } from "framer-motion";

type ProjectPaginationProps = {
  currentPage: number;
  pageCount: number;
  onChange: (page: number) => void;
};

export const ProjectPagination = ({
  currentPage,
  pageCount,
  onChange,
}: ProjectPaginationProps) => {
  const reduceMotion = useReducedMotion();

  if (pageCount < 2) return null;

  return (
    <nav className="mt-16 flex flex-wrap items-center justify-center gap-2 px-2" aria-label="Project pagination">
      <PaginationButton disabled={currentPage === 1} onClick={() => onChange(currentPage - 1)}>
        Previous
      </PaginationButton>
      {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
        <motion.button
          key={page}
          type="button"
          onClick={() => onChange(page)}
          whileHover={reduceMotion ? undefined : { y: -1, scale: 1.04 }}
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          className={`h-9 min-w-9 rounded-full px-3 text-xs font-semibold transition-colors ${
            page === currentPage
              ? "bg-primary text-white"
              : "text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          }`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </motion.button>
      ))}
      <PaginationButton disabled={currentPage === pageCount} onClick={() => onChange(currentPage + 1)}>
        Next
      </PaginationButton>
    </nav>
  );
};

const PaginationButton = ({
  children,
  disabled,
  onClick,
}: {
  children: string;
  disabled: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className="min-h-10 px-3 text-xs font-semibold text-zinc-500 transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-35 dark:text-zinc-400"
  >
    {children}
  </button>
);
