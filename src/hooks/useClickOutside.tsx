import { useEffect } from 'react';

function useClickOutside(
  ref: { current: { contains: (arg0: any) => any } },
  handler: { (): void; (arg0: any): void }
) {
  useEffect(() => {
    const listener = (event: { target: any }) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
}

export default useClickOutside;
