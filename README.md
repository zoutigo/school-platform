# brava

### Environnement

- NODE JS
- REACT
- Ubuntu 20 ,
- LAMP

### Lancer environnement de developpement

- lancer postgres et apache
  `sudo systemctl start postgresql`
  `sudo systemctl start apache2`

- activer le uuid sur postgres
  `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`

- lancer le backend
  `npm run backdev`
- lancer le frontend
  `cd frontend && npm run dev`

### effectuer des test

```bash
npm run test
```
