import { RefObject, useEffect, useRef, useState } from 'react';

interface Args extends IntersectionObserverInit {
	freezeOnceVisible?: boolean;
}

/**
 Source: https://usehooks-ts.com/react-hook/use-intersection-observer
*/
function useIntersectionObserver({
	threshold = 0,
	root = null,
	rootMargin = '0%',
	freezeOnceVisible = false,
}: Args): [RefObject<HTMLDivElement>, IntersectionObserverEntry | undefined] {
	const [entry, setEntry] = useState<IntersectionObserverEntry>();
	const elementRef = useRef<HTMLDivElement>(null);

	const frozen = entry?.isIntersecting && freezeOnceVisible;

	const updateEntry = ([newEntry]: IntersectionObserverEntry[]): void => {
		setEntry(newEntry);
	};

	useEffect(() => {
		const node = elementRef?.current; // DOM Ref
		const hasIOSupport = !!window.IntersectionObserver;

		if (!hasIOSupport || frozen || !node) return;

		const observerParams = { threshold, root, rootMargin };
		const observer = new IntersectionObserver(updateEntry, observerParams);

		observer.observe(node);

		// eslint-disable-next-line consistent-return
		return () => observer.disconnect();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [elementRef?.current, JSON.stringify(threshold), root, rootMargin, frozen]);

	return [elementRef, entry];
}

export default useIntersectionObserver;
