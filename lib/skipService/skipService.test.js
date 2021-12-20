const skipService = require('./skipService');

const req = { 
  locals: {}
};

describe('Test for skip service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Calling with skip service', () => {
    skipService(req, 'SOME-STATUS');
    expect(req.locals.skipService).toEqual(true);
    expect(req.locals.statusCode).toEqual('SOME-STATUS');
  });
});
