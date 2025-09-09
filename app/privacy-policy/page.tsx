import { NextLink } from "@/_src/shared/ui/next-components/next-link";
import Image from "next/image";
import LogoSvg from "@public/logo.svg";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Poker Planning - Privacy Policy",
	description:
		"Learn how Poker Planning collects, uses, and protects your personal data. Understand your rights under GDPR and our cookie policy.",
	keywords:
		"poker planning, privacy policy, GDPR, data protection, cookies, agile estimation, personal data, user rights",
};

export default async function PrivacyPolicyPage() {
	return (
		<main className="mx-auto max-w-3xl px-4 pb-12">
			<NextLink href="/" className="mt-6 mb-12 flex items-center">
				<Image
					src={LogoSvg}
					alt="Logo"
					height={24}
					width={175}
					priority
				/>
			</NextLink>
			<h1 className="mb-6 text-3xl font-bold text-neutral-900">
				Privacy Policy
			</h1>
			<p className="mb-4">
				Poker Planning (&quot;we&quot;, &quot;us&quot;, or
				&quot;our&quot;) is committed to protecting your personal data
				and respecting your privacy. This Privacy Policy explains how we
				collect, use, and protect your information when you use our web
				application at poker-planning.io.
			</p>

			<h2 className="mt-8 mb-4 text-xl font-semibold">
				What Data We Collect and Why
			</h2>
			<table className="mb-4 w-full text-left text-sm">
				<thead>
					<tr className="bg-gray-100">
						<th className="border-b px-4 py-2 font-semibold">
							Type of Data
						</th>
						<th className="border-b px-4 py-2 font-semibold">
							Purpose
						</th>
						<th className="border-b px-4 py-2 font-semibold">
							Legal Basis
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="border-b px-4 py-2 align-top">
							<strong>Email Address</strong>{" "}
							<span className="text-xs text-gray-500">
								(landing page)
							</span>
						</td>
						<td className="border-b px-4 py-2 align-top">
							To notify you of app updates via email
						</td>
						<td className="border-b px-4 py-2 align-top">
							Consent
						</td>
					</tr>
					<tr>
						<td className="border-b px-4 py-2 align-top">
							<strong>Name</strong>{" "}
							<span className="text-xs text-gray-500">
								(when creating or joining a game)
							</span>
						</td>
						<td className="border-b px-4 py-2 align-top">
							To display your identity within the game session
							only
						</td>
						<td className="border-b px-4 py-2 align-top">
							Legitimate Interest (game functionality)
						</td>
					</tr>
					<tr>
						<td className="px-4 py-2 align-top">
							<strong>Cookies / Usage Data</strong>{" "}
							<span className="text-xs text-gray-500">
								(via GTM + GA4)
							</span>
						</td>
						<td className="px-4 py-2 align-top">
							To analyze user activity and improve the app
						</td>
						<td className="px-4 py-2 align-top">Consent</td>
					</tr>
				</tbody>
			</table>

			<h2 className="mt-8 mb-4 text-xl font-semibold">
				Use of Cookies and Analytics
			</h2>
			<p className="mb-4">
				We use cookies and similar tracking technologies via Google Tag
				Manager (GTM) and Google Analytics 4 (GA4) to:
			</p>
			<ul className="mb-4 list-disc pl-6">
				<li>Understand how users interact with the app.</li>
				<li>Improve performance and usability.</li>
			</ul>
			<p>
				On your first visit, we will request your consent to use cookies
				through a cookie banner. You may opt out at any time.
			</p>

			<h2 className="mt-8 mb-2 text-xl font-semibold">
				How We Store and Protect Your Data
			</h2>
			<p className="mb-4">
				We use industry-standard security practices to protect your
				data, including:
			</p>
			<ul className="mb-4 list-disc pl-6">
				<li>HTTPS for secure communication</li>
				<li>Role-based access control</li>
				<li>Secure cloud storage</li>
			</ul>
			<p className="mb-4">
				Names entered for games are temporary and only used within the
				context of a session. We do not link them to persistent user
				accounts.
			</p>

			<h2 className="mt-8 mb-2 text-xl font-semibold">
				How Long We Keep Your Data
			</h2>
			<table className="mb-4 w-full text-left text-sm">
				<thead>
					<tr className="bg-gray-100">
						<th className="border-b px-4 py-2 font-semibold">
							Data Type
						</th>
						<th className="border-b px-4 py-2 font-semibold">
							Retention Period
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="border-b px-4 py-2 align-top">
							<strong>Email Address</strong>
						</td>
						<td className="border-b px-4 py-2 align-top">
							Until you unsubscribe or request deletion
						</td>
					</tr>
					<tr>
						<td className="border-b px-4 py-2 align-top">
							<strong>Game participant names</strong>
						</td>
						<td className="border-b px-4 py-2 align-top">
							Removed after the session ends or after a defined
							expiration period
						</td>
					</tr>
					<tr>
						<td className="px-4 py-2 align-top">
							<strong>Analytics data</strong>
						</td>
						<td className="px-4 py-2 align-top">
							Retained according to GA4 settings (default: 14
							months)
						</td>
					</tr>
				</tbody>
			</table>

			<h2 className="mt-8 mb-2 text-xl font-semibold">
				Your Rights Under GDPR
			</h2>
			<p className="mb-4">You have the right to:</p>
			<ul className="mb-4 list-disc pl-6">
				<li>Access your personal data</li>
				<li>Request correction or deletion</li>
				<li>Withdraw consent at any time</li>
				<li>Object to data processing</li>
			</ul>
			<p>
				To exercise any of these rights, contact us at
				mx.ryabov.s@gmail.com.
			</p>

			<h2 className="mt-8 mb-2 text-xl font-semibold">
				Third-Party Services
			</h2>
			<p className="mb-4">We use the following third-party services:</p>
			<ul className="mb-4 list-disc pl-6">
				<li>
					<strong>Google Tag Manager & Google Analytics 4</strong> —
					For analytics tracking
				</li>
			</ul>
			<p>
				Each provider complies with GDPR and offers a Data Processing
				Agreement (DPA).
			</p>

			<h2 className="mt-8 mb-4 text-xl font-semibold">Data Transfers</h2>
			<p className="text-sm text-gray-500">
				Some of our service providers may store or process your data
				outside the European Economic Area (EEA). We ensure appropriate
				safeguards, such as Standard Contractual Clauses (SCCs), are in
				place.
			</p>

			<h2 className="mt-8 mb-4 text-xl font-semibold">
				Data Breach Notification
			</h2>
			<p className="text-sm text-gray-500">
				If a data breach occurs that poses a risk to your rights and
				freedoms, we will notify you and the relevant authorities within
				72 hours.
			</p>

			<h2 className="mt-8 mb-4 text-xl font-semibold">Contact Us</h2>
			<p className="text-sm text-gray-500">
				If you have any questions about this Privacy Policy or want to
				make a data request, please contact us at: 📧
				ms.ryabov.s@gmail.com
			</p>
		</main>
	);
}
