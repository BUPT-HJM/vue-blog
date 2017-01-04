import jwt from 'jsonwebtoken'
export default async(ctx, next) => {
  console.log(ctx);
  console.log(this);

  await next();
}
