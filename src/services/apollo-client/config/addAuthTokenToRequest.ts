import { ApolloLink, Observable, Operation } from 'apollo-link';

export const setRequestToken = async (operation: Operation): Promise<void> => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
    },
  });
};

export const addAuthTokenToRequest = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: ZenObservable.Subscription | undefined;

      Promise.resolve(operation)
        .then((oper) => setRequestToken(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return (): void => {
        if (handle) handle.unsubscribe();
      };
    }),
);
