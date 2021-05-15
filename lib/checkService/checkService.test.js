const checkService = require('./checkService');

const next = jest.fn();
const service = jest.fn();
const req = { 
  locals: { 
    skipService: true 
  }
}
const servicefn = checkService(service);

describe('Test for check service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Calling with skip service true', () => {
    servicefn(req, {}, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(service).toHaveBeenCalledTimes(0);
  });

  test('Calling with skip service false', () => {
    req.locals.skipService = false;
    servicefn(req, {}, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(service).toHaveBeenCalledTimes(1);
  });
})
