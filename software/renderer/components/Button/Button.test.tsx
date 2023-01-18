import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./index";

describe("#Button", () => {
  test("É esperado que o botão seja renderizado normalmente", () => {

    render(<Button id="commonButton">ButtonContent</Button>);

    expect(screen.getByText("ButtonContent")).toHaveProperty("id", "commonButton");
  });
});