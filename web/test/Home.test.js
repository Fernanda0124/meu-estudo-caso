import { render, screen } from "@testing-library/react";
import Home from "../src/pages/Home";
import { describe, it, expect } from "vitest";

describe("Home", () => {
  it("renderiza título da página", () => {
    render(<Home />);
    expect(screen.getByText("Lista de Alunos")).toBeDefined();
  });
});
