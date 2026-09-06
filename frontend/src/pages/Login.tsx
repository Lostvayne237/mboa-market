import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiError } from "../lib/api";
import { useAuth } from "../lib/auth";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { Button } from "../components/ui/Button";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const me = await login(email, password);
      navigate(me.role === "vendor" ? "/dashboard" : "/");
    } catch (err) {
      setError(
        err instanceof ApiError && err.status === 401
          ? "Wrong email or password."
          : "Could not log in. Try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <Container>
      <Section centered className="max-w-md mx-auto">
        <h1 className="anim-fade-up text-heading text-3xl font-extrabold text-body-lg">
          Welcome back
        </h1>
        <p className="anim-fade-up anim-delay-1 text-muted text-body-sm mt-6">
          Log in to manage your store.
        </p>

        <form onSubmit={submit} className="anim-fade-up anim-delay-2 mt-12 space-y-6 text-left w-full">
          <Field label="Email">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
              placeholder="you@example.com"
            />
          </Field>
          <Field label="Password">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
              placeholder="••••••••"
            />
          </Field>

          {error && <p className="text-body-sm font-semibold text-red-700">{error}</p>}

          <Button type="submit" disabled={busy} className="w-full">
            {busy ? "Logging in…" : "Log in"}
          </Button>
        </form>

        <p className="text-muted text-body-sm mt-12">
          New here?{" "}
          <Link to="/register" className="font-bold text-primary">
            Create an account
          </Link>
        </p>
      </Section>
    </Container>
  );
}

export const inputCls = "input-polish";

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="block text-body-sm font-bold text-heading mb-2">{label}</span>
      {children}
      {hint && <span className="block text-fine mt-2">{hint}</span>}
    </label>
  );
}
