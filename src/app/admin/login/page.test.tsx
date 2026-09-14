import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AdminLoginPage from "./page";

const push = vi.fn();
const refresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh }),
  useSearchParams: () => new URLSearchParams(""),
}));

describe("admin login form", () => {
  beforeEach(() => {
    push.mockReset();
    refresh.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("redirects to /admin after a successful login", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, status: 200 }));

    render(<AdminLoginPage />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "admin@dhira.local" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "some-local-password" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => expect(push).toHaveBeenCalledWith("/admin"));
  });

  it("shows a safe error when credentials are rejected", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 401 }));

    render(<AdminLoginPage />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "admin@dhira.local" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "wrong-password" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    expect(await screen.findByText("Invalid email or password.")).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });
});