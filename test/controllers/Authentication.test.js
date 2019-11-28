import Authentication from '../../server/controllers/Authentication';

it('should initialize the controller and have properties', () => {
  const auth = new Authentication({});

  expect(auth).not.toBeFalsy();
  expect(auth).toBeInstanceOf(Authentication);
  expect(auth).toHaveProperty('getUser');
  expect(typeof auth.getUser).toBe('function');
});
