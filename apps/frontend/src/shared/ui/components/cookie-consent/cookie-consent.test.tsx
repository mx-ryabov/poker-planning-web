/**
 * @jest-environment jsdom
 */
import { test, describe, expect, beforeEach } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { CookieConsent } from "./cookie-consent";
import {
	ConsentStatus,
	CookieConsentStateProvider,
} from "@/src/shared/providers";
import { __clearStorageCache__TestOnly } from "@/src/shared/lib";

describe("CookieConsent", () => {
	beforeEach(() => {
		localStorage.clear();
		__clearStorageCache__TestOnly();
	});
	test("renders when consentStatus is Unknown", () => {
		const { getByText } = renderComponent();
		getByText(/This website uses cookies to enhance the user experience/i);
		getByText(/Learn more/i);
		getByText(/accept/i);
		getByText(/reject/i);
	});

	test("does not render when consentStatus is Given", () => {
		localStorage.setItem(
			"cookieConsent",
			JSON.stringify(ConsentStatus.Given),
		);
		const { queryByText } = renderComponent();
		expect(
			queryByText(
				/This website uses cookies to enhance the user experience/i,
			),
		).not.toBeInTheDocument();
	});

	test("does not render when consentStatus is Rejected", () => {
		localStorage.setItem(
			"cookieConsent",
			JSON.stringify(ConsentStatus.Rejected),
		);
		const { queryByText } = renderComponent();
		expect(
			queryByText(
				/This website uses cookies to enhance the user experience/i,
			),
		).not.toBeInTheDocument();
	});

	test("hides the popup when Accept All Cookeis is clicked", async () => {
		const { getByText, queryByText, user } = renderComponent();
		const acceptButton = getByText(/accept/i);
		await user.click(acceptButton);
		expect(
			queryByText(
				/This website uses cookies to enhance the user experience/i,
			),
		).not.toBeInTheDocument();
	});

	test("hides the popup when Reject is clicked", async () => {
		const { getByText, queryByText, user } = renderComponent();
		const rejectButton = getByText(/reject/i);
		await user.click(rejectButton);
		expect(
			queryByText(
				/This website uses cookies to enhance the user experience/i,
			),
		).not.toBeInTheDocument();
	});

	test("doesn't violate any accessibility rules", async () => {
		const { container } = renderComponent();
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});

function renderComponent() {
	return render(<CookieConsent />, { wrapper: CookieConsentStateProvider });
}
