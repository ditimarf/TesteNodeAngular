var { ExecuteQuery } = require('./repositoryBase')

async function ObterTodosOsClientes() {
  return await ExecuteQuery('SELECT * FROM public."Clientes"')
}

async function SalvarCliente(nome, email) {
  return await ExecuteQuery('INSERT INTO public."Clientes" ("Nome", "Email") VALUES ($1, $2)', [nome, email])
}

async function AtualizarCliente(codigo, nome, email) {
  return await ExecuteQuery('UPDATE public."Clientes" SET "Nome" = $1, "Email" = $2 WHERE "Codigo" = $3', [nome, email, codigo])
}

async function RemoverCliente(codigo) {
  return await ExecuteQuery('DELETE FROM public."Clientes" WHERE "Codigo" = $1', [codigo])
}

module.exports =
{
  ObterTodosOsClientes,
  SalvarCliente,
  AtualizarCliente,
  RemoverCliente
}