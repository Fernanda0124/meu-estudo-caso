import { render, screen } from "@testing-library/react";
import Details from "../src/pages/Details";
import { describe, it, expect } from "vitest";

describe("Details", () => {
  it("mostra mensagem de carregando", () => {
    render(<Details />);
    expect(screen.getByText("Carregando...")).toBeDefined();
  });
});
