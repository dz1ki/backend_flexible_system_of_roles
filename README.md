## Description

This backend implements user CRUD, JWT authorization and a flexible role system.  
The role system is based on the principle of comparing an incoming request with user permissions.  
There is protection against accidental deletion of system data. For example, we cannot delete  
the Admin user and his system permissions. This data is filled in by migrations.  
The flexibility is that a user can have many roles. We can change, delete or add permissions for a role.  
A role can have permission, for example, only to read certain fields of an entity, or to read all fields,  
but edit or delete only certain data. The backend is extensible, we can easily add a new entity.

## Example for access to adding a role to a user:

Add permission object by migration to table permission_objects:

      INSERT INTO "permission_objects" ( name, slugname, created_at, updated_at) VALUES
      ( 'User role', 'users.roles',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)

We add by migration the action that we want to perform with the objects in the table permissions:

      INSERT INTO "permissions" ( object_id, name, action, created_at, updated_at) VALUES
      ( 1, 'Update user role', 'Update', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)

Assigning a permission to a role, and assigning a role to a user is done via the API.  
 Migrations are used only when we want to indicate that the user's role and system permissions cannot be taken away  
from the role or from the user.

Describe the control object: /src/middlewares/target.object.ts.  
It is important that if in target.objec there is no object key that comes in the request  
to which we want to restrict access, the middleware will not work correctly.

      target.object =
        users:{
            roles:"users.roles"
        }
    // "users" - Key entity.
    // "roles" - Key reqest and name column.
    // "users.roles" - Name permission object.

## Stack:

Stack: Node.js, Express, Postgresql, Sequelize, Swagger, Typescript.

## Running the app

```bash
# In the config folder, add local.json and config.json

# In the console, run the database image with the command:
$ docker-compose up

# Create tables in the database using the "migrations" command:
$ npm run migrate:start

# To compile the project to JavaScript:
$ npm run build

# To start a project:
$ npm run start

```

## Test

Documentation (Swagger UI) is available at: [link] http://localhost:3000/api/

node v16.14.2
