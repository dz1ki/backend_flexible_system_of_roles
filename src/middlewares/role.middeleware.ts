export function roleMiddleware(req, res, next) {
  try {
    console.log(req.boby, req.user);
    next();
  } catch (e) {
    res.status(401).json({ message: "AaA" });
  }
}
