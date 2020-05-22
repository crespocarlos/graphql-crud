db.createUser({
  user: 'ccrespo',
  pwd: 'secret',
  roles: [
    {
      role: 'readWrite',
      db: 'lyricaldb',
    },
  ],
})
