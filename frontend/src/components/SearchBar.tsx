import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useI18n } from "../lib/i18n";
import { DEFAULT_CITY, SEARCH_SUGGESTIONS } from "../lib/formDefaults";
import { Button } from "./ui/Button";

export function SearchBar({
  initial = "",
  autoFocus = false,
  defaultCity = DEFAULT_CITY,
}: {
  initial?: string;
  autoFocus?: boolean;
  defaultCity?: string;
}) {
  const { t } = useI18n();
  const [q, setQ] = useState(initial || SEARCH_SUGGESTIONS[0].q);
  const [city, setCity] = useState(defaultCity);
  const navigate = useNavigate();

  const doSearch = () => {
    const query = q.trim();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (city) params.set("city", city);
    navigate(`/search?${params}`);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    doSearch();
  };

  return (
    <div className="w-full">
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 w-full">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoFocus={autoFocus}
          placeholder={t("search.placeholder")}
          className="input-polish flex-1"
        />
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input-polish sm:max-w-[9rem] text-body-sm font-semibold"
          aria-label={t("search.cityLabel")}
        >
          <option value="Douala">Douala</option>
          <option value="Yaoundé">Yaoundé</option>
        </select>
        <Button
          type="button"
          successSequence
          onSuccess={doSearch}
          successLabel={t("search.submit")}
          icon={<MagnifyingGlassIcon className="w-5 h-5" />}
          className="shrink-0"
        >
          {t("search.submit")}
        </Button>
      </form>
      <div className="flex flex-wrap gap-2 justify-center mt-6">
        {SEARCH_SUGGESTIONS.map((s) => (
          <button
            key={`${s.q}-${s.city}`}
            type="button"
            onClick={() => {
              setQ(s.q);
              setCity(s.city);
            }}
            className="chip chip-soft !py-1.5 !px-3 text-xs"
          >
            {s.q} · {s.city}
          </button>
        ))}
      </div>
    </div>
  );
}
