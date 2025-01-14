class IntersectionObserverMock {
	root = null;
	rootMargin = "";
	thresholds = [];

	disconnect() {
		return null;
	}

	observe() {
		return null;
	}

	takeRecords() {
		return [];
	}

	unobserve() {
		return null;
	}
}
window.IntersectionObserver = IntersectionObserverMock;
global.IntersectionObserver = IntersectionObserverMock;
