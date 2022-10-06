export const catchNull =
    <F extends (...args: any) => any>(throwingFn: F) =>
    (...args: Parameters<F>): ReturnType<F> | null => {
        try {
            // ? doesn't allow spreading args
            // @ts-ignore
            return throwingFn(...args);
        } catch (error) {
            return null;
        }
    };
