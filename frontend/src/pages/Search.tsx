import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SearchBar } from "../components/SearchBar";
import { StoreCard } from "../components/StoreCard";
import { BleedCarousel } from "../components/ui/BleedCarousel";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { api } from "../lib/api";
import { CATEGORIES, CITIES, type SearchResults } from "../lib/types";

/** Store-first search: results are stores whose name or goods match. */
export function Search() {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const city = params.get("city") ?? "";
  const category = params.get("category") ?? "";

  const [results, setResults] = useState<SearchResults | null>(null);

  useEffect(() => {
    setResults(null);
    const query = new URLSearchParams();
    if (q) query.set("q", q);
    if (city) query.set("city", city);
    if (category) query.set("category", category);
    api<SearchResults>(`/api/search/?${query}`)
      .then(setResults)
      .catch(() => setResults({ products: [], vendors: [] }));
  }, [q, city, category]);

  const label =
    CATEGORIES.find((c) => c.value === category)?.label ??
    (q ? `“${q}”` : "All stores");

  return (
    <Container className="pb-16">
      <Section tight>
        <SearchBar initial={q} autoFocus={!q && !category} />
      </Section>

      <BleedCarousel ariaLabel="Filter by city">
        <CityChip current={city} value="" label="All cities" q={q} category={category} />
        {CITIES.map((c) => (
          <CityChip key={c} current={city} value={c} label={c} q={q} category={category} />
        ))}
      </BleedCarousel>

      <Section tight>
        <div className="flex items-end justify-between mb-8">
          <h1 className="text-heading font-extrabold text-2xl text-body-md">
            {label}
            {city ? ` in ${city}` : ""}
          </h1>
          {results && (
            <p className="text-fine font-semibold">
              {results.vendors.length} store{results.vendors.length === 1 ? "" : "s"}
            </p>
          )}
        </div>

        {results === null ? (
          <div className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-56 rounded-3xl" />
            ))}
          </div>
        ) : results.vendors.length === 0 ? (
          <div className="anim-pop surface-polish p-12 text-center">
            <MagnifyingGlassIcon className="w-12 h-12 mx-auto text-primary/30" aria-hidden />
            <p className="text-heading font-bold text-body-md mt-4">No stores found</p>
            <p className="text-muted text-body-sm mt-2">
              Try another word, or browse every store on Mboa.
            </p>
            <Link
              to="/search"
              className="btn-base btn-primary btn-sheen inline-flex mt-8"
            >
              See all stores
            </Link>
          </div>
        ) : (
          <div className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.vendors.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        )}
      </Section>
    </Container>
  );
}

function CityChip({
  current,
  value,
  label,
  q,
  category,
}: {
  current: string;
  value: string;
  label: string;
  q: string;
  category: string;
}) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  if (value) params.set("city", value);
  const active = current === value;
  return (
    <Link
      to={`/search?${params}`}
      className={`chip ${active ? "bg-primary text-white !border-primary" : "chip-neutral"}`}
    >
      {label}
    </Link>
  );
}
