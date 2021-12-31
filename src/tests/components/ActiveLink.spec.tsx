import { render, screen } from "@testing-library/react";

import { ActiveLink } from "../../components/ActiveLink";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      asPath: "/",
    }
  },
}));

describe("ActiveLink component", () => {
  it('should be able active link renderes correctly', () => {
    render(<ActiveLink href="/" activeClassName="active">
      <a>Home</a>
    </ActiveLink>
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('should be able adds active class if the link as correctly active ', () => {
    render(<ActiveLink href="/" activeClassName="active">
      <a>Home</a>
    </ActiveLink>
    )

    expect(screen.getByText('Home')).toHaveClass('active')
  })
})