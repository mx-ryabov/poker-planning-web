class ResizeObserverMock {
	observe() {}

	unobserve() {}

	disconnect() {}
}

window.ResizeObserver = ResizeObserverMock;
global.ResizeObserver = ResizeObserverMock;
