var {ExecuteQuery} = require('./repositoryBase')

async function ObterTodasAirTags() {
  return await ExecuteQuery('SELECT * FROM public."AirTags"')
}

async function SalvarAirTag(MAC) {
  return await ExecuteQuery('INSERT INTO public."AirTags" ("MAC") VALUES ($1)', [MAC])
}

async function AtualizarAirTag(codigo, MAC) {
  return await ExecuteQuery('UPDATE public."AirTags" SET "MAC" = $1 WHERE "Codigo" = $2', [MAC, codigo])
}

async function RemoverAirTag(codigo) {
  return await ExecuteQuery('DELETE FROM public."AirTags" WHERE "Codigo" = $1', [codigo])
}

async function ObterAirTagsDisponiveis() {
  return await ExecuteQuery('SELECT * \
                              FROM public."AirTags" t1 \
                              WHERE NOT EXISTS ( \
                                SELECT * \
                                FROM public."ClienteAirTag" t2 \
                                WHERE t1."Codigo" = t2."CodigoAirTag" \
                                  AND t2."DataFimLocacao" IS NULL \
	)') 
}

module.exports =
{
  ObterTodasAirTags,
  SalvarAirTag,
  AtualizarAirTag,
  RemoverAirTag,
  ObterAirTagsDisponiveis
}