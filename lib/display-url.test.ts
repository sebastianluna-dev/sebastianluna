import { describe, expect, it } from "vitest";
import { displayUrl } from "./display-url";

describe("displayUrl", () => {
  it("drops the protocol, a www prefix and a trailing slash", () => {
    expect(displayUrl("https://www.example.com/")).toBe("example.com");
    expect(displayUrl("http://example.com")).toBe("example.com");
  });

  it("keeps paths", () => {
    expect(displayUrl("https://example.com/reservas")).toBe("example.com/reservas");
  });
});
