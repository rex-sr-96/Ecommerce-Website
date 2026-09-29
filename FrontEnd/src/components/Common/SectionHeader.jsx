import React from "react";

const SectionHeader = ({ badge, title, subtitle, actionText, onAction }) => {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {badge && (
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-(--color-contrast)">
            {badge}
          </span>
        )}
        <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-(--color-text)">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 max-w-2xl text-sm text-(--color-secondary-text)">
            {subtitle}
          </p>
        )}
      </div>

      {actionText && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-1 text-sm font-bold text-(--color-text) transition hover:text-(--color-contrast)"
        >
          {actionText} <span className="text-lg">→</span>
        </button>
      )}
    </div>
  );
};

export default SectionHeader;
