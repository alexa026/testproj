1. PCC (privacy compliance company)
NodeJS platform made using Koa framework and MongoDB at the
backend, together with Angular, TypeScript, SASS and Materialize
framework at the frontend. Client's desire was to create a safe place
for exchanging documents between companies. Documents were
held in storage encrypted. Frontend components were managed
using Bower.

2. I would most likely create a 2 collections, 1 which keeps the latest document and 1 which keeps the history:
current:
```
{ 
  _id: string,
  version: integer,
  content: string
}
```
and history:
```
{
  _id: string,
  documentId: string,
  version: integer,
  content: string
}
```
in case that document update is required, I would use findAndModify on a current document, and then store retrieved as an old version in history.
On that way we are not limited by the size of a document and still manageing to keep it working fast.
