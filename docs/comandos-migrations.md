## Comandos para generar migraciones
### Ejecutar migraciones
```
npm run migration:run
```
### Generar migrations a partir de una entidad
```
npm run migration:generate --name=NombreMigration
```
### Para generar migration en blanco
```
npm run migration:create --name=NombreMigration
```
### Para revertir (rollback)
```
npm run migration:revert
```