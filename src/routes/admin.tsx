import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, ADMIN_EMAIL } from "@/lib/useAuth";
import { LogOut, LayoutGrid, FileText, Share2, User as UserIcon } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  head: () => ({
    meta: [{ title: "Адмін — Andrii Kurshatsov" }, { name: "robots", content: "noindex,nofollow" }],
  }),
});

function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Handle OAuth tokens in URL hash after redirect
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash.includes("access_token")) {
      // supabase-js handles hash automatically on init; ensure session refresh
      supabase.auth.getSession();
    }
  }, []);

  if (loading) {
    return (
      <div className="pt-32 container-px mx-auto max-w-6xl text-muted-foreground">Завантаження…</div>
    );
  }

  if (!user) {
    return <Login />;
  }

  if (!isAdmin) {
    return (
      <div className="pt-32 container-px mx-auto max-w-md text-center">
        <h1 className="font-display text-3xl mb-4">Доступ заборонено</h1>
        <p className="text-muted-foreground mb-6">
          Тільки {ADMIN_EMAIL} може керувати цим сайтом. Ви увійшли як {user.email}.
        </p>
        <button
          onClick={() => supabase.auth.signOut()}
          className="rounded-full px-5 py-2.5 text-sm bg-foreground text-background"
        >
          Вийти
        </button>
      </div>
    );
  }

  const tabs = [
    { to: "/admin", label: "Портфоліо", icon: LayoutGrid, exact: true },
    { to: "/admin/pages", label: "Сторінки", icon: FileText },
    { to: "/admin/socials", label: "Соцмережі", icon: Share2 },
    { to: "/admin/about", label: "Про мене", icon: UserIcon },
  ];

  return (
    <div className="pt-28 pb-20 container-px mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Адмін-панель</div>
          <h1 className="font-display text-3xl mt-1">{user.email}</h1>
        </div>
        <button
          onClick={() => supabase.auth.signOut()}
          className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm hover:text-electric transition self-start"
        >
          <LogOut className="h-4 w-4" /> Вийти
        </button>
      </div>

      <nav className="glass rounded-full p-1.5 inline-flex flex-wrap gap-1 mb-10">
        {tabs.map((t) => {
          const active = t.exact ? pathname === t.to : pathname.startsWith(t.to);
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`px-5 py-2.5 rounded-full text-sm inline-flex items-center gap-2 transition ${
                active ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </Link>
          );
        })}
      </nav>

      <Outlet />
    </div>
  );
}

function Login() {
  const signIn = async () => {
    const res = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/admin",
    });
    if (res.error) {
      console.error(res.error);
      alert("Помилка входу: " + (res.error as Error).message);
    }
  };
  return (
    <div className="pt-32 container-px mx-auto max-w-md text-center">
      <h1 className="font-display text-4xl mb-4 text-gradient">Адмін-панель</h1>
      <p className="text-muted-foreground mb-8">Увійдіть через Google акаунт {ADMIN_EMAIL}</p>
      <button
        onClick={signIn}
        className="btn-electric hover:btn-electric-hover rounded-full px-7 py-3.5 text-sm font-medium"
      >
        Увійти через Google
      </button>
    </div>
  );
}
