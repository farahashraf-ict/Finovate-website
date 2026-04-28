const RTL_REGEX =
	/[\u0590-\u083F]|[\u08A0-\u08FF]|[\uFB1D-\uFDFF]|[\uFE70-\uFEFF]/g;

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

export function getTextDirection(text: string): "rtl" | "ltr" {
	if (!text) return "ltr";

	const rtlMatches = text.match(RTL_REGEX);
	const ltrMatches = text.match(/[a-zA-Z0-9]/g);
	const rtlChars = rtlMatches ? rtlMatches.length : 0;
	const ltrChars = ltrMatches ? ltrMatches.length : 0;

	if (rtlChars > 0 && (rtlChars > ltrChars || rtlChars / text.length > 0.3)) {
		return "rtl";
	}

	return "ltr";
}

export function getDirectionStyles(text: string) {
	const direction = getTextDirection(text);
	const isRtl = direction === "rtl";

	return {
		direction,
		textAlign: isRtl ? ("right" as const) : ("left" as const),
		unicodeBidi: "isolate" as const,
		wordWrap: "break-word" as const,
		overflowWrap: "break-word" as const
	};
}

export function highlightNabeeh(text: string): string {
	const safe = escapeHtml(text).replace(/\n/g, "<br />");
	return safe
		.replace(
			/\b(Nabeeh)\b/gi,
			'<span class="font-bold bg-gradient-to-r from-[#0066cc] via-cyan-500 to-[#003b7a] bg-clip-text text-transparent animate-gradient-x">$1</span>'
		)
		.replace(
			/نبيه/g,
			'<span class="font-bold bg-gradient-to-r from-[#0066cc] via-cyan-500 to-[#003b7a] bg-clip-text text-transparent animate-gradient-x">نبيه</span>'
		);
}
