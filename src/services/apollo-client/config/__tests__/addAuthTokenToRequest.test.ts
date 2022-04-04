import { Operation } from 'apollo-link';
import { setRequestToken } from '../addAuthTokenToRequest';

describe('Add token to request helper', () => {
  it('should add token to request', () => {
    const operation = {
      setContext: jest.fn(),
    } as unknown as Operation;

    setRequestToken(operation);

    expect(operation.setContext).toHaveBeenCalledWith({
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });
  });
});
