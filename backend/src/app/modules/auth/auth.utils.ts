import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'; // 1. Import SignOptions

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  // 2. Explicitly define the options with the correct type
  const signOptions: SignOptions = {
    expiresIn,
  };

  // 3. Pass the typed options object to the function
  return jwt.sign(jwtPayload, secret, signOptions);
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};