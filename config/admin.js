module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '412b90b7a7780c14b18c6c122beffd4f'),
  },
});
